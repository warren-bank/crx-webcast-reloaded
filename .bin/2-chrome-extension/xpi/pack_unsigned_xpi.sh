#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source "${DIR}/../.env/constants.sh"
source "${DIR}/../.common/pack_unsigned_xpi_with_zip.sh"
