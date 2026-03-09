#!/usr/bin/env python3
"""
Script for Atlas to programmatically update Mission Control dashboard data
"""

import json
import subprocess
from datetime import datetime
from pathlib import Path

DATA_FILE = Path("data/mission-control.json")


def load_data():
    """Load existing mission control data"""
    if not DATA_FILE.exists():
        return {"blockersForYou": [], "openLoops": []}
    
    with open(DATA_FILE, "r") as f:
        return json.load(f)


def save_data(data):
    """Save mission control data to JSON file"""
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)
    print(f"✅ Data saved to {DATA_FILE}")


def add_blocker(title, impact, difficulty, notes, status="pending"):
    """Add a new blocker"""
    data = load_data()
    
    # Generate ID
    existing_ids = [b["id"] for b in data["blockersForYou"]]
    blocker_num = len([id for id in existing_ids if id.startswith("blocker-")]) + 1
    
    blocker = {
        "id": f"blocker-{blocker_num}",
        "title": title,
        "impact": impact,
        "difficulty": difficulty,
        "notes": notes,
        "status": status
    }
    
    data["blockersForYou"].append(blocker)
    save_data(data)
    return blocker


def add_loop(title, impact, difficulty, notes, status="in-progress"):
    """Add a new open loop"""
    data = load_data()
    
    # Generate ID
    existing_ids = [l["id"] for l in data["openLoops"]]
    loop_num = len([id for id in existing_ids if id.startswith("loop-")]) + 1
    
    loop = {
        "id": f"loop-{loop_num}",
        "title": title,
        "impact": impact,
        "difficulty": difficulty,
        "notes": notes,
        "status": status
    }
    
    data["openLoops"].append(loop)
    save_data(data)
    return loop


def update_status(item_id, new_status):
    """Update the status of an item"""
    data = load_data()
    
    # Check blockers
    for blocker in data["blockersForYou"]:
        if blocker["id"] == item_id:
            blocker["status"] = new_status
            save_data(data)
            print(f"✅ Updated {item_id} status to {new_status}")
            return True
    
    # Check loops
    for loop in data["openLoops"]:
        if loop["id"] == item_id:
            loop["status"] = new_status
            save_data(data)
            print(f"✅ Updated {item_id} status to {new_status}")
            return True
    
    print(f"❌ Item {item_id} not found")
    return False


def remove_item(item_id):
    """Remove an item by ID"""
    data = load_data()
    
    # Remove from blockers
    data["blockersForYou"] = [b for b in data["blockersForYou"] if b["id"] != item_id]
    
    # Remove from loops
    data["openLoops"] = [l for l in data["openLoops"] if l["id"] != item_id]
    
    save_data(data)
    print(f"✅ Removed {item_id}")


def git_commit_and_push():
    """Commit and push changes to git"""
    try:
        # Add file
        subprocess.run(["git", "add", str(DATA_FILE)], check=True)
        
        # Check if there are changes
        result = subprocess.run(
            ["git", "diff", "--cached", "--quiet"],
            capture_output=True
        )
        
        if result.returncode == 0:
            print("ℹ️  No changes to commit")
            return
        
        # Commit
        commit_msg = f"Update mission control data - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        subprocess.run(["git", "commit", "-m", commit_msg], check=True)
        print("✅ Changes committed")
        
        # Push
        try:
            subprocess.run(["git", "push", "origin", "main"], check=True)
        except subprocess.CalledProcessError:
            subprocess.run(["git", "push", "origin", "master"], check=True)
        
        print("✅ Pushed to GitHub")
        print("🎉 Vercel will automatically deploy the updated data!")
        
    except subprocess.CalledProcessError as e:
        print(f"⚠️  Git operation failed: {e}")
    except FileNotFoundError:
        print("⚠️  Git not found. Make sure git is installed and initialized.")


# Example usage
if __name__ == "__main__":
    # Example: Add a new blocker
    add_blocker(
        title="Example: Review Q1 Budget",
        impact=75,
        difficulty=25,
        notes="This is an example blocker. Edit this script to add your own.",
        status="pending"
    )
    
    print("\n📋 Current data:")
    data = load_data()
    print(f"  Blockers: {len(data['blockersForYou'])}")
    print(f"  Open Loops: {len(data['openLoops'])}")
    
    # Uncomment to commit and push:
    # git_commit_and_push()
    
    print("\n💡 To use this script:")
    print("  1. Edit the script to call the functions you need")
    print("  2. Run: python update-data.py")
    print("  3. Uncomment git_commit_and_push() to auto-deploy")
