@echo off

set dst_dir="%~dp0..\..\..\chromecast_receiver\1-webcast"
set src_url="https://www.gstatic.com/eureka/player/player.html?skin"
set log="%~dpn0.log"

wget -p -k -nH --cut-dirs=2 --no-check-certificate -e robots=off -P %dst_dir% %src_url% >%log% 2>&1
