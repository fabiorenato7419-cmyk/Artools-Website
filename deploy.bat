@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

echo ==========================================
echo   OPUS.pen  -  Deploy
echo ==========================================
echo.

rem Mensagem: pega os argumentos e remove aspas extras.
set msg=%*
if defined msg set msg=%msg:"=%
if "%msg%"=="" set /p "msg=Mensagem do commit: "
if "%msg%"=="" set msg=update

echo.
git add -A
git commit -m "%msg%"
git push

echo.
echo ------------------------------------------
echo  Feito. A Vercel publica em ~1 minuto:
echo    https://artools-website-six.vercel.app
echo ------------------------------------------
echo.
pause
