@echo off

set BUILD_ALL=1

call "%~dp0.\.env\constants.bat"

cd /D "%ext_dir_base%"

rm -f "%ext_dir%\popup\js\popup.js"
rm -f "%ext_dir%\popup\js\popup.js.map"

if not exist "node_modules" (
  call npm install
)

call npm run build

call "%~dp0.\crx2\pack_crx2_with_chrome.bat"
call "%~dp0.\crx3\pack_crx3_with_chrome.bat"

echo.
pause
