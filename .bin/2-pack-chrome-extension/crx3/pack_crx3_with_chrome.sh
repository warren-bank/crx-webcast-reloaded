#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source "${DIR}/../.env/constants.sh"
source "${DIR}/../.env/chrome_crx3.sh"
source "${DIR}/../.common/pack_crx_with_chrome.sh"

if [ -f "$ext_crx_default" ];then
  mv "$ext_crx_default" "$ext_crx3"
fi
