# Setup & Installation Guide

## System Requirements

### Minimum Requirements
- **OS**: Windows 10+, macOS 10.14+, or Linux
- **Node.js**: 16.0 or higher
- **npm**: 7.0 or higher (or yarn 1.22+)
- **RAM**: 4GB
- **Disk Space**: 500MB for dependencies

### Recommended Requirements
- **Node.js**: 18+ (LTS)
- **RAM**: 8GB+
- **Modern Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Webcam**: 720p or higher resolution

## Installation Steps

### 1. Check Prerequisites

```bash
# Check Node.js version
node --version    # Should be v16.0.0 or higher

# Check npm version
npm --version     # Should be 7.0.0 or higher
```

If you don't have Node.js installed, download from [nodejs.org](https://nodejs.org)

### 2. Clone Repository

```bash
# Using Git
git clone https://github.com/yourusername/facial-beauty-analyzer.git
cd facial-beauty-analyzer

# Or download as ZIP and extract
# Then navigate to the folder
cd facial-beauty-analyzer
```

### 3. Install Dependencies

```bash
# Using npm (recommended)
npm install

# Or using yarn
yarn install

# Or using pnpm
pnpm install
```

**What gets installed:**
- React 18.2
- Vite 5.0
- Tailwind CSS 3.4
- MediaPipe Tasks Vision 0.10
- Other development dependencies

Installation may take 2-5 minutes depending on connection speed.

### 4. Verify Installation

```bash
# Check if all packages are installed
npm list

# Look for key packages:
# - react@18.2.0
# - @mediapipe/tasks-vision@^0.10.0
# - tailwindcss@^3.4.0
```

## Development Server

### Start Development Server

```bash
npm run dev
```

You'll see output like:
```
➜  Local:   http://localhost:3000/
➜  press h to show help
```

### Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

### Hot Module Reloading
The development server supports hot module reloading - changes to files are automatically reflected in the browser without full page reload.

## Project Structure Setup

After installation, your project structure should look like:

```
facial-beauty-analyzer/
├── node_modules/          # All dependencies (auto-created)
├── src/
│   ├── components/        # React components
│   ├── utils/            # Utility modules
│   ├── App.jsx           # Main component
│   ├── main.jsx          # Entry point
│   └── index.css         # Styles
├── dist/                 # Build output (created after build)
├── public/               # Static assets
├── index.html            # HTML template
├── package.json          # Dependencies & scripts
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
└── README.md             # Documentation
```

## Building for Production

### Build the Project

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

This serves the production build locally for testing before deployment.

## Environment Setup

### Creating .env File (Optional)

```bash
# Create a .env file in project root
touch .env

# Add environment variables (if needed for production)
VITE_PRODUCTION_URL=https://your-app-domain.com
```

## Troubleshooting Installation

### Issue: "Command not found: npm"

**Solution:**
```bash
# Install Node.js from https://nodejs.org
# Restart your terminal/computer
# Verify installation
npm --version
```

### Issue: "node_modules not found"

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Use a different port
npm run dev -- --port 3001

# Or kill the process using port 3000
# On Linux/Mac:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue: "Camera permission denied"

**Solution:**
- Check browser camera permissions settings
- Ensure HTTPS is used (except localhost)
- Try a different browser
- Restart the browser

### Issue: "MediaPipe model download failed"

**Solution:**
```bash
# Clear browser cache
# Or hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
# Check internet connection
# Try downloading model from CDN again
```

## Development Workflow

### 1. Make Changes
Edit files in the `src/` directory

### 2. Test Locally
Changes automatically reload in the browser (HMR enabled)

### 3. Test in Different Browsers
- Chrome/Chromium
- Firefox
- Safari
- Edge

### 4. Check Browser Console
Press F12 to open developer tools and check for errors

### 5. Commit Changes
```bash
git add .
git commit -m "Describe your changes"
git push origin main
```

## Common Development Tasks

### Add a New Component

1. Create file in `src/components/MyComponent.jsx`
2. Export component from file
3. Import and use in parent component

### Add Styling

- Use Tailwind CSS classes (recommended)
- Or add custom CSS in `src/index.css`

### Add Dependencies

```bash
npm install package-name
```

Update `package.json` will be automatic.

### Remove Dependencies

```bash
npm uninstall package-name
```

## Performance Tips

1. **Use Chrome DevTools**
   - Press F12 → Performance tab
   - Record and analyze performance

2. **Optimize Components**
   - Use React.memo() for expensive components
   - Implement useMemo and useCallback when needed

3. **Code Splitting**
   - Lazy load components with React.lazy()
   - Vite automatically code-splits on build

4. **Bundle Analysis**
   ```bash
   npm install --save-dev @rollup/plugin-visualizer
   # Check bundle sizes
   ```

## Security Considerations

1. **HTTPS Only**
   - Camera API requires HTTPS (except localhost)
   - Always deploy with SSL certificate

2. **Content Security Policy**
   - Configure CSP headers on your server
   - Restrict external resources

3. **Dependencies**
   ```bash
   # Audit dependencies for vulnerabilities
   npm audit
   
   # Fix vulnerabilities
   npm audit fix
   ```

## IDE Setup Recommendations

### VSCode Extensions
- **ES7+ React/Redux/React-Native snippets** - dsznajder.es7-react-js-snippets
- **Tailwind CSS IntelliSense** - bradlc.vscode-tailwindcss
- **Prettier** - esbenp.prettier-vscode
- **ESLint** - dbaeumer.vscode-eslint

### Prettier Configuration (.prettierrc)
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

### ESLint Configuration (.eslintrc)
```json
{
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  }
}
```

## Next Steps

1. ✅ Installation complete
2. → Review [README.md](README.md) for feature overview
3. → Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment guide
4. → Start the development server: `npm run dev`
5. → Open http://localhost:3000

## Getting Help

- 📖 Read the [README.md](README.md)
- 🐛 Check [GitHub Issues](https://github.com/yourusername/facial-beauty-analyzer/issues)
- 💬 Start a discussion on GitHub
- 📧 Read error messages carefully - they often hint at solutions

---

**Happy developing! 🚀**
