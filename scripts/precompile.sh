#!/usr/bin/env bash

handlebars_opts="--min -k if -k each"
srcdir="src"
outdir="precompiled"
paths=("views" "components")

for path in ${paths[@]}; do
  mkdir -p "$outdir/$path"
  for component in $(ls $srcdir/$path); do
    source="$srcdir/$path/$component/$component.handlebars"
    target="$outdir/$path/$component.js"
    if [ "$source" -nt "$target" ]; then
      echo "compiling $component..."
      handlebars $source $handlebars_opts -f $target
    fi
  done
done
