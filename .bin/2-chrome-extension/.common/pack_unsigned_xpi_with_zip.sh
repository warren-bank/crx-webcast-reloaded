#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source "${DIR}/validate_env.sh"

# ------------------------------------------------------------------------------
# bootstrap

function main {
  cd "$ext_dir"

  # https://extensionworkshop.com/documentation/publish/package-your-extension/#package-linux
  zip -r -FS "$ext_xpi" *
}

main
