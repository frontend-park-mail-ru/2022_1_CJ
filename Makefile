all:
	sh scripts/precompile.sh
	node server/index.js

docker: stop build run

build:
	sh scripts/build.sh

run:
	sh scripts/run.sh

stop:
	sh scripts/stop.sh
