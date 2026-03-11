@echo off
REM Facial Beauty Analyzer - Project Setup Script for Windows
REM This script automates the initial setup of the project

setlocal enabledelayedexpansion

echo.
echo 🚀 Facial Beauty Analyzer - Setup Script
echo ==========================================
echo.

REM Check Node.js installation
echo ✓ Checking Node.js installation...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js from https://nodejs.org
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo   Node.js version: %NODE_VERSION%
echo.

REM Check npm installation
echo ✓ Checking npm installation...
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm is not installed.
    exit /b 1
)

for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo   npm version: %NPM_VERSION%
echo.

REM Install dependencies
echo ✓ Installing dependencies...
call npm install
if %ERRORLEVEL% EQU 0 (
    echo ✅ Dependencies installed successfully!
) else (
    echo ❌ Failed to install dependencies
    exit /b 1
)
echo.

REM Create .env.local from .env.example
if not exist ".env.local" (
    echo ✓ Creating .env.local from .env.example...
    copy .env.example .env.local
    echo ✅ .env.local created
) else (
    echo ℹ  .env.local already exists
)
echo.

REM Verify git setup
echo ✓ Checking Git setup...
git rev-parse --git-dir >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ✅ Git repository initialized
) else (
    echo ℹ  Initializing Git repository...
    call git init
    call git add .
    call git commit -m "Initial commit - Facial Beauty Analyzer"
)
echo.

REM Success message
echo ==========================================
echo ✅ Setup complete!
echo ==========================================
echo.
echo 🎉 Next steps:
echo 1. Start development server:
echo    npm run dev
echo.
echo 2. Open in browser:
echo    http://localhost:3000
echo.
echo 3. For more information:
echo    - README.md - Main documentation
echo    - QUICKSTART.md - Quick start guide
echo    - SETUP.md - Detailed setup guide
echo.
echo 📚 Documentation files:
echo    - README.md
echo    - QUICKSTART.md
echo    - SETUP.md
echo    - DEPLOYMENT.md
echo    - TROUBLESHOOTING.md
echo    - CONTRIBUTING.md
echo    - PRIVACY.md
echo.
echo Happy coding! 🚀
echo.
pause
