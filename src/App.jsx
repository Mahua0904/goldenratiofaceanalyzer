import React, { useState, useEffect, useRef } from 'react';
import Camera from './components/Camera';
import ResultsPanel from './components/ResultsPanel';
import { Spinner, Alert } from './components/UI';
import { initializeFaceMesh, startCamera, getLandmarks, stopCamera } from './utils/faceDetection';
import { calculateFacialProportions } from './utils/goldenRatio';
import { drawLandmarks as vizDrawLandmarks, drawMeasurementLines as vizDrawMeasurementLines, drawSymmetryGuide as vizDrawSymmetryGuide, clearCanvas as vizClearCanvas } from './utils/visualization';

/**
 * Main App Component
 * Orchestrates face detection, analysis, and UI rendering
 */
const App = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [isInitializing, setIsInitializing] = useState(true);
  const [isDetecting, setIsDetecting] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState(null);
  const [faceMesh, setFaceMesh] = useState(null);
  const [stream, setStream] = useState(null);
  const [showMeasurements, setShowMeasurements] = useState(true);
  const [showGrid, setShowGrid] = useState(false);

  // Initialize MediaPipe FaceMesh on component mount
  useEffect(() => {
    const init = async () => {
      try {
        setIsInitializing(true);
        setError(null);
        
        // Initialize face detection
        const mesh = await initializeFaceMesh();
        setFaceMesh(mesh);
        
        // Request camera access but don't start stream yet
        setIsInitializing(false);
      } catch (err) {
        setError({
          title: 'Initialization Error',
          message: err.message || 'Failed to initialize face detection. Please refresh and try again.',
          type: 'error',
        });
        setIsInitializing(false);
      }
    };

    init();

    return () => {
      if (stream) {
        stopCamera(stream);
      }
    };
  }, []);

  // Start camera when user clicks start button
  const handleStartDetection = async () => {
    try {
      setError(null);
      const mediaStream = await startCamera();
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        // Wait for video to be ready
        await new Promise((resolve) => {
          videoRef.current.onloadedmetadata = resolve;
        });
      }
      
      setIsDetecting(true);
    } catch (err) {
      setError({
        title: 'Camera Error',
        message: err.message || 'Could not access camera. Please check permissions.',
        type: 'error',
      });
    }
  };

  // Stop camera and detection
  const handleStopDetection = () => {
    setIsDetecting(false);
    if (stream) {
      stopCamera(stream);
      setStream(null);
    }
    setAnalysisData(null);
  };

  // Process each frame for face detection
  const handleFrameReady = async (videoElement, canvasContext) => {
    if (!faceMesh) return;

    try {
      // Get facial landmarks from the video frame
      const landmarks = await getLandmarks(videoElement);

      if (landmarks && landmarks.length > 0) {
        // Clear canvas
        vizClearCanvas(canvasContext);

        // Draw visualization
        vizDrawLandmarks(canvasContext, landmarks);
        if (showMeasurements) {
          vizDrawMeasurementLines(canvasContext, landmarks);
          vizDrawSymmetryGuide(canvasContext, landmarks);
        }

        // Calculate facial proportions and beauty score
        const proportions = calculateFacialProportions(landmarks);
        if (proportions) {
          setAnalysisData(proportions);
        }
      } else {
        // No face detected, just clear the canvas
        vizClearCanvas(canvasContext);
      }
    } catch (err) {
      console.error('Error processing frame:', err);
    }
  };

  // Loading state
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Initializing Face Mesh...</p>
          <p className="text-gray-400 text-sm mt-2">Loading AI models</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-4xl">✨</div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">
              Facial Beauty Analyzer
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Analyze your facial proportions using the Golden Ratio (φ ≈ 1.618)
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6">
            <Alert
              type={error.type}
              title={error.title}
              message={error.message}
              onClose={() => setError(null)}
            />
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Camera Feed - 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-dark p-4 rounded-xl border border-white/10">
              <div className="aspect-video bg-black/50 rounded-lg overflow-hidden">
                <Camera
                  videoRef={videoRef}
                  canvasRef={canvasRef}
                  onFrameReady={handleFrameReady}
                  isDetecting={isDetecting}
                  showGrid={showGrid}
                  showMeasurements={showMeasurements}
                />
              </div>
            </div>

            {/* Camera Controls */}
            <div className="glass-dark p-4 rounded-xl border border-white/10">
              <div className="space-y-3">
                <div className="flex gap-3">
                  {!isDetecting ? (
                    <button
                      onClick={handleStartDetection}
                      className="flex-1 btn-primary"
                    >
                      🎥 Start Analysis
                    </button>
                  ) : (
                    <button
                      onClick={handleStopDetection}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      ⏹ Stop Analysis
                    </button>
                  )}
                </div>

                {/* Visualization Options */}
                <div className="bg-black/20 p-3 rounded-lg space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer hover:bg-white/10 p-2 rounded transition-colors">
                    <input
                      type="checkbox"
                      checked={showMeasurements}
                      onChange={(e) => setShowMeasurements(e.target.checked)}
                      disabled={!isDetecting}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm">Show Measurement Lines</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer hover:bg-white/10 p-2 rounded transition-colors">
                    <input
                      type="checkbox"
                      checked={showGrid}
                      onChange={(e) => setShowGrid(e.target.checked)}
                      disabled={!isDetecting}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm">Show Reference Grid</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="glass-dark p-3 rounded-lg text-center border border-white/10">
                <p className="text-sm text-gray-400">Golden Ratio</p>
                <p className="text-2xl font-bold text-purple-300 mt-1">1.618</p>
                <p className="text-xs text-gray-500 mt-1">φ (Phi)</p>
              </div>
              <div className="glass-dark p-3 rounded-lg text-center border border-white/10">
                <p className="text-sm text-gray-400">Detection Status</p>
                <p className={`text-2xl font-bold mt-1 ${isDetecting ? 'text-green-400' : 'text-gray-400'}`}>
                  {isDetecting ? '●' : '○'}
                </p>
                <p className="text-xs text-gray-500 mt-1">{isDetecting ? 'Active' : 'Inactive'}</p>
              </div>
            </div>
          </div>

          {/* Results Panel - 1 column on large screens */}
          <div className="glass-dark p-6 rounded-xl border border-white/10 h-fit lg:sticky lg:top-8">
            <h2 className="text-2xl font-bold text-purple-300 mb-6">Analysis Results</h2>
            <ResultsPanel 
              analysisData={analysisData}
              isLoading={isDetecting && !analysisData}
            />
          </div>
        </div>

        {/* Footer Information */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-dark p-4 rounded-lg border border-white/10">
              <h3 className="font-semibold text-purple-300 mb-2">🔒 Privacy</h3>
              <p className="text-sm text-gray-400">
                No images are stored, uploaded, or processed on remote servers. All analysis happens locally in your browser.
              </p>
            </div>
            <div className="glass-dark p-4 rounded-lg border border-white/10">
              <h3 className="font-semibold text-purple-300 mb-2">📊 How It Works</h3>
              <p className="text-sm text-gray-400">
                We detect 468 facial landmarks and compare proportions to the golden ratio (1.618), found throughout nature and art.
              </p>
            </div>
            <div className="glass-dark p-4 rounded-lg border border-white/10">
              <h3 className="font-semibold text-purple-300 mb-2">✨ Beauty</h3>
              <p className="text-sm text-gray-400">
                Beauty is subjective. This tool measures mathematical harmony, not aesthetic value. All faces are beautiful!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
