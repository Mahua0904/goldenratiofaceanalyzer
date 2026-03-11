# Privacy Policy

**Last Updated:** January 2024

## Overview

The Facial Beauty Analyzer ("Application") is designed with privacy and user data protection as a core principle. This Privacy Policy explains how we handle information when you use our application.

## 1. Information Collection & Usage

### Information We Do NOT Collect

- ❌ **No images are uploaded to servers** - All video processing happens locally in your browser
- ❌ **No facial data is stored** - Facial landmarks are calculated and immediately discarded
- ❌ **No personal identification** - We don't ask for or store your name, email, or other personal information
- ❌ **No location data** - We don't access or store your location
- ❌ **No user tracking** - We don't use cookies or tracking pixels for user behavior

### Information We DO Use

#### Browser-Based Processing
- Your webcam stream is processed **only in your browser** using MediaPipe FaceMesh
- Facial landmarks are detected locally and never transmitted to any server
- All calculations (beauty score, proportions) happen entirely on your device
- No permanent storage of any video data

#### Temporary Data
- Facial landmarks are held in memory during the session
- Data is cleared when you close the application or clear your browser cache
- No persistent storage of any kind

## 2. Technical Details

### How Your Webcam Works

1. **Permission Request** - Browser asks for camera access
2. **Local Processing** - Video stream never leaves your device
3. **Real-time Analysis** - Face detection happens locally using JavaScript
4. **No Transmission** - Results are displayed only in your browser
5. **Automatic Cleanup** - Data cleared when session ends

### What Leaves Your Device

Technically nothing related to your face or video:
- Session logs (if enabled)
- Error reports (only if you opt-in)
- Analytics (only basic usage stats, never facial data)

## 3. Third-Party Services

### MediaPipe FaceMesh
- **Purpose**: Face detection and landmark identification
- **Privacy**: Google's privacy policy applies
- **Data Flow**: Models are downloaded from CDN, but no video data is sent to Google
- **Link**: https://www.google.com/policies/privacy/

### Vercel (If Deployed There)
- **Purpose**: Hosting and serving the web application
- **Privacy**: Only standard web server logs
- **Data Flow**: No facial or personal data transmitted
- **Link**: https://vercel.com/legal/privacy-policy

## 4. Security

### Browser Security
- ✅ **HTTPS Only** - All connections are encrypted
- ✅ **No External APIs** - No data sent to third-party servers
- ✅ **Content Security Policy** - Strict CSP headers prevent unauthorized access
- ✅ **No Authentication** - No login or user accounts needed
- ✅ **Open Source** - Code is publicly auditable on GitHub

### Device Security
- ✅ **Local Processing** - All computation on your machine
- ✅ **No Backend Database** - No servers storing your data
- ✅ **No Cookies** - No persistent cookies set by application
- ✅ **Automatic Cleanup** - No leftover files on your device

## 5. Your Rights & Control

### Camera Control
- You can deny camera permission at any time
- Browser shows a clear indicator when camera is active
- You can close the camera from browser settings

### Data Access
- You have complete access to your own facial data while processing
- No data is stored, so there's nothing to request or delete
- Clear your browser cache to remove any temporary data

### Withdrawal of Consent
- Stop using the application anytime
- Revoke camera permissions in your browser settings
- No stored data means no action needed for deletion

## 6. Children's Privacy

This application doesn't knowingly collect information from children under 13. If a parent/guardian becomes aware of unauthorized use by a minor, they should contact us immediately.

**We recommend parental supervision** for minors using this application due to webcam access.

## 7. Changes to This Policy

We may update this Privacy Policy occasionally. Changes will be posted on this page with an updated "Last Updated" date. Your continued use of the application indicates acceptance of any changes.

## 8. Contact Information

For privacy concerns or questions:
- 📧 **Email**: privacy@facial-beauty-analyzer.com (when available)
- 🐛 **GitHub Issues**: Create a privacy-related issue on our GitHub repository
- 💬 **Discussion**: Start a discussion on GitHub Discussions

## 9. Additional Information

### What Happens to the Analysis Results?

- **No Automatic Saving** - Results disappear when you close the browser
- **No Screenshots** - We don't capture images automatically
- **No Sharing** - Share button (if implemented) is user-triggered only
- **User Controlled** - You decide what to do with your results

### Data Retention

- **Session Data**: Cleared when browser closes
- **Browser Cache**: Can be manually cleared anytime
- **No Archives**: No backups of user data
- **No Sync**: Data never synced across devices

### Compliance

This application complies with:
- GDPR (General Data Protection Regulation)
- CCPA (California Consumer Privacy Act)
- HIPAA (No health data collected)
- COPPA (Children's Online Privacy Protection Act)

---

## Quick Answers

**Q: Where is my video data stored?**
A: Nowhere. It never leaves your device.

**Q: Can you see my face?**
A: No. We have no access to your camera or any video stream.

**Q: Is this application secure?**
A: Yes. All processing is local, connections are encrypted (HTTPS), and code is open source.

**Q: What if I use this on mobile?**
A: Same privacy protection. Processing is still local only.

**Q: Can I use this offline?**
A: Once loaded, the application can work offline. Model loading requires initial internet connection.

**Q: What if I'm in the EU under GDPR?**
A: Your data is your own. Nothing is collected or stored, so GDPR fully applies to your benefit.

---

**For support or questions, visit our GitHub or contact us at the email above.**

**Made with ❤️ for your privacy**
