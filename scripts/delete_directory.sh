#!/usr/bin/env bash

srcdir="src"
echo "Enter directory name where you want to delete directory: [components, views]"
read path
# check path
until [[ $path == "components" || $path == "views" ]]; do
    echo "Wrong directory"
    read path
done

# get old directory name & check it
echo "Enter directory name which you want to delete:"
read dirname
until [[ $(ls $srcdir/$path) =~ $dirname ]]; do
    echo "Unknown directory, enter correct directory"
    read dirname
done

newpath="$srcdir/$path/$dirname"

rm -rf "$newpath"
