#!/usr/bin/env python3
"""Exchange authorization code for tokens."""

import json
import os
import sys
from urllib.parse import urlparse, parse_qs
import requests

TOKEN_FILE = os.path.expanduser('~/.openclaw/workspace/credentials/analytics_tokens.json')
CREDENTIALS_DIR = os.path.dirname(TOKEN_FILE)

def load_env():
    """Load environment variables."""
    env_file = os.path.expanduser('~/.openclaw/.env')
    if os.path.exists(env_file):
        with open(env_file, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    os.environ[key] = value.strip().strip('"').strip("'")

def exchange_code(auth_code):
    """Exchange authorization code for tokens."""
    client_id = os.getenv('GMAIL_CLIENT_ID')
    client_secret = os.getenv('GMAIL_CLIENT_SECRET')
    
    if not client_id or not client_secret:
        print("❌ Missing GMAIL_CLIENT_ID or GMAIL_CLIENT_SECRET")
        sys.exit(1)
    
    token_url = 'https://oauth2.googleapis.com/token'
    
    data = {
        'code': auth_code,
        'client_id': client_id,
        'client_secret': client_secret,
        'redirect_uri': 'http://localhost:8080/',
        'grant_type': 'authorization_code',
    }
    
    print("Exchanging authorization code for tokens...")
    response = requests.post(token_url, data=data)
    
    if response.status_code == 200:
        token_data = response.json()
        
        # Save tokens
        os.makedirs(CREDENTIALS_DIR, exist_ok=True)
        
        save_data = {
            'token': token_data['access_token'],
            'refresh_token': token_data.get('refresh_token'),
            'token_uri': token_url,
            'client_id': client_id,
            'client_secret': client_secret,
            'scopes': token_data.get('scope', '').split(),
        }
        
        with open(TOKEN_FILE, 'w') as f:
            json.dump(save_data, f, indent=2)
        
        print(f"✅ Tokens saved to: {TOKEN_FILE}")
        return True
    else:
        print(f"❌ Error exchanging code: {response.status_code}")
        print(response.text)
        return False

if __name__ == '__main__':
    load_env()
    
    if len(sys.argv) < 2:
        print("Usage: python3 exchange_auth_code.py <auth_code_or_callback_url>")
        print("\nProvide either:")
        print("  1. The full callback URL (localhost:8080/?state=...&code=...)")
        print("  2. Just the authorization code")
        sys.exit(1)
    
    input_val = sys.argv[1]
    
    # Check if it's a URL or just a code
    if input_val.startswith('http') or 'localhost' in input_val:
        # Parse URL to extract code
        parsed = urlparse(input_val)
        params = parse_qs(parsed.query)
        if 'code' in params:
            auth_code = params['code'][0]
            print(f"Extracted code from URL: {auth_code[:50]}...")
        else:
            print("❌ No 'code' parameter found in URL")
            sys.exit(1)
    else:
        auth_code = input_val
    
    if exchange_code(auth_code):
        print("\n✅ Authentication complete!")
        print("Now running property listing script...")
        os.system('python3 /home/azureuser/.openclaw/workspace/list_properties.py')
