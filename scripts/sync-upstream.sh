#!/bin/bash
# Sync Alto theme with upstream TryGhost/Alto
# Run daily via cron to keep main up to date

set -e

REPO_DIR="/home/ayman/work/mec/alto"
LOG_FILE="/home/ayman/work/mec/alto/scripts/sync-upstream.log"

cd "$REPO_DIR"

echo "$(date): Starting upstream sync..." >> "$LOG_FILE"

# Fetch upstream
git fetch upstream >> "$LOG_FILE" 2>&1

# Check if there are new commits
LOCAL=$(git rev-parse main)
UPSTREAM=$(git rev-parse upstream/main)

if [ "$LOCAL" = "$UPSTREAM" ]; then
    echo "$(date): Already up to date with upstream." >> "$LOG_FILE"
    exit 0
fi

# Try to merge upstream
git checkout main >> "$LOG_FILE" 2>&1

if git merge upstream/main --no-edit >> "$LOG_FILE" 2>&1; then
    echo "$(date): Successfully merged upstream/main" >> "$LOG_FILE"

    # Rebuild theme
    yarn zip >> "$LOG_FILE" 2>&1

    # Commit rebuilt assets if changed
    if ! git diff --quiet assets/built/; then
        git add assets/built/
        git commit -m "chore: Rebuild assets after upstream sync" >> "$LOG_FILE" 2>&1
    fi

    # Push to origin
    git push origin main >> "$LOG_FILE" 2>&1
    echo "$(date): Pushed to origin/main" >> "$LOG_FILE"
else
    echo "$(date): CONFLICT - Manual intervention required!" >> "$LOG_FILE"
    git merge --abort >> "$LOG_FILE" 2>&1
    exit 1
fi

echo "$(date): Sync complete." >> "$LOG_FILE"
