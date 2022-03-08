docker: stop build run

stop:
	bash scripts/stop.sh

build:
	bash scripts/build.sh

run:
	bash scripts/run.sh

enable-local:
	cp nginx/nginx.conf /etc/nginx/nginx.conf
	cp nginx/default.conf /etc/nginx/sites-available/default.conf
	cp -r public/* /var/www/web
	ln -s /etc/nginx/sites-available/default.conf /etc/nginx/sites-enabled/default.conf

disbable-local:
	unlink /etc/nginx/sites-enabled/default.conf
