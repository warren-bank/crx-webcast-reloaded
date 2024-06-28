#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

export ext_name='WebCast-Reloaded'

ext_dir_base="${DIR}/../../../chrome_extension"
export ext_dir_base=$(realpath "$ext_dir_base")
export ext_dir_name='2-release'

export ext_dir="${ext_dir_base}/${ext_dir_name}"
export ext_crx_default="${ext_dir}.crx"

export ext_key="${ext_dir_base}/${ext_name}.pem"
export ext_crx2="${ext_dir_base}/${ext_name}.crx2.crx"
export ext_crx3="${ext_dir_base}/${ext_name}.crx3.crx"
export ext_xpi="${ext_dir_base}/${ext_name}.unsigned.xpi"

export file_assertion_build_ok="${ext_dir}/popup/js/popup.js"
