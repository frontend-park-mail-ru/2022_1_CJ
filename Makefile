# path to docker compose file
DCOMPOSE:=docker-compose.yaml

# improve build time
DOCKER_BUILD_KIT:=COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1

production: cleanup build docker

docker: docker-down docker-build docker-up

dev: docker-down cleanup docker-up watch

build:
	npm run build

watch:
	npm run build:watch

docker-down:
	docker-compose -f ${DCOMPOSE} down --remove-orphans

docker-build:
	${DOCKER_BUILD_KIT} docker-compose build

docker-up:
	docker-compose -f ${DCOMPOSE} up -d --remove-orphans

cleanup:
	npm run clean
