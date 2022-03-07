all:
	bash scripts/precompile.sh
	node server/index.js

docker: stop build run

build:
	bash scripts/build.sh

run:
	bash scripts/run.sh

stop:
	bash scripts/stop.sh
