# Facial Beauty Analyzer 💎

A modern web application that analyzes facial beauty and proportions using the Golden Ratio (φ ≈ 1.618) through live webcam analysis, powered by MediaPipe FaceMesh and React.

![React](https://img.shields.io/badge/React-18.2-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-blue?logo=tailwindcss)
![MediaPipe](https://img.shields.io/badge/MediaPipe-FaceMesh-green)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### Core Analysis Features
- **Real-time Face Detection** - 468 facial landmarks detected per frame using MediaPipe FaceMesh
- **Golden Ratio Analysis** - Compares facial proportions to the mathematical constant φ (1.618)
- **Beauty Score Calculation** - 0-100 score based on how closely proportions match the golden ratio
- **Facial Symmetry Detection** - Measures bilateral balance of facial features
- **Live Visualization** - Overlay facial mesh, measurement lines, and symmetry guides on camera feed

### Measurement Metrics
- Face Length vs. Width Ratio
- Eye Distance vs. Face Width Ratio
- Nose Length vs. Mouth Distance Ratio
- Mouth Width vs. Nose Width Ratio
- Facial Symmetry Percentage

### UI/UX Features
- **Modern, Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Animated Progress Bars** - Real-time visualization of proportion scores
- **Detailed Results Panel** - Comprehensive breakdown of all measurements
- **Dark Theme with Gradients** - Modern glassmorphism UI elements
- **Privacy-First** - No images uploaded or stored remotely

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16+ and npm/yarn
- **Modern browser** (Chrome, Firefox, Safari, Edge)
- **Webcam access** permission

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/facial-beauty-analyzer.git
   cd facial-beauty-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📖 How to Use

1. **Allow Camera Access** - Grant browser permission to access your webcam
2. **Position Yourself** - Face the camera directly with good lighting
3. **Click "Start Analysis"** - Begin real-time facial analysis
4. **View Results** - Check the analysis panel on the right for your beauty scores
5. **Toggle Visualizations** - Enable/disable measurement lines and reference grids
6. **Stop Analysis** - Click "Stop Analysis" to end detection

## 🎯 Understanding Your Results

### Beauty Score (0-100)
- **85-100**: Exceptional - Very close to ideal golden ratio proportions
- **70-84**: Excellent - Good alignment with golden ratio
- **55-69**: Good - Moderate alignment with golden ratio
- **40-54**: Fair - Some variance from ideal proportions
- **Below 40**: Developing - Significant variance from ideal ratios

### Key Proportions Explained

| Metric | Ideal Value | Meaning |
|--------|-------------|---------|
| Face Length/Width | 1.618 (φ) | Face should be ~1.6x longer than wide |
| Eye Distance/Width | 0.460 | Eyes should be ~46% of face width apart |
| Nose/Mouth Length | 1.618 (φ) | Nose length should be φ times mouth distance |
| Mouth/Nose Width | 1.618 (φ) | Mouth should be φ times nose width |
| Facial Symmetry | 100% | Perfect bilateral mirror symmetry |

## 🏗️ Project Structure

```
facial-beauty-analyzer/
├── src/
│   ├── components/
│   │   ├── Camera.jsx           # Video feed and canvas
│   │   ├── ResultsPanel.jsx     # Analysis results display
│   │   └── UI.jsx              # Reusable UI components
│   ├── utils/
│   │   ├── faceDetection.js     # MediaPipe FaceMesh wrapper
│   │   ├── goldenRatio.js       # Ratio calculations and scoring
│   │   └── visualization.js     # Canvas drawing utilities
│   ├── App.jsx                  # Main application component
│   ├── main.jsx                 # React entry point
│   └── index.css                # Tailwind CSS and custom styles
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── vercel.json                 # Vercel deployment config
└── README.md                    # This file
```

## 🛠️ Available Scripts

### Development
```bash
npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint (if configured)
```

## 💻 Technology Stack

- **Frontend Framework**: React 18.2
- **Build Tool**: Vite 5.0
- **Styling**: Tailwind CSS 3.4
- **Face Detection**: MediaPipe FaceMesh 0.10
- **Mathematical Analysis**: Native JavaScript
- **Browser APIs**: WebRTC, Canvas API, RequestAnimationFrame

## 📊 How Golden Ratio Works

The golden ratio (φ ≈ 1.618) appears throughout nature and has been associated with aesthetic beauty for centuries:

```
φ = (1 + √5) / 2 ≈ 1.618033988...
```

### In Facial Beauty
- Face length should be ~1.618x the face width
- Eyes should be optimally spaced
- Nose and mouth proportions should align with φ
- Symmetry enhances perceived beauty

This application measures these proportions in real-time and compares them to the ideal golden ratio.

## 🚢 Deployment

### Deploy on Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import on Vercel**
   - Go to [Vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Vite/React setup
   - Click "Deploy"

3. **Access Your App**
   ```
   https://your-project-name.vercel.app
   ```

### Environment Configuration
Vercel automatically detects the build setup from `package.json` and `vite.config.js`. No additional configuration needed for most setups.

### Deploy on Other Platforms

#### Netlify
```bash
npm run build
# Connect to Netlify: https://app.netlify.com/
```

#### GitHub Pages
```bash
npm run build
# Upload 'dist' folder to GitHub Pages
```

## 🔒 Privacy & Security

- ✅ **No Image Upload** - All processing happens locally in your browser
- ✅ **No Remote Storage** - Images are never sent to servers
- ✅ **No Tracking** - No analytics or user tracking (optional with configuration)
- ✅ **HTTPS Required** - Webcam requires secure context
- ✅ **Browser Native** - Uses browser's native WebRTC APIs

## 📱 Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| Mobile Chrome | Latest | ✅ Full |
| Mobile Safari | Latest | ✅ Full |

**Note**: Camera access requires HTTPS (except localhost)

## ⚙️ Configuration

### Vite Configuration
Edit `vite.config.js` to customize build settings:
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
});
```

### Tailwind CSS
Customize theme in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: { /* custom colors */ },
    animation: { /* custom animations */ },
  },
}
```

## 🤝 Contributing

Contributions are welcome! Here's how to contribute:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow React best practices
- Use functional components with hooks
- Keep components modular and reusable
- Add comments for complex logic
- Test on multiple browsers

## 📚 Learning Resources

- [MediaPipe FaceMesh](https://google.github.io/mediapipe/solutions/face_mesh)
- [Golden Ratio in Design](https://www.interaction-design.org/literature/topics/golden-ratio)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev)

## 🐛 Troubleshooting

### Camera Not Working
- Check browser permissions for camera access
- Try a different browser
- Ensure HTTPS is used (except localhost)
- Restart the browser

### Face Not Detected
- Improve lighting conditions
- Position face directly facing camera
- Remove glasses or extreme angles
- Ensure at least 70% of face is visible

### Poor Performance
- Close other heavy applications
- Use a more powerful device
- Disable visualization overlays
- Try reducing browser window size

### Module Not Found Errors
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then reinstall
- Check Node.js version (requires 16+)

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- **MediaPipe** - Google's powerful pose and hand tracking solutions
- **React Team** - Amazing JavaScript library
- **Tailwind CSS** - Utility-first CSS framework
- **Golden Ratio** - Mathematical beauty in nature

## 📞 Support

For issues, questions, or suggestions:
- 📧 Email: [your-email@example.com]
- 🐛 GitHub Issues: [Create an issue](https://github.com/yourusername/facial-beauty-analyzer/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/facial-beauty-analyzer/discussions)

## 🎓 Educational Resources

### Understanding Golden Ratio
The golden ratio appears in:
- **Nature**: Seashells, flower petals, spiral galaxies
- **Art**: Renaissance paintings, classical architecture
- **Human Beauty**: Facial proportions, body measurements
- **Mathematics**: Fibonacci sequences, fractals

### Key Concepts
- **φ (Phi)** ≈ 1.618 - The golden ratio constant
- **Fibonacci Sequence** - 1, 1, 2, 3, 5, 8, 13... (ratios approach φ)
- **Beauty Scoring** - Weighted average of multiple proportion measurements
- **Symmetry** - Indicator of health and genetic fitness

---

**Made with ❤️ for beauty and mathematics**

