cleanup() {
    echo "Stopping containers..."
    docker stop users-service
    docker stop sd-mongo
    echo "Bye"
}

trap cleanup EXIT

echo "Initializing MongoDB cluster"
docker-compose up -d
docker-compose logs -f --tail 5 users-service