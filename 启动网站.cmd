@echo off
cd /d "%~dp0"

echo.
echo Starting portfolio website...
echo Keep this window open while viewing the site.
echo.

start "" /b cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:5173"
call npm.cmd run dev -- --port 5173

echo.
echo Website server stopped. Press any key to close.
pause >nul
