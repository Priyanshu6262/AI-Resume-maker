@echo off
echo Starting AI Resume Maker Services...

:: Start the Express Server
echo Starting the Backend Server...
start "Backend Server" cmd /k "cd server && npm start"

:: Start the Vite Client
echo Starting the Frontend Client...
start "Frontend Client" cmd /k "cd client && npm run dev"

echo Both services have been started in new terminal windows.
pause
