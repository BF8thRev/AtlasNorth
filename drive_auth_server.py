#!/usr/bin/env python3
"""Get Drive OAuth token via local server flow."""
import json, os, sys, webbrowser
from google_auth_oauthlib.flow import InstalledAppFlow

CLIENT_ID = "os.environ.get("GOOGLE_CLIENT_ID")"
CLIENT_SECRET = "os.environ.get("GOOGLE_CLIENT_SECRET")"
TOKEN_PATH = os.path.expanduser("~/.openclaw/workspace/credentials/drive_tokens.json")
SCOPES = [
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/drive.metadata.readonly"
]

client_config = {
    "installed": {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "redirect_uris": ["http://localhost"],
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token"
    }
}

flow = InstalledAppFlow.from_client_config(client_config, SCOPES)
# open_browser=False so WE print the URL
creds = flow.run_local_server(port=8765, open_browser=False, prompt='consent', access_type='offline')

with open(TOKEN_PATH, "w") as f:
    f.write(creds.to_json())

print(f"\nAUTH_OK — token saved to {TOKEN_PATH}")
