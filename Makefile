# path to docker compose file
DCOMPOSE:=docker-compose.yaml

# improve build time
DOCKER_BUILD_KIT:=COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1

docker: pack precompile down build up

down:
	docker-compose -f ${DCOMPOSE} down

build:
	${DOCKER_BUILD_KIT} docker-compose build

up:
	docker-compose -f ${DCOMPOSE} up -d

pack:
	bash scripts/pack.sh

precompile:
	bash scripts/precompile.sh

local: pack precompile local-up

local-up:
	bash scripts/local.sh

local-down:
	unlink /etc/nginx/sites-enabled/default.conf
	systemctl restart nginx.service
