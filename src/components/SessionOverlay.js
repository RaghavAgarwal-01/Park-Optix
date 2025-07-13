// SessionOverlay.js
import React, { useEffect, useState } from 'react';

const SessionOverlay = ({ parkingSession, onClick }) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!parkingSession?.arrivalTime) return;
    const interval = setInterval(() => {
      const diff = Math.floor((new Date() - new Date(parkingSession.arrivalTime)) / 1000);
      setElapsed(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, [parkingSession]);

  if (!parkingSession) return null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} min ${secs} sec`;
  };

  return (
    <div
      className="fixed bottom-4 right-4 bg-white border shadow-lg rounded p-4 w-72 z-50 cursor-pointer animate-fadeIn hover:bg-gray-100 transition animate-pulse"
      onClick={onClick}
      role="button"
      aria-label="View or end your parking session"
      title="Click to manage your ticket"
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold text-gray-800">🚗 Ongoing Session</h4>
      </div>
      <p className="text-sm text-gray-700">
        <strong>Spot:</strong> {parkingSession.spot.id}<br />
        <strong>Start:</strong> {new Date(parkingSession.arrivalTime).toLocaleTimeString()}<br />
        <strong>Time:</strong> {formatTime(elapsed)}
      </p>
      <p className="text-xs text-blue-600 mt-2">Click to manage your ticket →</p>
    </div>
  );
};

export default SessionOverlay;
