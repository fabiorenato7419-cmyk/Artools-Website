@echo off
setlocal
cd /d "%~dp0"

echo ============================================
echo   OPUS.pen  -  Deploy (add + commit + push)
echo ============================================
echo.

rem Mensagem do commit: usa o que voce passar como argumento,
rem senao pergunta; se deixar vazio, usa "update".
set "msg=%*"
if "%msg%"=="" set /p "msg=Mensagem do commit (Enter = 'update'): "
if "%msg%"=="" set "msg=update"

echo.
echo ^> git add -A
git add -A

echo ^> git commit -m "%msg%"
git commit -m "%msg%"

echo ^> git push
git push

echo.
echo --------------------------------------------
echo  Feito! A Vercel publica em ~1 minuto:
echo  https://artools-website-six.vercel.app
echo --------------------------------------------
echo.
pause
