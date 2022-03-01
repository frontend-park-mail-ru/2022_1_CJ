#!/usr/bin/env bash

path="public/components"
handlebars_opts="--min --commonjs --namespace document.components"
for component in $(ls $path); do
  template="$path/$component/$component.handlebars"
  compiled="$path/$component/$component.js"
  if [ "$template" -nt "$compiled" ]; then
    echo "compiling $component..."
    handlebars $template $handlebars_opts -f $compiled
  fi
done

