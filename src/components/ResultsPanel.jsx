import React, { useState, useEffect } from 'react';
import { ScoreBadge, ProgressBar, MeasurementCard, InfoCard } from './UI';
import { getAnalysisInterpretation } from '../utils/goldenRatio';

/**
 * Results Panel Component - displays facial analysis results
 */
const ResultsPanel = ({ analysisData, isLoading = false }) => {
  const [interpretation, setInterpretation] = useState(null);

  useEffect(() => {
    if (analysisData && analysisData.scores) {
      const interp = getAnalysisInterpretation(analysisData.scores);
      setInterpretation(interp);
    }
  }, [analysisData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-3" style={{ animationDuration: '1s' }}>⏳</div>
          <p className="text-gray-300">Analyzing facial proportions...</p>
        </div>
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-4xl mb-3">✨</div>
          <p className="text-gray-300">No face detected</p>
          <p className="text-sm text-gray-400 mt-2">Position yourself in front of the camera</p>
        </div>
      </div>
    );
  }

  const { beautyScore, scores, ratios, goldenRatio } = analysisData;

  return (
    <div className="h-full overflow-y-auto space-y-6 pr-4 custom-scrollbar">
      {/* Main Beauty Score */}
      <div className="flex flex-col items-center gap-4">
        <ScoreBadge score={beautyScore} label="Beauty Score" size="lg" />
        {interpretation && (
          <div className={`text-center`}>
            <p className={`text-2xl font-bold ${interpretation.color}`}>{interpretation.text}</p>
            <p className="text-xs text-gray-400 mt-2">Based on golden ratio analysis</p>
          </div>
        )}
      </div>

      {/* Golden Ratio Reference */}
      <InfoCard 
        title="Golden Ratio Reference" 
        icon="φ"
      >
        <div className="flex items-center justify-between">
          <span>Ideal proportion (φ):</span>
          <span className="font-mono font-bold text-purple-300">{goldenRatio}</span>
        </div>
      </InfoCard>

      {/* Key Proportion Scores */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-purple-300 uppercase tracking-wide">Facial Proportions</h3>
        <ProgressBar 
          value={scores.faceProportion} 
          label="Face Length/Width" 
          showValue={true}
        />
        <ProgressBar 
          value={scores.eyeSpacing} 
          label="Eye Spacing" 
          showValue={true}
        />
        <ProgressBar 
          value={scores.noseProportion} 
          label="Nose Proportion" 
          showValue={true}
        />
        <ProgressBar 
          value={scores.mouthProportion} 
          label="Mouth Proportion" 
          showValue={true}
        />
      </div>

      {/* Symmetry Score */}
      <div className="glass-dark p-4 rounded-lg border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-cyan-300">Facial Symmetry</h3>
          <span className="text-2xl font-bold text-cyan-400">{Math.round(scores.symmetry)}%</span>
        </div>
        <ProgressBar 
          value={scores.symmetry} 
          label="Symmetry Level" 
          maxValue={100}
          showValue={false}
        />
        <p className="text-xs text-gray-400 mt-3">
          Measures the bilateral balance of facial features. Higher values indicate better symmetry.
        </p>
      </div>

      {/* Detailed Measurements */}
      <div>
        <h3 className="text-sm font-semibold text-purple-300 uppercase tracking-wide mb-3">
          Proportional Ratios
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <MeasurementCard
            title="Face Length/Width"
            value={ratios.faceLengthRatio}
            ideal="1.618"
            status={Math.abs(parseFloat(ratios.faceLengthRatio) - 1.618) < 0.3 ? 'good' : 'developing'}
          />
          <MeasurementCard
            title="Eye Distance/Width"
            value={ratios.eyeDistanceRatio}
            ideal="0.460"
            status={Math.abs(parseFloat(ratios.eyeDistanceRatio) - 0.46) < 0.1 ? 'good' : 'developing'}
          />
          <MeasurementCard
            title="Nose/Mouth Height"
            value={ratios.noseLengthRatio}
            ideal="1.618"
            status={Math.abs(parseFloat(ratios.noseLengthRatio) - 1.618) < 0.3 ? 'good' : 'developing'}
          />
          <MeasurementCard
            title="Mouth/Nose Width"
            value={ratios.mouthRatio}
            ideal="1.618"
            status={Math.abs(parseFloat(ratios.mouthRatio) - 1.618) < 0.3 ? 'good' : 'developing'}
          />
        </div>
      </div>

      {/* Information Note */}
      <InfoCard
        title="About This Analysis"
        icon="ℹ️"
      >
        Beauty is subjective and multifaceted. This analysis measures how facial proportions align with the golden ratio (φ ≈ 1.618), a mathematical pattern found in nature. The score reflects mathematical harmony, not aesthetic value.
      </InfoCard>
    </div>
  );
};

export default ResultsPanel;
