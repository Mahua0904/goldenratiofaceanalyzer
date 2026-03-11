#!/bin/bash

# Facial Beauty Analyzer - Project Setup Script
# This script automates the initial setup of the project

set -e

echo "🚀 Facial Beauty Analyzer - Setup Script"
echo "=========================================="
echo ""

# Check Node.js installation
echo "✓ Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "  Node.js version: $NODE_VERSION"
echo ""

# Check npm installation
echo "✓ Checking npm installation..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

NPM_VERSION=$(npm -v)
echo "  npm version: $NPM_VERSION"
echo ""

# Install dependencies
echo "✓ Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo ""

# Create .env.local from .env.example
if [ ! -f .env.local ]; then
    echo "✓ Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "✅ .env.local created"
else
    echo "ℹ  .env.local already exists"
fi
echo ""

# Verify git setup
echo "✓ Checking Git setup..."
if git rev-parse --git-dir > /dev/null 2>&1; then
    echo "✅ Git repository initialized"
else
    echo "ℹ  Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - Facial Beauty Analyzer"
fi
echo ""

# Success message
echo "=========================================="
echo "✅ Setup complete!"
echo "=========================================="
echo ""
echo "🎉 Next steps:"
echo "1. Start development server:"
echo "   npm run dev"
echo ""
echo "2. Open in browser:"
echo "   http://localhost:3000"
echo ""
echo "3. For more information:"
echo "   - README.md - Main documentation"
echo "   - QUICKSTART.md - Quick start guide"
echo "   - SETUP.md - Detailed setup guide"
echo ""
echo "📚 Documentation files:"
echo "   - README.md"
echo "   - QUICKSTART.md"
echo "   - SETUP.md"
echo "   - DEPLOYMENT.md"
echo "   - TROUBLESHOOTING.md"
echo "   - CONTRIBUTING.md"
echo "   - PRIVACY.md"
echo ""
echo "Happy coding! 🚀"
