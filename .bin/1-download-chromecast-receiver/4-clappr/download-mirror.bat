@echo off

set dst_dir="%~dp0..\..\..\chromecast_receiver\4-clappr"
set src_url="https://www.gstatic.com/eureka/player/player.html"
set log="%~dpn0.log"

set cc_useragent="Mozilla/5.0 (CrKey armv7l 1.5.16041) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.0 Safari/537.36"
set wget_opts=-p -k -nH --cut-dirs=0 --no-check-certificate -e robots=off --user-agent=%cc_useragent%

wget %wget_opts% -P %dst_dir% %src_url% >%log% 2>&1

rem :: -----------------------------------------------------

set src_url="https://www.googledrive.com/host/0BwPC8pnYMHozZThjZmhHUDN5d2M"

echo.>>%log%

wget %wget_opts% -P %dst_dir% %src_url% >>%log% 2>>&1
