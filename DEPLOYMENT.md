# Deployment Guide

Complete guide for deploying the Facial Beauty Analyzer to production.

## Table of Contents
1. [Vercel Deployment (Recommended)](#vercel-deployment)
2. [Netlify Deployment](#netlify-deployment)
3. [GitHub Pages](#github-pages)
4. [Self-Hosted (VPS/Server)](#self-hosted)
5. [Docker Deployment](#docker-deployment)
6. [Environment Configuration](#environment-configuration)
7. [Post-Deployment Checklist](#post-deployment-checklist)

---

## Vercel Deployment (Recommended)

Vercel is the official deployment platform for Next.js and works great with Vite projects.

### Prerequisites
- GitHub account
- Vercel account (free tier available)
- Project pushed to GitHub repository

### Step 1: Push Project to GitHub

```bash
# Initialize Git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - Facial Beauty Analyzer"

# Add remote repository
git remote add origin https://github.com/yourusername/facial-beauty-analyzer.git

# Create main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [Vercel.com](https://vercel.com)
2. Sign up or log in with GitHub
3. Click **"Import Project"** or **"New Project"**
4. Select your `facial-beauty-analyzer` repository
5. **Project Setup** page will appear:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click **"Deploy"**

Wait for deployment to complete (typically 1-2 minutes).

### Step 3: Custom Domain (Optional)

In Vercel dashboard:
1. Go to your project
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Follow DNS configuration instructions
5. Verify domain setup

### Automatic Deployments

Every push to GitHub automatically triggers a new deployment:
```bash
# Make changes
git add .
git commit -m "Add new feature"
git push origin main

# Vercel automatically builds and deploys!
```

### Access Your Deployed App

```
https://your-project-name.vercel.app
```

Or with custom domain:
```
https://yourdomain.com
```

---

## Netlify Deployment

### Step 1: Build Production Files

```bash
npm run build
```

This creates `dist/` folder with optimized files.

### Step 2: Deploy via Netlify

#### Option A: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

#### Option B: Using Netlify UI

1. Go to [Netlify.com](https://netlify.com)
2. Sign up or log in
3. Click **"New site from Git"**
4. Connect your GitHub repository
5. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click **"Deploy site"**

### Continuous Deployment

Once connected, Netlify automatically deploys on every GitHub push:

```bash
git add .
git commit -m "Update features"
git push origin main
# Netlify deploys automatically!
```

---

## GitHub Pages

### Step 1: Update vite.config.js

```javascript
export default defineConfig({
  base: '/facial-beauty-analyzer/', // Repository name
  plugins: [react()],
  // ... rest of config
});
```

### Step 2: Build Project

```bash
npm run build
```

### Step 3: Deploy

#### Option A: Using GitHub CLI

```bash
# Install GitHub CLI (if not already installed)
# Visit: https://cli.github.com/

# Deploy to GitHub Pages
gh release create v1.0.0 dist/
```

#### Option B: Manual Upload

1. Go to your GitHub repository
2. Go to **"Settings"** → **"Pages"**
3. Set **"Build and deployment"** to:
   - **Source**: Deploy from a branch
   - **Branch**: gh-pages
4. Run locally to generate `dist/`:
   ```bash
   npm run build
   ```
5. Create `gh-pages` branch and push `dist/` folder

#### Option C: Using GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Access Your GitHub Pages Site

```
https://yourusername.github.io/facial-beauty-analyzer/
```

---

## Self-Hosted (VPS/Server)

### Prerequisites
- VPS/Server with Node.js installed
- Domain name (optional)
- SSH access to server

### Step 1: Connect to Server

```bash
ssh user@your-server-ip
```

### Step 2: Clone Repository

```bash
cd /home/user
git clone https://github.com/yourusername/facial-beauty-analyzer.git
cd facial-beauty-analyzer
```

### Step 3: Install Dependencies

```bash
curl -fsSL https://nodejs.org/dist/v18.0.0/node-v18.0.0-linux-x64.tar.xz | tar xJ
export PATH="$PWD/node-v18.0.0-linux-x64/bin:$PATH"

npm install
npm run build
```

### Step 4: Serve with Nginx

```bash
sudo apt-get update
sudo apt-get install nginx
```

Create `/etc/nginx/sites-available/facial-beauty`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    root /home/user/facial-beauty-analyzer/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css text/javascript 
               application/javascript application/json;
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/facial-beauty /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 5: Enable HTTPS (SSL/TLS)

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## Docker Deployment

### Dockerfile

Create `Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

### .dockerignore

Create `.dockerignore`:

```
node_modules
dist
.git
.env
.env.local
```

### Build and Run

```bash
# Build Docker image
docker build -t facial-beauty-analyzer .

# Run container
docker run -p 3000:3000 facial-beauty-analyzer

# Access at http://localhost:3000
```

### Deploy on Docker Hub

```bash
# Login to Docker Hub
docker login

# Tag image
docker tag facial-beauty-analyzer yourusername/facial-beauty-analyzer:latest

# Push to DockerHub
docker push yourusername/facial-beauty-analyzer:latest
```

---

## Environment Configuration

### Production Environment Variables

Create `.env.production`:

```bash
VITE_PRODUCTION_URL=https://yourdomain.com
VITE_API_BASE_URL=https://api.yourdomain.com
NODE_ENV=production
```

### Security Headers (Nginx)

Add to nginx config:

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self';" always;
```

### CORS Configuration

If needed, configure CORS:

```nginx
add_header 'Access-Control-Allow-Origin' '*' always;
add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
if ($request_method = 'OPTIONS') {
    return 204;
}
```

---

## Post-Deployment Checklist

### Performance & Optimization

- [ ] Test on mobile devices (iOS & Android)
- [ ] Check WebPageTest.org for performance
- [ ] Verify images are optimized
- [ ] Check bundle size with `npm run build`
- [ ] Enable gzip compression on server

### Security

- [ ] Enable HTTPS/SSL certificate
- [ ] Set security headers (CSP, X-Frame-Options, etc.)
- [ ] Review CORS settings
- [ ] Check for hardcoded secrets or API keys
- [ ] Enable HSTS (Strict-Transport-Security)

### Testing

- [ ] Test camera functionality
- [ ] Test face detection on multiple lighting conditions
- [ ] Test on different browsers
- [ ] Test responsive design on all screen sizes
- [ ] Check console for any JavaScript errors

### Monitoring

- [ ] Set up error tracking (e.g., Sentry)
- [ ] Enable analytics (if desired)
- [ ] Monitor server uptime
- [ ] Set up log aggregation

### Content

- [ ] Update README with live deployment URL
- [ ] Add privacy policy page
- [ ] Add terms of service page
- [ ] Update contact/support information

### DNS & Domain

- [ ] Point domain to server/CDN
- [ ] Verify DNS propagation
- [ ] Test domain accessibility
- [ ] Set up redirect from www to non-www (or vice versa)

---

## Deployment Comparison

| Platform | Cost | Ease | Scalability | Build Time |
|----------|------|------|-------------|-----------|
| **Vercel** | Free+ | Very Easy | Excellent | 1-2 min |
| **Netlify** | Free+ | Very Easy | Excellent | 2-3 min |
| **GitHub Pages** | Free | Easy | Good | 3-5 min |
| **Self-Hosted** | $5+/mo | Hard | Unlimited | Instant |
| **Docker** | $5+/mo | Medium | Excellent | 5-10 min |

---

## Troubleshooting Deployments

### Build Fails on Deployment

```bash
# Clear build cache locally
rm -rf .next dist node_modules
npm install
npm run build
```

### Camera Not Working After Deploy

- ✅ Ensure HTTPS is enabled (required for WebRTC)
- ✅ Check browser camera permissions
- ✅ Verify no CSP violations in console

### Performance Issues

- ✅ Enable gzip compression
- ✅ Use CDN for static assets
- ✅ Optimize images
- ✅ Enable code splitting

### Face Detection Not Working

- ✅ Check MediaPipe models load from CDN
- ✅ Verify network requests in DevTools
- ✅ Check browser console for errors

---

## Rollback Deployment

### Vercel

In Vercel dashboard:
1. Select your project
2. Go to **Deployments**
3. Find previous deployment
4. Click **...** → **Promote to Production**

### Netlify

1. Go to **Deploys**
2. Find previous deployment
3. Click **Publish deploy**

### Manual Rollback

```bash
# Revert last commit
git revert HEAD
git push origin main

# Deployment automatically triggers
```

---

## Support & Monitoring

- 📊 **Analytics**: Google Analytics, Mixpanel
- 📈 **Performance**: Datadog, New Relic
- 🐛 **Error Tracking**: Sentry, Rollbar
- 📱 **Uptime Monitoring**: Pingdom, UptimeRobot

---

**Congratulations on deploying your Face Beauty Analyzer! 🚀**

For issues or questions, create an issue on GitHub or contact support.
