#!/bin/bash

set -e

yarn build
cd dist
sed -i 's/\/src/\/flip-grow\/src/g' index.html
git init
git checkout -b gh-pages
git add .
git commit -m 'Build site'
git remote add origin git@github.com:meriadec/flip-grow.git
git push -f origin gh-pages
