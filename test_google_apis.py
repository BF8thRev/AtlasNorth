#!/usr/bin/env python3
"""Test Google Analytics Data API and Search Console API access."""

import json
import os
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

def load_credentials():
    """Load OAuth credentials from gog's token storage."""
    # Try common gog credential locations
    possible_paths = [
        os.path.expanduser("~/.config/gog/credentials.json"),
        os.path.expanduser("~/.gog/credentials.json"),
        os.path.expanduser("~/.openclaw/workspace/credentials/gmail_tokens.json"),
    ]
    
    for path in possible_paths:
        if os.path.exists(path):
            with open(path, 'r') as f:
                data = json.load(f)
                # Try to extract token
                if 'access_token' in data:
                    return Credentials(
                        token=data['access_token'],
                        refresh_token=data.get('refresh_token'),
                        token_uri='https://oauth2.googleapis.com/token',
                        client_id=os.getenv('GMAIL_CLIENT_ID'),
                        client_secret=os.getenv('GMAIL_CLIENT_SECRET')
                    )
                # Check for gog format
                if 'accounts' in data:
                    for account in data['accounts']:
                        if account.get('email') == 'atlas.opsman@gmail.com':
                            token = account.get('token', {})
                            return Credentials(
                                token=token.get('access_token'),
                                refresh_token=token.get('refresh_token'),
                                token_uri='https://oauth2.googleapis.com/token',
                                client_id=os.getenv('GMAIL_CLIENT_ID'),
                                client_secret=os.getenv('GMAIL_CLIENT_SECRET')
                            )
    return None

def test_analytics():
    """Test Google Analytics Data API."""
    print("Testing Analytics Data API...")
    creds = load_credentials()
    if not creds:
        print("❌ Could not load credentials")
        return False
    
    try:
        # Try to build the analytics data service
        service = build('analyticsdata', 'v1beta', credentials=creds)
        print("✅ Analytics Data API: Client built successfully")
        
        # Try to list properties (will fail if no access or API not enabled)
        try:
            # This is a test call - will fail gracefully if no properties
            response = service.properties().runReport(
                property='properties/123456',  # Dummy property
                body={}
            ).execute()
        except HttpError as e:
            if e.resp.status == 403:
                if 'disabled' in str(e).lower():
                    print("❌ Analytics Data API is NOT ENABLED")
                    return False
                else:
                    print("✅ Analytics Data API is ENABLED (got 403 permission error, not disabled error)")
                    return True
            elif e.resp.status == 400:
                print("✅ Analytics Data API is ENABLED (got 400 bad request, API is active)")
                return True
            else:
                print(f"⚠️  Got error: {e}")
                return True  # API is enabled, just other error
        
        print("✅ Analytics Data API: WORKING")
        return True
        
    except Exception as e:
        print(f"❌ Analytics Data API error: {e}")
        if 'has not been used' in str(e) or 'disabled' in str(e).lower():
            return False
        return None

def test_search_console():
    """Test Google Search Console API."""
    print("\nTesting Search Console API...")
    creds = load_credentials()
    if not creds:
        print("❌ Could not load credentials")
        return False
    
    try:
        # Try to build the search console service
        service = build('searchconsole', 'v1', credentials=creds)
        print("✅ Search Console API: Client built successfully")
        
        # Try to list sites
        try:
            response = service.sites().list().execute()
            print(f"✅ Search Console API: WORKING (found {len(response.get('siteEntry', []))} sites)")
            return True
        except HttpError as e:
            if e.resp.status == 403:
                if 'disabled' in str(e).lower() or 'has not been used' in str(e).lower():
                    print("❌ Search Console API is NOT ENABLED")
                    return False
                else:
                    print("✅ Search Console API is ENABLED (got 403 permission error)")
                    return True
            else:
                print(f"⚠️  Got error: {e}")
                return True
        
    except Exception as e:
        print(f"❌ Search Console API error: {e}")
        if 'has not been used' in str(e) or 'disabled' in str(e).lower():
            return False
        return None

if __name__ == '__main__':
    analytics_ok = test_analytics()
    console_ok = test_search_console()
    
    print("\n" + "="*50)
    print("SUMMARY:")
    print(f"Analytics Data API: {'✅ ENABLED' if analytics_ok else '❌ NOT ENABLED' if analytics_ok is False else '⚠️  UNKNOWN'}")
    print(f"Search Console API: {'✅ ENABLED' if console_ok else '❌ NOT ENABLED' if console_ok is False else '⚠️  UNKNOWN'}")
