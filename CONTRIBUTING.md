# Contributing Guide

Thank you for your interest in contributing to the Facial Beauty Analyzer! This guide will help you get started.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Ask questions if you're unsure about something
- Help others and share knowledge

## Getting Started

### Fork the Repository

1. Go to [GitHub repository](https://github.com/yourusername/facial-beauty-analyzer)
2. Click **"Fork"** button (top right)
3. Clone your fork locally:
   ```bash
   git clone https://github.com/yourusername/facial-beauty-analyzer.git
   cd facial-beauty-analyzer
   ```

### Create a Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes:
git checkout -b bugfix/issue-description
```

### Make Your Changes

1. Make changes to relevant files
2. Follow code style guidelines (see below)
3. Write clear commit messages
4. Test your changes locally

### Test Locally

```bash
npm install
npm run dev

# Visit http://localhost:3000
# Test your feature thoroughly
```

## Code Style Guidelines

### JavaScript/React

- **Use functional components** with hooks
- **Prefer const** over let/var
- **Use arrow functions** where appropriate
- **Add comments** for complex logic
- **Keep components small** - max 300 lines
- **Use meaningful variable names**

Example:
```javascript
// ✅ Good
const AnalysisCard = ({ data, onAnalyze }) => {
  const [score, setScore] = useState(0);
  
  // Calculate score with effect
  useEffect(() => {
    const newScore = calculateScore(data);
    setScore(newScore);
  }, [data]);
  
  return <div>{score}</div>;
};

// ❌ Bad
const AC = ({ d, oA }) => {
  let s = 0;
  s = calculateScore(d);
  return <div>{s}</div>;
};
```

### CSS/Tailwind

- **Use Tailwind classes** instead of custom CSS when possible
- **For custom styling**, add to `src/index.css`
- **Follow mobile-first approach**
- **Use responsive prefixes**: `sm:`, `md:`, `lg:`

Example:
```jsx
// ✅ Good
<div className="w-full md:w-2/3 lg:w-1/2 px-4 py-6">
  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Title</h1>
</div>

// ❌ Bad
<div style={{width: '50%', padding: '20px'}}>
  <h1 style={{fontSize: '32px', fontWeight: 'bold'}}>Title</h1>
</div>
```

### File Organization

```
src/
├── components/      # React components
│   ├── UI.jsx      # Reusable UI components
│   ├── Camera.jsx  # Camera component
│   └── ...
├── utils/          # Utility modules
│   ├── faceDetection.js
│   ├── goldenRatio.js
│   └── visualization.js
├── App.jsx         # Main component
└── index.css       # Global styles
```

## Commit Messages

Write clear, descriptive commit messages:

```bash
# Feature
git commit -m "feat: add real-time face mesh visualization"

# Bug fix
git commit -m "fix: resolve camera permission error on Safari"

# Documentation
git commit -m "docs: update deployment guide"

# Refactoring
git commit -m "refactor: optimize landmark detection algorithm"
```

Format: `<type>: <subject>`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Add/update tests
- `chore`: Build/dependency updates

## Pull Request Process

### Before Submitting

1. **Test your changes**
   ```bash
   npm run dev
   # Test in multiple browsers
   ```

2. **Check for console errors**
   - Press F12 → Console tab
   - Ensure no errors are present

3. **Update documentation** if needed
   - README.md for user-facing changes
   - Code comments for complex logic

4. **Lint your code** (if configured)
   ```bash
   npm run lint
   ```

### Submit Pull Request

1. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. Go to GitHub repository
3. Click **"New Pull Request"** button
4. Add title and description:
   ```
   Title: Add facial symmetry overlay visualization
   
   Description:
   - Added horizontal symmetry guide line
   - Shows bilateral balance measurement
   - Includes color coding for symmetry score
   - Tested on Chrome, Firefox, Safari
   
   Fixes #123
   ```

5. Wait for review and CI checks

### PR Review Process

- Maintainer will review your code
- Suggest changes if needed
- Approve when ready
- Merge to main branch

## Types of Contributions

### 1. Bug Reports

Create an issue with:
- Clear title
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser/OS info
- Screenshots if applicable

### 2. Feature Requests

Suggest new features:
- Describe use case
- Explain benefits
- Provide examples
- Consider performance impact

### 3. Documentation

Improve docs by:
- Fixing typos
- Clarifying explanations
- Adding examples
- Updating outdated info

### 4. Code Improvements

- Optimize performance
- Refactor complex code
- Improve accessibility
- Add helpful comments

### 5. Testing

- Test on different browsers
- Test on mobile devices
- Report edge cases
- Create test cases

## Development Tips

### Hot Module Reloading

Changes automatically reload during `npm run dev`:
```bash
npm run dev
# Edit a file → browser updates instantly
```

### Debug Face Mesh

```javascript
// Add to App.jsx to see detected landmarks
if (landmarks) {
  console.log('Detected landmarks:', landmarks);
  console.log('Number of landmarks:', landmarks.length);
}
```

### Performance Testing

```javascript
// Measure detection time
const start = performance.now();
const landmarks = await getLandmarks(videoElement);
const end = performance.now();
console.log(`Detection took ${end - start}ms`);
```

### Browser DevTools

- **Chrome DevTools** (F12)
  - Performance: Record detection performance
  - Console: Check for errors
  - Network: Monitor bandwidth
  - Application: Clear cache

- **Firefox DevTools** (F12)
  - Similar features to Chrome

- **Safari DevTools** (Cmd+Opt+I)
  - Develop → Enable Web Inspector first

## Issues & Bugs

### Reporting Bugs

Use GitHub Issues:

```markdown
**Bug Title**: Face detection stops after 20 seconds

**Description**:
The face detection stops responding after about 20 seconds of analysis.

**Steps to Reproduce**:
1. Open application
2. Click "Start Analysis"
3. Keep face in frame for 20+ seconds
4. Observe: Detection stops, landmarks disappear

**Expected**: Detection should continue indefinitely
**Actual**: Detection stops after ~20 seconds

**Environment**:
- Browser: Chrome 120
- OS: Windows 11
- Webcam: Logitech C920

**Console Errors**:
```
Error: getDisplayMedia requires user permission
```

**Screenshots**:
[Attach if applicable]
```

## Feature Requests

```markdown
**Feature**: Add comparison with celebrity faces

**Description**:
Allow users to compare their facial proportions with famous celebrities to understand ideal ratios better.

**Use Case**:
Educational and motivational - help users understand how their proportions compare to well-known faces.

**Implementation Ideas**:
- Pre-loaded image gallery of celebrities
- Side-by-side comparison overlay
- Historical comparison (then vs. now)
```

## Performance Guidelines

- Keep components under 300 lines
- Use `React.memo()` for expensive renders
- Optimize MediaPipe detection frequency
- Lazy load heavy components

## Accessibility

Follow WCAG 2.1 guidelines:
- Add `alt` text to images
- Use semantic HTML
- Ensure color contrast (4.5:1 for normal text)
- Keyboard navigation support
- ARIA labels where needed

Example:
```jsx
<button 
  className="btn btn-primary"
  aria-label="Start facial analysis"
  onClick={handleStart}
>
  Start Analysis
</button>
```

## Documentation Standards

### Code Comments

```javascript
/**
 * Calculate distance between two facial landmarks
 * @param {Object} p1 - First point with x, y, z coordinates
 * @param {Object} p2 - Second point with x, y, z coordinates
 * @returns {number} Euclidean distance between points
 */
export const distance = (p1, p2) => {
  // Calculate 3D distance
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  const dz = (p1.z || 0) - (p2.z || 0);
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};
```

## Common Contributions

### Add New Proportion Measurement

1. Identify new landmark indices
2. Add to `goldenRatio.js`
3. Create calculation function
4. Add to UI results panel
5. Write documentation

### Improve Face Mesh Visualization

1. Edit `visualization.js`
2. Use Canvas 2D API for drawing
3. Test performance impact
4. Update settings UI

### Enhance UI Components

1. Edit components in `src/components/`
2. Use Tailwind CSS
3. Follow existing patterns
4. Test responsiveness

## Getting Help

- **Questions?** Create a GitHub discussion
- **Stuck?** Comment on related issues
- **Need guidance?** Ask in PR review
- **General help?** Check documentation

## Rewards & Recognition

Contributors are recognized in:
- GitHub contributors list
- README acknowledgments section
- Release notes

## Legal

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing! Your efforts help make this project better for everyone.** 🚀

Happy coding! 💝
