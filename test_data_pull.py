#!/usr/bin/env python3
"""Test pulling real data from Search Console, Analytics, and YouTube."""

import json
import os
from datetime import datetime, timedelta
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

ANALYTICS_TOKEN_FILE = os.path.expanduser('~/.openclaw/workspace/credentials/analytics_tokens.json')
GMAIL_TOKEN_FILE = os.path.expanduser('~/.openclaw/workspace/credentials/gmail_tokens.json')

def load_analytics_credentials():
    """Load Analytics credentials."""
    with open(ANALYTICS_TOKEN_FILE, 'r') as f:
        token_data = json.load(f)
    return Credentials(
        token=token_data['token'],
        refresh_token=token_data.get('refresh_token'),
        token_uri=token_data['token_uri'],
        client_id=token_data['client_id'],
        client_secret=token_data['client_secret'],
        scopes=token_data.get('scopes'),
    )

def load_youtube_credentials():
    """Load YouTube credentials (from gmail tokens)."""
    with open(GMAIL_TOKEN_FILE, 'r') as f:
        token_data = json.load(f)
    
    # Load client ID/secret from env
    client_id = os.getenv('GMAIL_CLIENT_ID')
    client_secret = os.getenv('GMAIL_CLIENT_SECRET')
    
    return Credentials(
        token=token_data['access_token'],
        refresh_token=token_data.get('refresh_token'),
        token_uri='https://oauth2.googleapis.com/token',
        client_id=client_id,
        client_secret=client_secret,
    )

def test_search_console():
    """Pull Search Console data from Newton Insights."""
    print("="*60)
    print("SEARCH CONSOLE - Newton Insights")
    print("="*60 + "\n")
    
    creds = load_analytics_credentials()
    
    try:
        service = build('searchconsole', 'v1', credentials=creds)
        
        # Get last 7 days
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=7)
        
        site_url = 'https://www.newton-insights.com/'
        
        request = {
            'startDate': str(start_date),
            'endDate': str(end_date),
            'dimensions': ['query'],
            'rowLimit': 10
        }
        
        response = service.searchanalytics().query(siteUrl=site_url, body=request).execute()
        
        if 'rows' in response:
            print(f"Top 10 queries ({start_date} to {end_date}):\n")
            print(f"{'Query':<40} {'Clicks':<8} {'Impressions':<12} {'CTR':<8} {'Position':<8}")
            print("-" * 80)
            
            for row in response['rows']:
                query = row['keys'][0][:38]
                clicks = row.get('clicks', 0)
                impressions = row.get('impressions', 0)
                ctr = row.get('ctr', 0) * 100
                position = row.get('position', 0)
                
                print(f"{query:<40} {clicks:<8} {impressions:<12} {ctr:<8.2f} {position:<8.1f}")
            
            print()
        else:
            print("No data available for this period\n")
            
        return True
        
    except HttpError as e:
        print(f"❌ Error: {e}\n")
        return False

def test_analytics():
    """Pull Google Analytics data from Newton Insights."""
    print("="*60)
    print("GOOGLE ANALYTICS - Newton Insights")
    print("="*60 + "\n")
    
    creds = load_analytics_credentials()
    
    try:
        from google.analytics.data_v1beta import BetaAnalyticsDataClient
        from google.analytics.data_v1beta.types import (
            RunReportRequest,
            DateRange,
            Dimension,
            Metric,
        )
        
        client = BetaAnalyticsDataClient(credentials=creds)
        
        property_id = "491614945"  # Newton Insights
        
        request = RunReportRequest(
            property=f"properties/{property_id}",
            date_ranges=[DateRange(start_date="7daysAgo", end_date="today")],
            dimensions=[Dimension(name="sessionSource")],
            metrics=[
                Metric(name="activeUsers"),
                Metric(name="sessions"),
            ],
            limit=10,
        )
        
        response = client.run_report(request)
        
        print("Top 10 traffic sources (last 7 days):\n")
        print(f"{'Source':<30} {'Users':<10} {'Sessions':<10}")
        print("-" * 50)
        
        for row in response.rows:
            source = row.dimension_values[0].value
            users = row.metric_values[0].value
            sessions = row.metric_values[1].value
            print(f"{source:<30} {users:<10} {sessions:<10}")
        
        print()
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}\n")
        # Check if it's a missing library
        if "No module named 'google.analytics'" in str(e):
            print("⚠️  google-analytics-data library not installed")
            print("Install with: pip install google-analytics-data\n")
        return False

def test_youtube():
    """Pull YouTube Analytics data from The Dime."""
    print("="*60)
    print("YOUTUBE ANALYTICS - The Dime")
    print("="*60 + "\n")
    
    # Load env
    env_file = os.path.expanduser('~/.openclaw/.env')
    if os.path.exists(env_file):
        with open(env_file, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    os.environ[key] = value.strip().strip('"').strip("'")
    
    creds = load_youtube_credentials()
    
    try:
        youtube = build('youtubeAnalytics', 'v2', credentials=creds)
        
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=7)
        
        request = youtube.reports().query(
            ids='channel==MINE',
            startDate=str(start_date),
            endDate=str(end_date),
            metrics='views,estimatedMinutesWatched,likes,comments,subscribersGained',
            dimensions='day',
            sort='day'
        )
        
        response = request.execute()
        
        if 'rows' in response:
            print(f"Daily stats ({start_date} to {end_date}):\n")
            print(f"{'Date':<12} {'Views':<8} {'Watch Mins':<12} {'Likes':<8} {'Comments':<10} {'Subs Gained':<12}")
            print("-" * 70)
            
            for row in response['rows']:
                print(f"{row[0]:<12} {row[1]:<8} {row[2]:<12} {row[3]:<8} {row[4]:<10} {row[5]:<12}")
            
            print()
        else:
            print("No data available for this period\n")
        
        return True
        
    except HttpError as e:
        print(f"❌ Error: {e}\n")
        return False

if __name__ == '__main__':
    print("\n" + "="*60)
    print("TESTING DATA ACCESS")
    print("="*60 + "\n")
    
    sc_ok = test_search_console()
    analytics_ok = test_analytics()
    youtube_ok = test_youtube()
    
    print("="*60)
    print("SUMMARY")
    print("="*60)
    print(f"Search Console: {'✅ Working' if sc_ok else '❌ Failed'}")
    print(f"Google Analytics: {'✅ Working' if analytics_ok else '❌ Failed'}")
    print(f"YouTube Analytics: {'✅ Working' if youtube_ok else '❌ Failed'}")
    print("="*60)
