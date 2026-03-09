#!/bin/bash
# Script for Atlas to update Mission Control dashboard data

set -e

# Check if mission-control.json exists
if [ ! -f "data/mission-control.json" ]; then
    echo "Error: data/mission-control.json not found!"
    exit 1
fi

echo "📝 Updating Mission Control data..."

# Validate JSON format (requires jq)
if command -v jq &> /dev/null; then
    if ! jq empty data/mission-control.json 2>/dev/null; then
        echo "❌ Invalid JSON format in mission-control.json"
        exit 1
    fi
    echo "✅ JSON format is valid"
else
    echo "⚠️  jq not installed, skipping JSON validation"
fi

# Git operations
if [ -d ".git" ]; then
    echo "📦 Committing changes..."
    git add data/mission-control.json
    
    # Check if there are changes to commit
    if git diff --cached --quiet; then
        echo "ℹ️  No changes to commit"
    else
        git commit -m "Update mission control data - $(date '+%Y-%m-%d %H:%M:%S')"
        echo "✅ Changes committed"
        
        # Push to remote
        echo "🚀 Pushing to GitHub..."
        git push origin main || git push origin master
        echo "✅ Pushed to GitHub"
        echo ""
        echo "🎉 Vercel will automatically deploy the updated data!"
    fi
else
    echo "⚠️  Not a git repository. Initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
fi

echo ""
echo "✨ Done! Dashboard will update automatically on Vercel."
