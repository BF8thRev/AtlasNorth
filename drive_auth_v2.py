#!/usr/bin/env python3
"""Get Drive OAuth token - manual URL approach."""
import json, os, sys, urllib.parse, http.server, threading, webbrowser
import google.auth.transport.requests
from google_auth_oauthlib.flow import Flow

CLIENT_ID = "os.environ.get("GOOGLE_CLIENT_ID")"
CLIENT_SECRET = "os.environ.get("GOOGLE_CLIENT_SECRET")"
TOKEN_PATH = os.path.expanduser("~/.openclaw/workspace/credentials/drive_tokens.json")
REDIRECT_URI = "http://localhost:8765"
SCOPES = ["https://www.googleapis.com/auth/drive.readonly"]

client_config = {
    "installed": {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "redirect_uris": [REDIRECT_URI],
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token"
    }
}

# Capture the auth code
auth_code = None

class Handler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        global auth_code
        params = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
        auth_code = params.get('code', [None])[0]
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"<html><body><h1>Auth complete! You can close this tab.</h1></body></html>")
    def log_message(self, *args):
        pass

flow = Flow.from_client_config(client_config, scopes=SCOPES, redirect_uri=REDIRECT_URI)
auth_url, _ = flow.authorization_url(access_type='offline', prompt='consent')

print("\n" + "="*60)
print("OPEN THIS URL IN BROWSER (signed in as atlas.opsman@gmail.com):")
print("="*60)
print(auth_url)
print("="*60 + "\n")
print("Waiting for authorization on http://localhost:8765 ...")
sys.stdout.flush()

import sys
server = http.server.HTTPServer(('localhost', 8765), Handler)
server.handle_request()

if auth_code:
    flow.fetch_token(code=auth_code)
    creds = flow.credentials
    with open(TOKEN_PATH, "w") as f:
        f.write(creds.to_json())
    print(f"\nAUTH_OK — token saved to {TOKEN_PATH}")
else:
    print("ERROR: No auth code received")
