@echo off

set BUILD_ALL=1

call "%~dp0.\crx2\pack_crx2_with_chrome.bat"
call "%~dp0.\crx3\pack_crx3_with_chrome.bat"
call "%~dp0.\xpi\pack_unsigned_xpi.bat"

echo.
pause
