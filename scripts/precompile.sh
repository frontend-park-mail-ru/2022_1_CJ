#!/usr/bin/env bash

handlebars_opts="--min"
paths=("src/views" "src/components")
outdir="src/precompiled"

mkdir -p $outdir
for path in ${paths[@]}; do
  for component in $(ls $path); do
    template="$path/$component/$component.handlebars"
    compiled="$outdir/$component.js"
    if [ "$template" -nt "$compiled" ]; then
      echo "compiling $component..."
      handlebars $template $handlebars_opts -f $compiled
    fi
  done
done
