# Quick Start Guide

Get up and running with the Facial Beauty Analyzer in 5 minutes!

## Installation (2 minutes)

### 1. Clone the project
```bash
git clone https://github.com/yourusername/facial-beauty-analyzer.git
cd facial-beauty-analyzer
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the dev server
```bash
npm run dev
```

### 4. Open in browser
```
http://localhost:3000
```

---

## Using the Application

### Allow Camera
Click **"Grant Camera Permission"** when prompted by your browser.

### Start Analysis
Click **"🎥 Start Analysis"** button to begin facial detection.

### View Results
- **Beauty Score**: 0-100 rating based on golden ratio proportions
- **Proportions**: Detailed measurements of facial features
- **Symmetry**: Bilateral balance score
- **Visualization**: See facial landmarks and measurement lines on your face

### Stop Analysis
Click **"⏹ Stop Analysis"** to end detection and stop camera usage.

---

## Key Features

| Feature | What it Does |
|---------|-------------|
| 🎥 **Camera Feed** | Live video from your webcam with overlays |
| 📊 **Beauty Score** | 0-100 score based on golden ratio |
| 📐 **Proportions** | Breakdown of facial measurements |
| 🔄 **Symmetry** | How balanced your face is left-to-right |
| ✨ **Visualization** | Facial mesh overlay and measurement lines |

---

## Understanding Golden Ratio (φ)

The **golden ratio** is 1.618 - a special mathematical number found:
- In nature (seashells, trees, galaxies)
- In art (Renaissance paintings, architecture)
- In beautiful faces (according to studies)

The app scores how close your facial proportions are to this "perfect" ratio.

---

## Results Interpretation

### Beauty Score
- **85-100**: Exceptional proportions
- **70-84**: Excellent proportions  
- **55-69**: Good proportions
- **40-54**: Fair proportions
- **Below 40**: Still developing

### What It Means
⚠️ **Remember**: Beauty is subjective! This only measures mathematical harmony, not aesthetic value. All faces are beautiful!

---

## Settings & Options

### Show Measurement Lines
Toggle to display golden ratio measurement lines on your face.

### Show Reference Grid
Toggle to display reference grid for alignment.

---

## Troubleshooting

### Camera Not Working?
1. Check browser camera permissions
2. Refresh the page (Ctrl+R / Cmd+R)
3. Try a different browser
4. Ensure good lighting

### Face Not Detected?
1. Position face directly toward camera
2. Improve lighting
3. Remove sunglasses/glasses if possible
4. Ensure 70%+ of face is visible

### Not Getting Results?
1. Give the app a moment to process
2. Check browser console (F12)
3. Ensure camera stream is active (green indicator)
4. Refresh page and try again

---

## Privacy

✅ **100% Private** - No images uploaded
✅ **Local Only** - All processing on your device
✅ **No Storage** - Results not saved anywhere
✅ **Open Source** - Code is publicly auditable

[Read full Privacy Policy](PRIVACY.md)

---

## Next Steps

- 📖 Read the [README.md](README.md) for detailed documentation
- 🚀 Deploy using [Deployment Guide](DEPLOYMENT.md)
- 🤝 Contribute using [Contributing Guide](CONTRIBUTING.md)
- ⚙️ Setup details in [Setup Guide](SETUP.md)

---

## Commands

```bash
npm run dev       # Start development server
npm run build     # Create production build
npm run preview   # Test production build locally
npm run lint      # Check code quality (if configured)
```

---

## Common Questions

**Q: Is my camera data safe?**
A: Absolutely! Everything runs locally. Your webcam never connects to any server.

**Q: Do I need an account?**
A: No account needed! Just open and use.

**Q: Can I use this offline?**
A: After initial load, mostly yes (models need to download once).

**Q: What's the golden ratio?**
A: A mathematical proportion (1.618) found throughout nature associated with beauty.

**Q: Why isn't my score higher?**
A: Golden ratio is just one measure of beauty. Real beauty is much more complex and personal!

---

## Support

- 🐛 Found a bug? [Report it on GitHub](https://github.com/yourusername/facial-beauty-analyzer/issues)
- 💬 Have questions? [Start a discussion](https://github.com/yourusername/facial-beauty-analyzer/discussions)
- 📧 Contact us at: support@facial-beauty-analyzer.com

---

**Happy analyzing! 🎉**

For more detailed information, see [README.md](README.md)
