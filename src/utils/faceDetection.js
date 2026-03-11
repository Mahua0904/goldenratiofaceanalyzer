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
    
    const FilesetResolver = vision.FilesetResolver;
    const FaceMesh = vision.FaceMesh;
    
    const wasmFilesFromCDN = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm'
    );
    
    faceMesh = await FaceMesh.createFromOptions(wasmFilesFromCDN, {
      runningMode: 'VIDEO',
      numFaces: 1,
    });
    
    return faceMesh;
  } catch (error) {
    console.error('Error initializing FaceMesh:', error);
    throw error;
  }
};

/**
 * Start camera and get video stream
 */
export const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: 'user',
      },
      audio: false,
    });
    return stream;
  } catch (error) {
    console.error('Error accessing camera:', error);
    throw new Error('Camera access denied or unavailable');
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
