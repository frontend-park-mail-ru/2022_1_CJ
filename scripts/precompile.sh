#!/usr/bin/env bash

handlebars_opts="--min"
curdir="src"
paths=("views" "components")
outdir="$curdir/precompiled"

for path in ${paths[@]}; do
  mkdir -p "$outdir/$path"
done

for path in ${paths[@]}; do
  for component in $(ls $curdir/$path); do
    template="$curdir/$path/$component/$component.handlebars"
    compiled="$outdir/$path/$component.js"
    if [ "$template" -nt "$compiled" ]; then
      echo "compiling $component..."
      handlebars $template $handlebars_opts -f $compiled
    fi
  done
done
