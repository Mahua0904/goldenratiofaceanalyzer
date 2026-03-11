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
    const vision = await import('@mediapipe/tasks-vision');
    
    if (!vision.FilesetResolver) {
      throw new Error('FilesetResolver not available in vision module');
    }
    
    const FilesetResolver = vision.FilesetResolver;
    const FaceMesh = vision.FaceMesh;
    
    if (!FaceMesh) {
      throw new Error('FaceMesh not available in vision module');
    }
    
    const wasmFilesFromCDN = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
    );
    
    if (!wasmFilesFromCDN) {
      throw new Error('Failed to load WASM files from CDN');
    }
    
    faceMesh = await FaceMesh.createFromOptions(wasmFilesFromCDN, {
      runningMode: 'VIDEO',
      numFaces: 1,
    });
    
    return faceMesh;
  } catch (error) {
    console.error('Error initializing FaceMesh:', error);
    throw new Error(`Face detection initialization failed: ${error.message}`);
  }
};

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
