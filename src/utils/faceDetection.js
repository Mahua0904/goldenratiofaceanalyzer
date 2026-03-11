/**
 * Face Detection Module using MediaPipe FaceMesh
 * Handles webcam access and facial landmark detection
 */

let faceMesh;
let camera;
let canvasElement;

/**
 * Initialize MediaPipe FaceMesh
 */
export const initializeFaceMesh = async () => {
  try {
    // Load MediaPipe library
    await loadMediaPipeLibrary();
    
    const vision = window.MediaPipe.tasks.vision;
    
    if (!vision) {
      throw new Error('MediaPipe vision API not available');
    }
    
    const FilesetResolver = vision.FilesetResolver;
    const FaceMesh = vision.FaceMesh;
    
    if (!FilesetResolver || !FaceMesh) {
      throw new Error('FaceMesh not available');
    }
    
    const wasmFilesFromCDN = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.8/wasm'
    );
    
    faceMesh = await FaceMesh.createFromOptions(wasmFilesFromCDN, {
      runningMode: 'VIDEO',
      numFaces: 1,
    });
    
    console.log('FaceMesh initialized successfully');
    return faceMesh;
  } catch (error) {
    console.error('Error initializing FaceMesh:', error);
    throw new Error(`Face detection failed: ${error.message}`);
  }
};

/**
 * Load MediaPipe library from CDN with retry logic
 */
async function loadMediaPipeLibrary() {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (window.MediaPipe && window.MediaPipe.tasks && window.MediaPipe.tasks.vision) {
      console.log('MediaPipe already loaded');
      resolve();
      return;
    }
    
    console.log('Loading MediaPipe from CDN...');
    
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.8/vision_bundle.mjs';
    script.type = 'module';
    script.async = true;
    
    const timeout = setTimeout(() => {
      reject(new Error('MediaPipe library loading timeout'));
    }, 15000); // 15 second timeout
    
    script.onload = () => {
      clearTimeout(timeout);
      // Wait a bit for module to be ready
      setTimeout(() => {
        if (window.MediaPipe) {
          console.log('MediaPipe loaded successfully');
          resolve();
        } else {
          reject(new Error('MediaPipe object not found after loading'));
        }
      }, 1000);
    };
    
    script.onerror = () => {
      clearTimeout(timeout);
      reject(new Error('Failed to load MediaPipe library'));
    };
    
    document.head.appendChild(script);
  });
}

/**
 * Start camera and get video stream
 */
export const startCamera = async () => {
  try {
    // First try with ideal width/height (mobile will use what it can)
    const constraints = {
      video: {
        width: { ideal: 1280, min: 320 },
        height: { ideal: 720, min: 240 },
        facingMode: 'user',
      },
      audio: false,
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    return stream;
  } catch (error) {
    console.error('Error accessing camera:', error);
    
    // Fallback: try with simpler constraints
    try {
      const fallbackStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });
      return fallbackStream;
    } catch (fallbackError) {
      throw new Error('Camera access denied. Please grant camera permissions and try again.');
    }
  }
};

/**
 * Detect faces in video frame
 */
export const detectFaces = async (videoElement) => {
  if (!faceMesh) {
    console.error('FaceMesh not initialized');
    return null;
  }

  try {
    const results = await faceMesh.detectForVideo(videoElement, Date.now());
    return results;
  } catch (error) {
    console.error('Error detecting faces:', error);
    return null;
  }
};

/**
 * Get single detected landmarks (for the first detected face)
 */
export const getLandmarks = async (videoElement) => {
  const results = await detectFaces(videoElement);
  
  if (results && results.faceLandmarks && results.faceLandmarks.length > 0) {
    return results.faceLandmarks[0];
  }
  
  return null;
};

/**
 * Stop camera stream
 */
export const stopCamera = (stream) => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }
};
