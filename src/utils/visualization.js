/**
 * Canvas Drawing and Visualization Module
 * Handles drawing facial landmarks and measurement overlays
 */

/**
 * Draw facial landmarks on canvas
 */
export const drawLandmarks = (ctx, landmarks, width, height) => {
  if (!landmarks) return;

  const canvasWidth = ctx.canvas.width;
  const canvasHeight = ctx.canvas.height;

  // Draw landmarks as small circles
  ctx.fillStyle = '#FF6B6B';
  ctx.globalAlpha = 0.8;
  
  landmarks.forEach((landmark, index) => {
    const x = landmark.x * canvasWidth;
    const y = landmark.y * canvasHeight;
    
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.fill();
  });

  ctx.globalAlpha = 1.0;

  // Draw connections (mesh)
  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 7], [0, 4], [4, 5], [5, 6], [6, 8],
    [9, 10], [11, 12], [11, 13], [13, 14], [14, 15], [15, 16],
    [12, 166], [166, 167], [167, 168], [168, 169], [169, 170], [170, 171],
    [171, 140], [140, 112], [112, 26], [26, 22], [22, 23], [23, 24],
    [24, 110], [110, 178], [178, 110], [53, 52], [65, 64],
    [52, 51], [51, 50], [50, 49], [49, 48], [48, 47], [47, 46],
    [46, 161], [161, 160], [160, 159], [159, 158], [158, 157], [157, 173],
    [173, 157], [37, 36], [36, 35], [35, 34], [34, 33], [33, 32],
    [32, 31], [31, 30], [30, 29], [29, 28], [28, 27], [27, 26],
    [142, 141], [141, 100], [100, 99], [99, 98], [98, 97],
  ];

  ctx.strokeStyle = 'rgba(255, 107, 107, 0.5)';
  ctx.lineWidth = 1;

  connections.forEach(([start, end]) => {
    if (landmarks[start] && landmarks[end]) {
      const x1 = landmarks[start].x * canvasWidth;
      const y1 = landmarks[start].y * canvasHeight;
      const x2 = landmarks[end].x * canvasWidth;
      const y2 = landmarks[end].y * canvasHeight;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  });
};

/**
 * Draw measurement lines for specific facial points
 */
export const drawMeasurementLines = (ctx, landmarks) => {
  if (!landmarks || landmarks.length < 470) return;

  const canvasWidth = ctx.canvas.width;
  const canvasHeight = ctx.canvas.height;

  // Helper to draw a measurement line with label
  const drawMeasurement = (p1Idx, p2Idx, color, label) => {
    if (!landmarks[p1Idx] || !landmarks[p2Idx]) return;

    const x1 = landmarks[p1Idx].x * canvasWidth;
    const y1 = landmarks[p1Idx].y * canvasHeight;
    const x2 = landmarks[p2Idx].x * canvasWidth;
    const y2 = landmarks[p2Idx].y * canvasHeight;

    // Draw line
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw endpoints
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x1, y1, 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x2, y2, 3, 0, 2 * Math.PI);
    ctx.fill();

    // Draw label
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    ctx.fillStyle = color;
    ctx.font = 'bold 12px Arial';
    ctx.fillText(label, midX + 5, midY - 5);
  };

  // Key measurements
  drawMeasurement(10, 152, '#00FF00', 'Face Length'); // forehead to chin
  drawMeasurement(130, 359, '#00FFFF', 'Eye Distance'); // left to right eye
  drawMeasurement(4, 2, '#FF00FF', 'Nose Length'); // nose tip to bottom
  drawMeasurement(61, 291, '#FFFF00', 'Mouth Width'); // left mouth to right mouth
};

/**
 * Draw face symmetry guide
 */
export const drawSymmetryGuide = (ctx, landmarks) => {
  if (!landmarks || landmarks.length < 152) return;

  const canvasWidth = ctx.canvas.width;
  const canvasHeight = ctx.canvas.height;

  // Vertical center line
  const noseTipX = landmarks[4].x * canvasWidth;
  
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 2;
  ctx.setLineDash([10, 5]);
  ctx.beginPath();
  ctx.moveTo(noseTipX, 0);
  ctx.lineTo(noseTipX, canvasHeight);
  ctx.stroke();
  ctx.setLineDash([]);
};

/**
 * Clear canvas
 */
export const clearCanvas = (ctx) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

/**
 * Draw grid pattern (optional for alignment reference)
 */
export const drawGrid = (ctx) => {
  const canvasWidth = ctx.canvas.width;
  const canvasHeight = ctx.canvas.height;
  const gridSize = 50;

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 0.5;

  for (let x = 0; x < canvasWidth; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvasHeight);
    ctx.stroke();
  }

  for (let y = 0; y < canvasHeight; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvasWidth, y);
    ctx.stroke();
  }
};
