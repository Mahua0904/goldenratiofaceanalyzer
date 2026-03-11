/**
 * Golden Ratio Calculations Module
 * Calculates facial proportions and compares them with the golden ratio (1.618)
 */

const GOLDEN_RATIO = 1.618;
const IDEAL_RATIOS = {
  faceLength_Width: 1.618, // Face should be longer than wide
  eyeDistance_FaceWidth: 0.46, // Eyes should be ~46% of face width apart
  noseLength_LipDistance: 1.618, // Nose should follow golden ratio to lip distance
  mouthWidth_NoseWidth: 1.618, // Mouth to nose width ratio
};

/**
 * Calculate distance between two 3D points
 */
export const distance = (p1, p2) => {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  const dz = (p1.z || 0) - (p2.z || 0);
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

/**
 * Calculate ratio between two distances
 */
export const getRatio = (d1, d2) => {
  return d2 > 0 ? d1 / d2 : 0;
};

/**
 * Compare a measured ratio with the golden ratio
 * Returns a score from 0-100, where 100 is perfect match
 */
export const goldenRatioScore = (measuredRatio) => {
  const difference = Math.abs(measuredRatio - GOLDEN_RATIO);
  // Maximum tolerance is 0.5 (difference from golden ratio)
  const tolerance = 0.5;
  const score = Math.max(0, 100 - (difference / tolerance) * 100);
  return Math.round(score);
};

/**
 * Calculate custom ratio score (for ratios that aren't exactly 1.618)
 */
export const customRatioScore = (measured, ideal, tolerance = 0.3) => {
  const difference = Math.abs(measured - ideal);
  const score = Math.max(0, 100 - (difference / tolerance) * 100);
  return Math.round(score);
};

/**
 * Main function to calculate all facial proportions
 */
export const calculateFacialProportions = (landmarks) => {
  if (!landmarks || landmarks.length < 470) return null;

  try {
    // Key landmark indices (from MediaPipe FaceMesh)
    const indexMap = {
      forehead: 10,
      chin: 152,
      leftEye: 130,
      rightEye: 359,
      noseTip: 4,
      noseBottom: 2,
      leftMouth: 61,
      rightMouth: 291,
      mouthTop: 13,
      mouthBottom: 14,
      leftEar: 234,
      rightEar: 454,
      leftCheek: 127,
      rightCheek: 356,
    };

    const points = {};
    Object.entries(indexMap).forEach(([key, idx]) => {
      points[key] = landmarks[idx];
    });

    // Calculate face dimensions
    const faceLength = distance(points.forehead, points.chin);
    const faceWidth = distance(points.leftEar, points.rightEar);
    const faceLengthRatio = getRatio(faceLength, faceWidth);

    // Eye measurements
    const eyeDistance = distance(points.leftEye, points.rightEye);
    const eyeDistanceRatio = getRatio(eyeDistance, faceWidth);

    // Nose measurements
    const noseLength = distance(points.noseTip, points.noseBottom);
    const mouthDistance = distance(points.mouthTop, points.mouthBottom);
    const noseLengthRatio = getRatio(noseLength, mouthDistance);

    // Mouth measurements
    const mouthWidth = distance(points.leftMouth, points.rightMouth);
    const noseWidth = distance(points.leftCheek, points.rightCheek) * 0.3; // Approximate
    const mouthRatio = getRatio(mouthWidth, noseWidth);

    // Cheek width (face symmetry indicator)
    const leftCheekDist = distance(points.leftCheek, points.noseTip);
    const rightCheekDist = distance(points.rightCheek, points.noseTip);
    const symmetryRatio = Math.min(leftCheekDist, rightCheekDist) / Math.max(leftCheekDist, rightCheekDist);

    // Calculate individual scores
    const scores = {
      faceProportion: goldenRatioScore(faceLengthRatio),
      eyeSpacing: customRatioScore(eyeDistanceRatio, IDEAL_RATIOS.eyeDistance_FaceWidth, 0.2),
      noseProportion: goldenRatioScore(noseLengthRatio),
      mouthProportion: goldenRatioScore(mouthRatio),
      symmetry: Math.round(symmetryRatio * 100),
    };

    // Calculate overall beauty score (weighted average)
    const weights = {
      faceProportion: 0.25,
      eyeSpacing: 0.20,
      noseProportion: 0.20,
      mouthProportion: 0.20,
      symmetry: 0.15,
    };

    const beautyScore = Math.round(
      scores.faceProportion * weights.faceProportion +
      scores.eyeSpacing * weights.eyeSpacing +
      scores.noseProportion * weights.noseProportion +
      scores.mouthProportion * weights.mouthProportion +
      scores.symmetry * weights.symmetry
    );

    return {
      ratios: {
        faceLengthRatio: faceLengthRatio.toFixed(3),
        eyeDistanceRatio: eyeDistanceRatio.toFixed(3),
        noseLengthRatio: noseLengthRatio.toFixed(3),
        mouthRatio: mouthRatio.toFixed(3),
        symmetryRatio: symmetryRatio.toFixed(3),
      },
      scores,
      beautyScore,
      goldenRatio: GOLDEN_RATIO.toFixed(3),
      measurements: {
        faceLength: faceLength.toFixed(2),
        faceWidth: faceWidth.toFixed(2),
        eyeDistance: eyeDistance.toFixed(2),
      },
    };
  } catch (error) {
    console.error('Error calculating proportions:', error);
    return null;
  }
};

/**
 * Get analysis interpretation
 */
export const getAnalysisInterpretation = (scores) => {
  const avg = Math.round((scores.faceProportion + scores.eyeSpacing + scores.noseProportion + scores.mouthProportion) / 4);
  
  if (avg >= 85) return { text: 'Exceptional', color: 'text-green-400' };
  if (avg >= 70) return { text: 'Excellent', color: 'text-blue-400' };
  if (avg >= 55) return { text: 'Good', color: 'text-purple-400' };
  if (avg >= 40) return { text: 'Fair', color: 'text-yellow-400' };
  return { text: 'Developing', color: 'text-orange-400' };
};
