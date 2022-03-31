#!/usr/bin/env bash

srcdir="src"
echo "Enter directory name where you want to create new directory: [components, views]"
read path

# check path
until [[ $path == "components" || $path == "views" ]]; do
    echo "Wrong directory"
    read path
done

# get old directory name & check it
echo "Enter directory name which you want to rename:"
read olddirname
until [[ $(ls $srcdir/$path) =~ $olddirname ]]; do
    echo "Unknown directory, enter directory"
    read olddirname
done

# get new directory name
echo "Enter new directory name:"
read newdirname

newpath="$srcdir/$path/$newdirname"
oldpath="$srcdir/$path/$olddirname"
mkdir "$newpath"

# copy files
cat "$oldpath/$olddirname.css" > "$newpath/$newdirname.css"
cat "$oldpath/$olddirname.handlebars" > "$newpath/$newdirname.handlebars"
cat "$oldpath/$olddirname.js" > "$newpath/$newdirname.js"

echo "${olddirname,}Component"
echo "${newdirname,}Component"
echo "$newpath/$newdirname.js"
sed -i'' -e "s/${olddirname,}Component/${newdirname,}Component/" $newpath/$newdirname.js
rm -rf "$newpath/$newdirname.js-e"

# delete old directory
rm -rf "$oldpath"
