import React, { useEffect, useRef, useState } from 'react';
import { drawLandmarks, drawMeasurementLines, drawSymmetryGuide, clearCanvas } from '../utils/visualization';

/**
 * Camera Component - handles video stream and canvas overlay
 */
const Camera = ({ 
  videoRef, 
  canvasRef, 
  onFrameReady, 
  isDetecting = false,
  showGrid = false,
  showMeasurements = true
}) => {
  const animationId = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 1280, height: 720 });

  const processFrame = async () => {
    if (videoRef.current && canvasRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Ensure canvas matches video dimensions
      if (canvas.width !== videoRef.current.videoWidth || canvas.height !== videoRef.current.videoHeight) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        setCanvasSize({ width: canvas.width, height: canvas.height });
      }

      // Draw video frame
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      // Notify parent component for face detection processing
      if (isDetecting && onFrameReady) {
        await onFrameReady(videoRef.current, ctx);
      }
    }

    animationId.current = requestAnimationFrame(processFrame);
  };

  useEffect(() => {
    if (isDetecting) {
      animationId.current = requestAnimationFrame(processFrame);
    }

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [isDetecting, onFrameReady]);

  return (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden shadow-2xl">
      <video
        ref={videoRef}
        className="w-full h-full object-cover hidden"
        playsInline
        autoPlay
        muted
      />
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        width={canvasSize.width}
        height={canvasSize.height}
      />
      
      {!isDetecting && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="text-center">
            <div className="text-4xl mb-3">📹</div>
            <p className="text-gray-300 font-semibold">Camera Ready</p>
            <p className="text-sm text-gray-400 mt-2">Click Start to begin analysis</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Camera;
