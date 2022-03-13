docker: precompile down build up

precompile:
	bash scripts/precompile.sh

down:
	bash scripts/stop.sh

build:
	bash scripts/build.sh

up:
	bash scripts/run.sh

local: precompile local-up

local-up:
	bash scripts/local.sh

local-down:
	unlink /etc/nginx/sites-enabled/default.conf
	systemctl restart nginx.service
