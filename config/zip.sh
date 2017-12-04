#!/bin/bash

cd build/production
cd html
zip -r html.zip $1
mv html.zip ../html.zip
cd ..
zip -r cdn.zip cdn
echo '打包完毕'