@echo off

if not defined ext_name (
  echo ERROR: Script configuration is invalid:
  echo Missing name of browser extension.
  exit /b 1
)

if not exist "%ext_dir%" (
  echo ERROR: Extension directory does not exist.
  exit /b 1
)

if not exist "%file_assertion_build_ok%" (
  echo ERROR: Extension must be build before it is packed.
  exit /b 1
)
