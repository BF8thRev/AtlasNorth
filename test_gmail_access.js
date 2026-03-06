const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

async function testGmailAccess() {
  try {
    // Load .env manually
    const envPath = path.join(process.env.HOME, '.openclaw/.env');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envVars = {};
    envContent.split('\n').forEach(line => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        envVars[match[1]] = match[2];
      }
    });
    
    const tokensPath = path.join(process.env.HOME, '.openclaw/workspace/credentials/gmail_tokens.json');
    const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));
    
    // Create OAuth2 client with proper credentials
    const oauth2Client = new google.auth.OAuth2(
      envVars.GMAIL_CLIENT_ID,
      envVars.GMAIL_CLIENT_SECRET,
      'http://localhost'
    );
    oauth2Client.setCredentials(tokens);
    
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    
    // Get user profile to test access
    const profile = await gmail.users.getProfile({ userId: 'me' });
    
    console.log('✓ Gmail API access confirmed!');
    console.log(`Email: ${profile.data.emailAddress}`);
    console.log(`Total messages: ${profile.data.messagesTotal}`);
    console.log(`Total threads: ${profile.data.threadsTotal}`);
    
  } catch (error) {
    console.error('✗ Error accessing Gmail:', error.message);
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

testGmailAccess();
