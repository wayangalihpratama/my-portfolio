#!/bin/bash

# Simple Docker Compose wrapper for my-portfolio
# Usage: ./dc.sh [command]
# Example: ./dc.sh pnpm run dev

SERVICE="portfolio_dev"

if [ $# -eq 0 ]; then
    echo "Usage: ./dc.sh [command]"
    echo "Example: ./dc.sh pnpm run build"
    exit 1
fi

docker compose run --rm "$SERVICE" "$@"
