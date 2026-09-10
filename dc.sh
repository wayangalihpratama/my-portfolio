#!/bin/bash

# Docker Compose wrapper for my-portfolio
# Usage: 
#   ./dc.sh up -d          (Starts container in background)
#   ./dc.sh down           (Stops containers)
#   ./dc.sh logs -f        (Views logs)
#   ./dc.sh [npm/pnpm/sh]  (Executes one-off commands inside portfolio_dev)

SERVICE="portfolio_dev"

if [ $# -eq 0 ]; then
    echo "Usage: ./dc.sh [command]"
    echo "Examples:"
    echo "  ./dc.sh up -d"
    echo "  ./dc.sh down"
    echo "  ./dc.sh npm run dev"
    exit 1
fi

case "$1" in
    up|down|ps|logs|build|restart|stop)
        docker compose "$@"
        ;;
    *)
        docker compose run --rm "$SERVICE" "$@"
        ;;
esac

