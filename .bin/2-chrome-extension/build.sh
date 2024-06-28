#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source "${DIR}/.env/constants.sh"

cd "$ext_dir_base"

rm -f "${ext_dir}/popup/js/popup.js"
rm -f "${ext_dir}/popup/js/popup.js.map"

if [ ! -d 'node_modules' ];then
  npm install
fi

npm run build
