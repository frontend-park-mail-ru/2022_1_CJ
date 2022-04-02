#!/usr/bin/env bash

srcdir="src/"
srcimg="images/"
dirname="static/"
imgcount=$(ls "$srcdir/$dirname/$srcimg" | wc -l)
arrname="imagesArr"
# echo $imgcount

echo "const $arrname = [" > "$srcdir/test/all datas.js"
for imgpath in $(ls $srcdir/$dirname/$srcimg); do
    # echo $imgpath
    echo "   \"$imgpath\"," >> "$srcdir/test/all datas.js"
done
echo "];" >> "$srcdir/test/all datas.js"
