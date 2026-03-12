/**
 * Face Detection Module using MediaPipe FaceLandmarker
 * Handles webcam access and facial landmark detection
 */

let faceLandmarker;
let camera;
let canvasElement;

/**
 * Initialize MediaPipe FaceLandmarker
 */
export const initializeFaceMesh = async () => {
  try {
    // Import from the MediaPipe vision module
    const vision = await import('@mediapipe/tasks-vision');
    
    const FilesetResolver = vision.FilesetResolver;
    const FaceLandmarker = vision.FaceLandmarker;
    
    if (!FilesetResolver) {
      throw new Error('FilesetResolver not found');
    }
    
    if (!FaceLandmarker) {
      throw new Error('FaceLandmarker not found');
    }
    
    const wasmFilesFromCDN = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm'
    );
    
    faceLandmarker = await FaceLandmarker.createFromOptions(wasmFilesFromCDN, {
      baseOptions: {
        modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
        delegate: 'GPU'
      },
      runningMode: 'VIDEO',
      numFaces: 1,
      outputFaceExpressions: false,
      outputHeadRotation: true
    });
    
    console.log('FaceLandmarker initialized successfully');
    return faceLandmarker;
  } catch (error) {
    console.error('Error initializing FaceLandmarker:', error);
    throw error;
  }
};

/**
 * Start camera and get video stream
 */
export const startCamera = async () => {
  try {
    // Try with standard constraints first (works better on mobile)
    const constraints = {
      video: {
        facingMode: 'user',
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
      audio: false,
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    return stream;
  } catch (error) {
    console.error('Error with standard constraints:', error);
    
    // Fallback 1: Try with minimal constraints
    try {
      const fallbackStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });
      console.log('Using fallback constraints');
      return fallbackStream;
    } catch (fallbackError) {
      // Fallback 2: Try environment camera (some mobile devices need this)
      try {
        const envStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'user' } },
          audio: false,
        });
        console.log('Using environment camera');
        return envStream;
      } catch (envError) {
        throw new Error('Camera access denied. Please grant camera permissions in settings and try again.');
      }
    }
  }
};

/**
 * Detect faces in video frame
 */
export const detectFaces = async (videoElement) => {
  if (!faceLandmarker) {
    console.error('FaceLandmarker not initialized');
    return null;
  }

  try {
    const results = await faceLandmarker.detectForVideo(videoElement, Date.now());
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
