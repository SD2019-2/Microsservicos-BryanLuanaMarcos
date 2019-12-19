cleanup() {
    echo "Stopping containers..."
    docker stop friends-service
    docker stop sd-neo4j
    echo "Bye"
}

trap cleanup EXIT

echo "Initializing Neo4j cluster"
docker-compose up -d
docker-compose logs -f --tail 5 friends-service