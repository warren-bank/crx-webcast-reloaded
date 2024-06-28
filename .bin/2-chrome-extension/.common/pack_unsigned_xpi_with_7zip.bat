@echo off

call "%~dp0.\validate_env.bat"

if NOT "%ERRORLEVEL%"=="0" exit /b %ERRORLEVEL%

rem :: -------------------------------------------------------------------------

cd /D "%ext_dir%"

rem :: https://sevenzip.osdn.jp/chm/cmdline/index.htm
rem :: https://sevenzip.osdn.jp/chm/cmdline/commands/add.htm
7z a -tzip %ext_xpi% -r .
