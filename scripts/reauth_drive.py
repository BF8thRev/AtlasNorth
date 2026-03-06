#!/usr/bin/env python3
"""
Re-authenticate Gmail OAuth with Drive API scopes
Run this to get a new authorization URL, then paste the code back
"""

import json, os
from google_auth_oauthlib.flow import InstalledAppFlow
from dotenv import load_dotenv

load_dotenv()

# Scopes: Gmail + Drive read-only
SCOPES = [
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/drive.readonly'
]

# Load credentials from environment
CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID')
CLIENT_SECRET = os.environ.get('GOOGLE_CLIENT_SECRET')

client_config = {
    "installed": {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "redirect_uris": ["http://localhost"]
    }
}

flow = InstalledAppFlow.from_client_config(client_config, SCOPES)

print("=" * 60)
print("Google OAuth Re-Authorization (Gmail + Drive)")
print("=" * 60)
print("\nOpening browser for authorization...")
print("If browser doesn't open, copy this URL:\n")

creds = flow.run_local_server(port=8080)

# Save tokens
token_data = {
    'access_token': creds.token,
    'refresh_token': creds.refresh_token,
    'expires_in': 3599,
    'scope': ' '.join(SCOPES),
    'token_type': 'Bearer'
}

with open('/home/azureuser/.openclaw/workspace/credentials/gmail_tokens.json', 'w') as f:
    json.dump(token_data, f, indent=2)

print("\n✅ Tokens saved to credentials/gmail_tokens.json")
print(f"✅ Scopes: {', '.join(SCOPES)}")
