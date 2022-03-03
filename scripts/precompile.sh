#!/usr/bin/env bash

path="public/views"
outdir="templates"
handlebars_opts="--min --commonjs"
for component in $(ls $path); do
  template="$path/$component/$component.handlebars"
  compiled="$path/$outdir/$component.js"
  if [ "$template" -nt "$compiled" ]; then
    echo "compiling $component..."
    handlebars $template $handlebars_opts -f $compiled
  fi
done
