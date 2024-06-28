@echo off

call "%~dp0.\validate_env.bat"

if NOT "%ERRORLEVEL%"=="0" exit /b %ERRORLEVEL%

rem :: -------------------------------------------------------------------------

cd /D "%ext_dir_base%"

if exist "%ext_key%" (
  chrome --disable-gpu --disable-software-rasterizer --pack-extension="%ext_dir%" --pack-extension-key="%ext_key%"
) else (
  chrome --disable-gpu --disable-software-rasterizer --pack-extension="%ext_dir%"
)
