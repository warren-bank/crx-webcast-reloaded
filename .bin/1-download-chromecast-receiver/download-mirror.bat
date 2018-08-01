@echo off

set dst_dir="%~dp0..\..\chromecast_receiver"
set src_url="https://css.visualon.info/files/SampleReceiver/receiver.html"
set log="%~dpn0.log"

wget -p -k -nH --cut-dirs=2 -P %dst_dir% %src_url% >%log% 2>&1
