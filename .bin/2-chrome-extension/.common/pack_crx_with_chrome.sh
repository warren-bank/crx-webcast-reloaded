#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source "${DIR}/validate_env.sh"

# ------------------------------------------------------------------------------
# bootstrap

function main {
  cd "$ext_dir_base"

  if [ -f "$ext_key" ];then
    chrome --disable-gpu --disable-software-rasterizer "--pack-extension=${ext_dir}" "--pack-extension-key=${ext_key}"
  else
    chrome --disable-gpu --disable-software-rasterizer "--pack-extension=${ext_dir}"
  fi
}

main
