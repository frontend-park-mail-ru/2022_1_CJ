#!/usr/bin/env bash

srcdir="src"
echo "Enter directory name where you want to create new directory: [components, views]"
read path
# check path
until [[ $path == "components" || $path == "views" ]]; do
    echo "Wrong directory"
    read path
done
echo "Enter new directory name:"
read dirname
newpath="$srcdir/$path/$dirname"

mkdir "$newpath"
touch "$newpath/$dirname.css"
touch "$newpath/$dirname.handlebars"
touch "$newpath/$dirname.js"
newdirname=${dirname,}

echo "import { createComponent } from '../../core/models/Component/Component.js';

const reducer = {
  onShow: () => {}
};

export const ${newdirname}Component = (template) => createComponent(template, reducer);" > "$newpath/$dirname.js"
