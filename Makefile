all: stop build run

build:
	sh scripts/build.sh

run:
	sh scripts/run.sh

stop:
	sh scripts/stop.sh

debug:
	sh scripts/precompile.sh
	node server/index.js
