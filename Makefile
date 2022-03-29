# path to docker compose file
DCOMPOSE:=docker-compose.yaml

# improve build time
DOCKER_BUILD_KIT:=COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1

docker: down build up

down:
	docker-compose -f ${DCOMPOSE} down --remove-orphans

build:
	${DOCKER_BUILD_KIT} docker-compose build

up:
	docker-compose -f ${DCOMPOSE} up -d --remove-orphans

pack:
	bash scripts/pack.sh

precompile:
	bash scripts/precompile.sh

local: precompile pack local-up

local-up:
	bash scripts/local.sh

local-down:
	unlink /etc/nginx/sites-enabled/default.conf
	systemctl restart nginx.service

cleanup:
	rm -rf src/dist
	rm -rf precompiled
