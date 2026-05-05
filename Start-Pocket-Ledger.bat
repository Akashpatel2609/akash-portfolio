@echo off
cd /d "%~dp0"
echo Starting Pocket Ledger...
echo.
echo When Expo opens, scan the QR code with the Expo Go app on your iPhone.
echo Keep this window open while you use the app.
echo.
npx expo start --lan --port 8082
pause
