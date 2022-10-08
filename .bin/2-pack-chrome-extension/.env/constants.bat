@echo off

set ext_name=WebCast-Reloaded

set ext_dir_base=%~dp0..\..\..\chrome_extension
set ext_dir_name=2-release

set _CD=%cd%
cd /D "%ext_dir_base%"
set ext_dir_base=%cd%
cd /D "%_CD%"
set _CD=

set ext_dir=%ext_dir_base%\%ext_dir_name%
set ext_crx_default=%ext_dir%.crx

set ext_key=%ext_dir_base%\%ext_name%.pem
set ext_crx2=%ext_dir_base%\%ext_name%.crx2.crx
set ext_crx3=%ext_dir_base%\%ext_name%.crx3.crx
