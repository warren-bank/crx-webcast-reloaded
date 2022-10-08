#!/usr/bin/env bash

if [ -z "$ext_name" ];then
  echo 'script configuration is invalid:'
  echo 'missing name of browser extension'
  exit 1
fi

# ------------------------------------------------------------------------------
# bootstrap

function main {
  cd "$ext_dir_base"

  if [ ! -d "$ext_dir" ];then
    echo 'Extension directory does not exist.'
    echo 'Perhaps the Typescript compiler build failed?'
    exit 1
  fi

  if [ -f "$ext_key" ];then
    chrome --disable-gpu --disable-software-rasterizer "--pack-extension=${ext_dir}" "--pack-extension-key=${ext_key}"
  else
    chrome --disable-gpu --disable-software-rasterizer "--pack-extension=${ext_dir}"
  fi
}

main
