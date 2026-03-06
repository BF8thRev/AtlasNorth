const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

async function searchGmail() {
  try {
    const tokensPath = path.join(process.env.HOME, '.openclaw/workspace/credentials/gmail_tokens.json');
    const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));
    
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials(tokens);
    
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    
    const query = 'analytics OR "search console" OR SCC OR HUSA OR hellmausa';
    const response = await gmail.users.messages.list({
      userId: 'me',
      q: query,
      maxResults: 20
    });
    
    if (!response.data.messages || response.data.messages.length === 0) {
      console.log('No messages found matching query.');
      return;
    }
    
    console.log(`Found ${response.data.messages.length} messages:\n`);
    
    for (const message of response.data.messages) {
      const details = await gmail.users.messages.get({
        userId: 'me',
        id: message.id,
        format: 'metadata',
        metadataHeaders: ['From', 'Subject', 'Date']
      });
      
      const headers = details.data.payload.headers;
      const from = headers.find(h => h.name === 'From')?.value || 'Unknown';
      const subject = headers.find(h => h.name === 'Subject')?.value || 'No subject';
      const date = headers.find(h => h.name === 'Date')?.value || 'Unknown date';
      
      console.log(`From: ${from}`);
      console.log(`Subject: ${subject}`);
      console.log(`Date: ${date}`);
      console.log(`ID: ${message.id}`);
      console.log('---');
    }
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

searchGmail();
