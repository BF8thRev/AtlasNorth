#!/usr/bin/env python3
"""Generate Drive OAuth URL for manual auth."""
import json, os
from google_auth_oauthlib.flow import Flow

CLIENT_ID = "os.environ.get("GOOGLE_CLIENT_ID")"
CLIENT_SECRET = "os.environ.get("GOOGLE_CLIENT_SECRET")"
SCOPES = ["https://www.googleapis.com/auth/drive.readonly"]
TOKEN_PATH = os.path.expanduser("~/.openclaw/workspace/credentials/drive_tokens.json")

client_config = {
    "installed": {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "redirect_uris": ["urn:ietf:wg:oauth:2.0:oob"],
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token"
    }
}

flow = Flow.from_client_config(
    client_config,
    scopes=SCOPES,
    redirect_uri="urn:ietf:wg:oauth:2.0:oob"
)

auth_url, _ = flow.authorization_url(
    access_type='offline',
    include_granted_scopes='true',
    prompt='consent'
)

print("=== VISIT THIS URL IN BROWSER ===")
print(auth_url)
print("=== Then paste the code below ===")
code = input("Enter code: ").strip()

flow.fetch_token(code=code)
creds = flow.credentials

with open(TOKEN_PATH, "w") as f:
    f.write(creds.to_json())

print(f"Token saved to {TOKEN_PATH}")
