@echo off

set dst_dir="%~dp0..\..\..\chromecast_receiver\3-theoplayer"
set src_url="https://d3ojqkc95d8mrd.cloudfront.net/chromecast/receiver/index.html"
set log="%~dpn0.log"

wget -p -k -nH --cut-dirs=1 --no-check-certificate -e robots=off -P %dst_dir% %src_url% >%log% 2>&1

rem :: -----------------------------------------------------

set dst_dir="%~dp0..\..\..\chromecast_receiver\3-theoplayer\release"

call :dl_additional_file "https://d3ojqkc95d8mrd.cloudfront.net/chromecast/release/theoplayer.d.js"
call :dl_additional_file "https://d3ojqkc95d8mrd.cloudfront.net/chromecast/release/theoplayer.e.js"
call :dl_additional_file "https://d3ojqkc95d8mrd.cloudfront.net/chromecast/release/theoplayer.p.js"

goto done

:dl_additional_file
  set src_url="%~1"
  echo.>>%log%
  wget --no-check-certificate -e robots=off -P %dst_dir% %src_url% >>%log% 2>>&1
  goto :eof

:done
