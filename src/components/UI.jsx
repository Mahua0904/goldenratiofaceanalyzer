import React, { useState, useEffect } from 'react';

/**
 * Score Badge Component - displays a circular score badge
 */
export const ScoreBadge = ({ score, label, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-16 h-16 text-lg',
    md: 'w-24 h-24 text-2xl',
    lg: 'w-32 h-32 text-4xl',
  };

  const getColor = (score) => {
    if (score >= 85) return 'from-green-500 to-emerald-600';
    if (score >= 70) return 'from-blue-500 to-cyan-600';
    if (score >= 55) return 'from-purple-500 to-pink-600';
    if (score >= 40) return 'from-yellow-500 to-orange-600';
    return 'from-orange-500 to-red-600';
  };

  return (
    <div className={`relative score-badge bg-gradient-to-br ${getColor(score)} flex items-center justify-center ${sizeClasses[size]} shadow-lg`}>
      <div className="absolute inset-0.5 bg-black/30 rounded-full"></div>
      <div className="relative z-10">
        <div className="font-bold">{Math.round(score)}</div>
        <div className="text-xs font-semibold mt-1 opacity-90">{label}</div>
      </div>
    </div>
  );
};

/**
 * Animated Progress Bar Component
 */
export const ProgressBar = ({ value, label, maxValue = 100, showValue = true }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayValue(prev => {
        if (prev < value) return Math.min(prev + 1, value);
        return value;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [value]);

  const percentage = (displayValue / maxValue) * 100;
  const color = displayValue >= 75 ? 'green' : displayValue >= 50 ? 'purple' : 'orange';

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-semibold text-gray-300">{label}</span>
        {showValue && <span className={`text-sm font-bold text-${color}-400`}>{Math.round(displayValue)}</span>}
      </div>
      <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r from-${color}-400 to-${color}-600 transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

/**
 * Measurement Card Component
 */
export const MeasurementCard = ({ title, value, ideal, status }) => {
  const isGood = status === 'good';
  const statusColor = isGood ? 'text-green-400' : 'text-orange-400';
  const statusBg = isGood ? 'bg-green-500/10' : 'bg-orange-500/10';

  return (
    <div className={`glass-dark p-4 rounded-lg border ${isGood ? 'border-green-500/30' : 'border-orange-500/30'}`}>
      <h4 className="text-sm font-semibold text-gray-300 mb-2">{title}</h4>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">Measured</span>
          <span className="font-mono font-bold text-white">{parseFloat(value).toFixed(3)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">Ideal</span>
          <span className="font-mono text-purple-300">{parseFloat(ideal).toFixed(3)}</span>
        </div>
        <div className={`text-xs font-semibold ${statusColor} ${statusBg} px-2 py-1 rounded text-center`}>
          {isGood ? '✓ Close' : '○ Developing'}
        </div>
      </div>
    </div>
  );
};

/**
 * Info Card Component
 */
export const InfoCard = ({ title, children, icon = null }) => (
  <div className="glass-dark p-4 rounded-lg border border-white/10">
    <div className="flex items-start gap-3">
      {icon && <div className="text-2xl mt-1">{icon}</div>}
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-purple-300 mb-2">{title}</h3>
        <div className="text-xs text-gray-400 leading-relaxed">{children}</div>
      </div>
    </div>
  </div>
);

/**
 * Loading Spinner Component
 */
export const Spinner = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="relative w-12 h-12 mb-4">
      <div className="absolute inset-0 rounded-full border-4 border-purple-500/20"></div>
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-r-pink-500 animate-spin"></div>
    </div>
    <p className="text-gray-400 text-sm">{message}</p>
  </div>
);

/**
 * Alert Component
 */
export const Alert = ({ type = 'info', title, message, onClose }) => {
  const colors = {
    success: 'bg-green-500/10 border-green-500/30 text-green-300',
    error: 'bg-red-500/10 border-red-500/30 text-red-300',
    warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300',
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div className={`glass-dark rounded-lg border p-4 ${colors[type]}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <span className="text-xl font-bold">{icons[type]}</span>
          <div>
            <h4 className="font-semibold">{title}</h4>
            <p className="text-sm opacity-90 mt-1">{message}</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-lg opacity-50 hover:opacity-100 transition-opacity"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};
