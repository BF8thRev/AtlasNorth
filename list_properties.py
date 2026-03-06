#!/usr/bin/env python3
"""List Google Analytics properties and Search Console sites."""

import json
import os
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

TOKEN_FILE = os.path.expanduser('~/.openclaw/workspace/credentials/analytics_tokens.json')

def load_credentials():
    """Load credentials from token file."""
    if not os.path.exists(TOKEN_FILE):
        print(f"❌ Token file not found: {TOKEN_FILE}")
        return None
    
    with open(TOKEN_FILE, 'r') as f:
        token_data = json.load(f)
    
    return Credentials(
        token=token_data['token'],
        refresh_token=token_data.get('refresh_token'),
        token_uri=token_data['token_uri'],
        client_id=token_data['client_id'],
        client_secret=token_data['client_secret'],
        scopes=token_data.get('scopes'),
    )

def list_analytics_properties(creds):
    """List all Analytics properties."""
    print("="*60)
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
            return True
        else:
            print("No Analytics accounts found\n")
            return False
            
    except HttpError as e:
        print(f"❌ Error accessing Analytics: {e}\n")
        if 'has not been used' in str(e) or 'disabled' in str(e).lower():
            print("⚠️  Analytics Admin API may not be enabled.")
            print("Enable at: https://console.developers.google.com/apis/api/analyticsadmin.googleapis.com\n")
        return False

def list_search_console_sites(creds):
    """List all Search Console sites."""
    print("="*60)
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
            return True
        else:
            print("No Search Console sites found\n")
            return False
            
    except HttpError as e:
        print(f"❌ Error accessing Search Console: {e}\n")
        return False

if __name__ == '__main__':
    creds = load_credentials()
    if not creds:
        exit(1)
    
    analytics_ok = list_analytics_properties(creds)
    console_ok = list_search_console_sites(creds)
    
    print("="*60)
    if analytics_ok or console_ok:
        print("✅ Done!")
    else:
        print("⚠️  No properties or sites found")
    print("="*60)
