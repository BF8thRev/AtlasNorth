#!/usr/bin/env python3
"""
OAuth setup for Google Analytics and Search Console APIs.
One-time interactive auth flow.
"""

import json
import os
import sys
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# Scopes needed for Analytics and Search Console
SCOPES = [
    'https://www.googleapis.com/auth/analytics.readonly',
    'https://www.googleapis.com/auth/webmasters.readonly',
]

TOKEN_FILE = os.path.expanduser('~/.openclaw/workspace/credentials/analytics_tokens.json')
CREDENTIALS_DIR = os.path.dirname(TOKEN_FILE)

def get_client_config():
    """Load client ID and secret from environment."""
    client_id = os.getenv('GMAIL_CLIENT_ID')
    client_secret = os.getenv('GMAIL_CLIENT_SECRET')
    
    if not client_id or not client_secret:
        print("❌ Missing GMAIL_CLIENT_ID or GMAIL_CLIENT_SECRET in environment")
        print("These should be in ~/.openclaw/.env")
        sys.exit(1)
    
    return {
        "installed": {
            "client_id": client_id,
            "client_secret": client_secret,
            "redirect_uris": ["http://localhost:8080/"],
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
        }
    }

def authenticate():
    """Run OAuth flow and save tokens."""
    print("Starting OAuth flow for Analytics + Search Console...")
    print(f"Scopes: {SCOPES}\n")
    
    # Create credentials directory if needed
    os.makedirs(CREDENTIALS_DIR, exist_ok=True)
    
    # Run OAuth flow
    client_config = get_client_config()
    flow = InstalledAppFlow.from_client_config(client_config, SCOPES)
    
    # Use run_local_server to handle OAuth callback
    creds = flow.run_local_server(port=8080, prompt='consent', open_browser=False)
    
    # Save tokens
    token_data = {
        'token': creds.token,
        'refresh_token': creds.refresh_token,
        'token_uri': creds.token_uri,
        'client_id': creds.client_id,
        'client_secret': creds.client_secret,
        'scopes': creds.scopes,
    }
    
    with open(TOKEN_FILE, 'w') as f:
        json.dump(token_data, f, indent=2)
    
    print(f"\n✅ Tokens saved to: {TOKEN_FILE}")
    return creds

def load_credentials():
    """Load existing credentials or authenticate."""
    if os.path.exists(TOKEN_FILE):
        print(f"Loading existing tokens from {TOKEN_FILE}...")
        with open(TOKEN_FILE, 'r') as f:
            token_data = json.load(f)
        
        creds = Credentials(
            token=token_data['token'],
            refresh_token=token_data.get('refresh_token'),
            token_uri=token_data['token_uri'],
            client_id=token_data['client_id'],
            client_secret=token_data['client_secret'],
            scopes=token_data.get('scopes'),
        )
        
        # Check if token is valid
        if creds.valid:
            print("✅ Existing tokens are valid")
            return creds
        elif creds.expired and creds.refresh_token:
            print("🔄 Token expired, refreshing...")
            from google.auth.transport.requests import Request
            creds.refresh(Request())
            
            # Save refreshed token
            token_data['token'] = creds.token
            with open(TOKEN_FILE, 'w') as f:
                json.dump(token_data, f, indent=2)
            
            print("✅ Token refreshed")
            return creds
    
    # Need to authenticate
    return authenticate()

def list_analytics_properties(creds):
    """List all Analytics properties."""
    print("\n" + "="*60)
    print("GOOGLE ANALYTICS PROPERTIES")
    print("="*60 + "\n")
    
    try:
        # Use Analytics Admin API
        admin = build('analyticsadmin', 'v1beta', credentials=creds)
        response = admin.accountSummaries().list().execute()
        
        if 'accountSummaries' in response:
            for account in response['accountSummaries']:
                print(f"📊 Account: {account['displayName']}")
                print(f"   Account Path: {account['account']}")
                
                if 'propertySummaries' in account:
                    for prop in account['propertySummaries']:
                        print(f"\n   ✓ Property: {prop['displayName']}")
                        print(f"     Property Path: {prop['property']}")
                        # Extract numeric ID
                        prop_id = prop['property'].split('/')[-1]
                        print(f"     Property ID: {prop_id}")
                print()
        else:
            print("No Analytics accounts found")
            
    except HttpError as e:
        print(f"❌ Error accessing Analytics: {e}")
        if 'has not been used' in str(e) or 'disabled' in str(e).lower():
            print("\n⚠️  Analytics Admin API may not be enabled.")
            print("Enable at: https://console.developers.google.com/apis/api/analyticsadmin.googleapis.com")

def list_search_console_sites(creds):
    """List all Search Console sites."""
    print("\n" + "="*60)
    print("SEARCH CONSOLE SITES")
    print("="*60 + "\n")
    
    try:
        service = build('searchconsole', 'v1', credentials=creds)
        response = service.sites().list().execute()
        
        if 'siteEntry' in response:
            for site in response['siteEntry']:
                print(f"🔍 Site: {site['siteUrl']}")
                print(f"   Permission: {site['permissionLevel']}")
                print()
        else:
            print("No Search Console sites found")
            
    except HttpError as e:
        print(f"❌ Error accessing Search Console: {e}")

if __name__ == '__main__':
    print("Google Analytics + Search Console OAuth Setup")
    print("="*60 + "\n")
    
    # Load environment from .env file
    env_file = os.path.expanduser('~/.openclaw/.env')
    if os.path.exists(env_file):
        print(f"Loading environment from {env_file}...")
        with open(env_file, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    os.environ[key] = value.strip().strip('"').strip("'")
    
    # Authenticate
    creds = load_credentials()
    
    # List properties and sites
    list_analytics_properties(creds)
    list_search_console_sites(creds)
    
    print("\n" + "="*60)
    print("✅ Setup complete!")
    print(f"Tokens saved to: {TOKEN_FILE}")
    print("="*60)
