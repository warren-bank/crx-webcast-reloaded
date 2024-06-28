#!/usr/bin/env bash

if [ -z "$ext_name" ];then
  echo 'ERROR: Script configuration is invalid:'
  echo 'Missing name of browser extension.'
  exit 1
fi

if [ ! -d "$ext_dir" ];then
  echo 'ERROR: Extension directory does not exist.'
  exit 1
fi

if [ ! -f "$file_assertion_build_ok" ];then
  echo 'ERROR: Extension must be build before it is packed.'
  exit 1
fi
