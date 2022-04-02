#!/usr/bin/env bash

srcdir="src"
echo "Enter directory name where you want to create new directory: [components, views]"
read path
# check path
until [[ $path == "components" || $path == "views" ]]; do
    echo "Wrong directory"
    read path
done

# get directory name & check if it exist
echo "Enter new directory name:"
read dirname
until [[ ! $(ls $srcdir/$path) =~ $dirname ]]; do
    echo $(ls $srcdir/$path)
    echo "----------------------------------------------------"
    echo $dirname
    echo "Such directory is already exist, enter another name:"
    read dirname
done
newpath="$srcdir/$path/$dirname"

type=${path::-1}
type=${type^}

mkdir "$newpath"
touch "$newpath/$dirname.css"
touch "$newpath/$dirname.handlebars"
touch "$newpath/$dirname.js"
newdirname=${dirname,}

echo "import { create$type } from '../../core/models/$type/$type.js';

const reducer = {
  onShow: () => {}
};

export const ${newdirname}$type = (template) => create$type(template, reducer);" > "$newpath/$dirname.js"
