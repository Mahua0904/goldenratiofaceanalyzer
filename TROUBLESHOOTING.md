# Troubleshooting Guide

## Common Issues & Solutions

### Installation & Setup

#### Issue: "npm: command not found"
```bash
# Solution: Install Node.js from https://nodejs.org
# Then restart your terminal and try again
npm --version
```

#### Issue: "npm install" fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### Issue: Port 3000 already in use
```bash
# Linux/Mac: Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Windows: Find and kill process
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
npm run dev -- --port 3001
```

---

### Camera Issues

#### Camera Not Working
**Symptoms**: Camera feed shows nothing or error message

**Solutions**:
1. ✅ Check browser permissions
   - Settings → Privacy → Microphone/Camera
   - Ensure permission is granted

2. ✅ Clear browser cache
   - Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
   - Clear all data for the website

3. ✅ Try different browser
   - Chrome, Firefox, Safari, Edge all work differently

4. ✅ Use HTTPS
   - Many browsers require HTTPS for camera access
   - Exception: localhost works with HTTP

5. ✅ Check system permissions
   - **Windows**: Settings → Privacy → Camera → Allow apps
   - **Mac**: System Preferences → Security & Privacy → Camera
   - **Linux**: Usually granted by default

6. ✅ Restart browser
   - Close all tabs and reopen browser

#### Camera Permission Denied
**Symptoms**: "Camera permission denied" message

**Solutions**:
1. Reset camera permissions:
   - **Chrome**: Settings → Privacy → Camera → Reset
   - **Firefox**: about:preferences → Privacy → Permissions
   - **Safari**: Preferences → Security → Camera

2. Check if browser has permission:
   - Reload page and allow permission again
   - Clear site data if needed

3. Test camera elsewhere:
   - Try Google Meet or Zoom to verify camera works
   - If it doesn't work there, it's a system issue

---

### Face Detection Issues

#### Face Not Detected
**Symptoms**: "No face detected" message appears

**Solutions**:
1. ✅ Improve lighting
   - Natural light works best
   - Avoid backlighting
   - Position light in front of face

2. ✅ Position face correctly
   - Face must be straight toward camera
   - Avoid extreme angles (>45 degrees)
   - Keep face centered in frame

3. ✅ Ensure face visibility
   - At least 70% of face should be visible
   - Remove sunglasses or large glasses
   - Don't cover face with hands

4. ✅ Distance from camera
   - Face should take up ~30-50% of frame
   - Not too close (causes distortion)
   - Not too far (loses detail)

5. ✅ Camera quality
   - Webcam should have decent resolution (720p+)
   - Built-in laptop cameras usually work
   - USB cameras are often better

#### Face Detected but No Results
**Symptoms**: Face mesh appears but beauty score doesn't update

**Solutions**:
1. ✅ Wait for processing
   - First detection takes 1-2 seconds
   - Subsequent frames are faster

2. ✅ Check browser console
   - Press F12 → Console tab
   - Look for error messages
   - Share errors in GitHub issues

3. ✅ Ensure stable face position
   - Keep face steady
   - Avoid rapid head movement
   - Stay in good lighting

4. ✅ Try restarting detection
   - Click "Stop Analysis"
   - Click "Start Analysis" again

---

### Performance Issues

#### App Runs Slowly
**Symptoms**: Laggy video, detection stops/stutters

**Solutions**:
1. ✅ Close other applications
   - Reduces system load
   - Frees up CPU/GPU

2. ✅ Restart browser
   - Close all tabs
   - Clear cache (Ctrl+Shift+Delete)
   - Reopen application

3. ✅ Disable overlays
   - Uncheck "Show Measurement Lines"
   - Uncheck "Show Reference Grid"
   - Reduces rendering load

4. ✅ Use modern browser
   - Chrome: Excellent performance
   - Firefox: Good performance
   - Safari: Usually good on Mac
   - Edge: Similar to Chrome

5. ✅ Check system resources
   - Close resource-heavy applications
   - Ensure adequate RAM (minimum 4GB)
   - Update browser to latest version

6. ✅ Use wired internet (if remote)
   - WiFi can be unstable for streaming
   - Wired connection = more stable

#### High CPU Usage
**Symptoms**: CPU at 80-100%, fan spinning

**Solutions**:
1. ✅ This is normal during detection
   - Face detection is computationally intensive
   - MediaPipe processes many landmarks
   - Usually settles to 40-60% during steady state

2. ✅ Reduce detection frequency
   - Lower browser refresh rate if possible
   - Close unnecessary browser tabs

3. ✅ Use lower video resolution
   - Browser may default to high resolution
   - Check camera settings in OS

---

### Browser & Compatibility

#### Works in One Browser But Not Another
**Symptoms**: Works in Chrome but not Firefox, etc.

**Solutions**:
1. ✅ Update browser to latest version
2. ✅ Clear browser cache and cookies
3. ✅ Disable browser extensions (may interfere)
4. ✅ Try incognito/private mode
5. ✅ Check browser compatibility:
   - Chrome 90+: Full support
   - Firefox 88+: Full support
   - Safari 14+: Full support
   - Edge 90+: Full support

#### Mobile Browser Issues
**Symptoms**: App doesn't work on phone/tablet

