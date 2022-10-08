@echo off

set dst_dir="%~dp0..\..\..\chromecast_receiver\2-visualon"
set src_url="https://css.visualon.info/Receiver/website-demo/SampleReceiver/receiver.html"
set log="%~dpn0.log"

wget -p -k -nH --cut-dirs=3 -P %dst_dir% %src_url% >%log% 2>&1
