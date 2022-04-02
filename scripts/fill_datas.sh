#!/usr/bin/env bash

srcdir="src"
srcimg="images"
dirname="static"
imgcount=$(ls "$srcdir/$dirname/$srcimg" | wc -l)
arrname="imagesArr"
outdir="allDatas.js"
# echo $imgcount

echo "export const $arrname = [" > "$srcdir/test/$outdir"
for imgpath in $(ls $srcdir/$dirname/$srcimg); do
    # echo $imgpath
    echo "   \"$dirname/$srcimg/$imgpath\"," >> "$srcdir/test/$outdir"
done
echo "];" >> "$srcdir/test/$outdir"
