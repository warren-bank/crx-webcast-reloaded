@echo off

call "%~dp0..\.env\constants.bat"
call "%~dp0..\.env\7zip.bat"
call "%~dp0..\.common\pack_unsigned_xpi_with_7zip.bat"

if not defined BUILD_ALL (
  echo.
  pause
)