**Solutions**:
1. ✅ Use modern mobile browser
   - Chrome for Android: Recommended
   - Safari on iOS: iOS 14.5+ required
   - Firefox Mobile: Works well

2. ✅ Grant permissions
   - Tap permission prompt
   - Allow camera access
   - May need to enable in settings

3. ✅ Use in portrait orientation
   - Landscape sometimes doesn't work
   - Rotate phone to portrait

4. ✅ Ensure good lighting
   - Mobile cameras are sensitive
   - Bright, even lighting essential

---

### Analysis & Accuracy

#### Beauty Score Seems Wrong/Low
**Symptoms**: "My score is too low!", results seem inaccurate

**Important**: Beauty is subjective and multifaceted!

**Context**:
- This measures golden ratio proportions only
- Golden ratio is one aspect of beauty
- Many beautiful faces don't match golden ratio perfectly
- Cultural preferences vary worldwide
- Personality, confidence, style matter more than measurements

**If analytical score seems off**:
1. ✅ Verify lighting
   - Poor lighting affects landmark detection accuracy
   - Better lighting = better accuracy

2. ✅ Check face position
   - Face must be straight toward camera
   - Angles reduce accuracy

3. ✅ Ensure good face visibility
   - Hair covering forehead affects detection
   - Glasses can interfere with eye detection

#### Results Keep Changing
**Symptoms**: Score jumps between 45 and 65 constantly

**Normal behavior**:
- Slight head movement changes proportions
- Lighting changes affect detection
- Small pixel changes in camera feed cause variation

**To stabilize**:
- Keep head still
- Maintain consistent lighting
- Move slowly if you need to adjust position

---

### Deployment Issues

#### Deployed App Works Locally But Not Online
**Symptoms**: Works at localhost:3000 but not on netlify/vercel

**Solutions**:
1. ✅ Check HTTPS requirement
   - Camera requires HTTPS (except localhost)
   - Vercel/Netlify provide HTTPS automatically

2. ✅ Verify build was successful
   - Check deployment logs
   - Ensure `npm run build` completed

3. ✅ Clear browser cache
   - Ctrl+Shift+Delete
   - Reload page

4. ✅ Check browser console errors
   - F12 → Console
   - Look for network/loading errors

5. ✅ Verify MediaPipe model CDN
   - Check if models can be downloaded
   - Try different browser

#### Camera Works Locally But Not After Deploy
**Symptoms**: Camera permission works in dev but fails in production

**Solutions**:
1. ✅ Ensure HTTPS is enabled
   - Vercel/Netlify use HTTPS by default

2. ✅ Check media permissions policy
   - Nginx/Apache may need camera permission header
   - Add: `Permissions-Policy: camera=*`

3. ✅ Verify domain is trusted
   - Some browsers have domain-specific permissions
   - Grant camera access when prompted

---

### Build & Compilation

#### "Module not found" Error
**Symptoms**: Build fails with "Cannot find module 'x'"

**Solutions**:
```bash
# Ensure all dependencies are installed
npm install

# Check package.json has all required packages
npm list

# Install missing package
npm install package-name

# Try clearing cache and reinstalling
rm -rf node_modules package-lock.json
npm install
```

#### Vite Build Fails
**Symptoms**: `npm run build` gives errors

**Solutions**:
1. ✅ Check Node version (requires 16+)
   ```bash
   node --version
   ```

2. ✅ Clear build cache
   ```bash
   rm -rf dist .vite
   npm run build
   ```

3. ✅ Check for TypeScript errors (if using TS)
4. ✅ Review error message carefully
5. ✅ Check recent file changes

---

### Advanced Debugging

#### Enable Debug Logging
Add to App.jsx:
```javascript
// Enable logging
console.log('Face Detection initialized');
console.log('Landmarks detected:', landmarks);
console.log('Beauty score:', analysisData.beautyScore);
```

#### Test Face Mesh Directly
```javascript
// In browser console
const vision = await import('@mediapipe/tasks-vision');
console.log('MediaPipe loaded:', vision);
```

#### Monitor Network Requests
1. Open DevTools (F12)
2. Go to Network tab
3. Look for:
   - MediaPipe models loading from CDN
   - No video data being sent

#### Check Performance
1. Open DevTools (F12)
2. Go to Performance tab
3. Record detection process
4. Analyze bottlenecks

---

### Getting Help

#### Community Support
- 🐛 [GitHub Issues](https://github.com/yourusername/facial-beauty-analyzer/issues)
- 💬 [GitHub Discussions](https://github.com/yourusername/facial-beauty-analyzer/discussions)
- 📧 Email: support@facial-beauty-analyzer.com

#### When Reporting Issues
Provide:
1. **Browser** (Chrome, Firefox, Safari, Edge)
2. **OS** (Windows, Mac, Linux)
3. **Error message** (screenshot or copy-paste)
4. **Steps to reproduce**
5. **Device camera info** (if camera issue)
6. **Console errors** (F12 → Console)

---

## Still Need Help?

1. ✅ Search existing issues on GitHub
2. ✅ Read the [README.md](README.md)
3. ✅ Check [SETUP.md](SETUP.md) for installation
4. ✅ Review [DEPLOYMENT.md](DEPLOYMENT.md) if deploying
5. ✅ Create a new GitHub issue with details

**We're here to help!** 🤝

---

**Last Updated:** January 2024
