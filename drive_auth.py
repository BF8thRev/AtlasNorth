#!/usr/bin/env python3
"""Get Drive OAuth token using existing client credentials."""
import json, os, sys
from google_auth_oauthlib.flow import InstalledAppFlow
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request

CLIENT_ID = "os.environ.get("GOOGLE_CLIENT_ID")"
CLIENT_SECRET = "os.environ.get("GOOGLE_CLIENT_SECRET")"
TOKEN_PATH = os.path.expanduser("~/.openclaw/workspace/credentials/drive_tokens.json")

SCOPES = ["https://www.googleapis.com/auth/drive.readonly"]

client_config = {
    "installed": {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "redirect_uris": ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"],
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token"
    }
}

creds = None
if os.path.exists(TOKEN_PATH):
    creds = Credentials.from_authorized_user_file(TOKEN_PATH, SCOPES)

if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    else:
        flow = InstalledAppFlow.from_client_config(client_config, SCOPES)
        creds = flow.run_local_server(port=0)
    
    with open(TOKEN_PATH, "w") as f:
        f.write(creds.to_json())

print("AUTH_OK")
print(f"Token saved to: {TOKEN_PATH}")
