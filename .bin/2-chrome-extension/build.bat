@echo off

call "%~dp0.\.env\constants.bat"

cd /D "%ext_dir_base%"

rm -f "%ext_dir%\popup\js\popup.js"
rm -f "%ext_dir%\popup\js\popup.js.map"

if not exist "node_modules" (
  call npm install
)

call npm run build

echo.
pause
