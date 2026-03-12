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
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const processFrame = async () => {
    if (videoRef.current && canvasRef.current) {
      // Check if video is actually ready
      if (videoRef.current.readyState < videoRef.current.HAVE_CURRENT_DATA) {
        animationId.current = requestAnimationFrame(processFrame);
        return;
      }

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Get actual video dimensions
      const videoWidth = videoRef.current.videoWidth;
      const videoHeight = videoRef.current.videoHeight;

      // Only proceed if video has valid dimensions
      if (videoWidth > 0 && videoHeight > 0) {
        // Ensure canvas matches video dimensions
        if (canvas.width !== videoWidth || canvas.height !== videoHeight) {
          canvas.width = videoWidth;
          canvas.height = videoHeight;
          setCanvasSize({ width: videoWidth, height: videoHeight });
        }

        try {
          // Draw video frame
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

          // Notify parent component for face detection processing
          if (isDetecting && onFrameReady) {
            await onFrameReady(videoRef.current, ctx);
          }
        } catch (err) {
          console.error('Frame processing error:', err);
        }
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
        disablePictureInPicture
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
