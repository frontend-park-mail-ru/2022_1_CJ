#!/usr/bin/env bash

mkdir -p src/dist
cat $(find src -name '*.css') > src/dist/index.css

for file in $(find precompiled/views -name '*.js'); do (cat "$file"; echo;) done > src/dist/views.js
for file in $(find precompiled/components -name '*.js'); do (cat "$file"; echo;) done > src/dist/components.js
