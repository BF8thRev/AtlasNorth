#!/usr/bin/env python3
"""Get Google Analytics property IDs and Search Console site URLs."""

import json
import os
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

def load_credentials():
    """Load OAuth credentials."""
    path = os.path.expanduser("~/.openclaw/workspace/credentials/gmail_tokens.json")
    if os.path.exists(path):
        with open(path, 'r') as f:
            data = json.load(f)
            return Credentials(
                token=data['access_token'],
                refresh_token=data.get('refresh_token'),
                token_uri='https://oauth2.googleapis.com/token',
                client_id=os.getenv('GMAIL_CLIENT_ID'),
                client_secret=os.getenv('GMAIL_CLIENT_SECRET')
            )
    return None

def get_analytics_properties():
    """List all Analytics properties."""
    print("Fetching Google Analytics Properties...")
    creds = load_credentials()
    
    try:
        # Use Admin API to list accounts and properties
        admin = build('analyticsadmin', 'v1beta', credentials=creds)
        
        # List all account summaries
        response = admin.accountSummaries().list().execute()
        
        if 'accountSummaries' in response:
            print(f"\nFound {len(response['accountSummaries'])} account(s):\n")
            for account in response['accountSummaries']:
                print(f"Account: {account['displayName']}")
                print(f"  Account ID: {account['account']}")
                
                if 'propertySummaries' in account:
                    for prop in account['propertySummaries']:
                        print(f"\n  Property: {prop['displayName']}")
                        print(f"    Property ID: {prop['property']}")
                        # Extract numeric ID from properties/XXXXXX format
                        prop_id = prop['property'].split('/')[-1]
                        print(f"    Numeric ID: {prop_id}")
                print()
        else:
            print("No Analytics accounts found")
            
    except HttpError as e:
        if 'has not been used' in str(e) or 'disabled' in str(e).lower():
            print(f"❌ Analytics Admin API not enabled")
            print(f"Enable at: https://console.developers.google.com/apis/api/analyticsadmin.googleapis.com/overview?project=814785199251")
        else:
            print(f"Error: {e}")
    except Exception as e:
        print(f"Error: {e}")

def get_search_console_sites():
    """List all Search Console sites."""
    print("\n" + "="*60)
    print("Fetching Search Console Sites...")
    creds = load_credentials()
    
    try:
        service = build('searchconsole', 'v1', credentials=creds)
        response = service.sites().list().execute()
        
        if 'siteEntry' in response:
            print(f"\nFound {len(response['siteEntry'])} site(s):\n")
            for site in response['siteEntry']:
                print(f"Site URL: {site['siteUrl']}")
                print(f"  Permission Level: {site['permissionLevel']}")
                print()
        else:
            print("No Search Console sites found")
            
    except HttpError as e:
        print(f"Error: {e}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    get_analytics_properties()
    get_search_console_sites()
