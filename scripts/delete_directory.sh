#!/usr/bin/env bash

srcdir="src"
echo "Enter directory name where you want to delete directory: [components, views]"
read path
# check path
until [[ $path == "components" || $path == "views" ]]; do
    echo "Wrong directory"
    read path
done
echo "Enter directory name:"
read dirname
newpath="$srcdir/$path/$dirname"

rm -rf "$newpath"
