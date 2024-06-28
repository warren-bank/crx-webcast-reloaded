#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

"${DIR}/crx2/pack_crx2_with_openssl.sh"
"${DIR}/crx3/pack_crx3_with_openssl.sh"
"${DIR}/xpi/pack_unsigned_xpi.sh"
