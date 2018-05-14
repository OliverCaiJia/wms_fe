#!/bin/bash

cwd=`pwd`
newMd5OfDate=-$(echo -n "$(date +%s)" | md5sum | xxd -r -p | base64 | sed "s/+/-/g;s/\//_/g;s/=//g")

if  [ -n "$1" ] ;then
    newMd5OfDate=""
fi

# modify Gruntfile.coffee
oldValue="bizMd5: \?\+\"[0-9a-zA-Z_-]\?\+\""
oldMd5OfData=$(sed -n "/$oldValue/p" $cwd/Gruntfile.coffee | awk -F '"' '{print $2}')

newBizMd5Value="bizMd5: \"$newMd5OfDate\""
sed -i "s/$oldValue/$newBizMd5Value/" $cwd/Gruntfile.coffee


# modify index.html biz.js and share.js
oldHtml="js\/biz[0-9a-zA-Z_-]\?\+.js"
newHtml="js\/biz$newMd5OfDate.js"
sed -i "s/$oldHtml/$newHtml/" $cwd/wwwroot/index.html


oldSharedHtml="js\/shared[0-9a-zA-Z_-]\?\+.js"
newSharedHtml="js\/shared$newMd5OfDate.js"
sed -i "s/$oldSharedHtml/$newSharedHtml/" $cwd/wwwroot/index.html

if [ -f $cwd/wwwroot/js/biz$oldMd5OfData.js -a "$newMd5OfDate" != "$oldMd5OfData" ]; then
    mv $cwd/wwwroot/js/biz$oldMd5OfData.js  $cwd/wwwroot/js/biz$newMd5OfDate.js
    #git add $cwd/wwwroot/js/biz$newMd5OfDate.js
    #git rm $cwd/wwwroot/js/biz$oldMd5OfData.js
fi


#grunt coffee
grunt
