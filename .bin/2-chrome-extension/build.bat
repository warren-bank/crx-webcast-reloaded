@echo off

call "%~dp0.\.env\constants.bat"

cd /D "%ext_dir_base%"

del /F "%ext_dir%\popup\js\popup.js"     >NUL 2>&1
del /F "%ext_dir%\popup\js\popup.js.map" >NUL 2>&1

if not exist "node_modules" (
  call npm install
)

call npm run build

echo.
pause
