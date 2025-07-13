import React, { useEffect, useState } from 'react';

const PDRoutingView = ({ setCurrentView, parkingSpots }) => {
  const [assignedSpot, setAssignedSpot] = useState(null);
  const [predictedDemand, setPredictedDemand] = useState(0);

  useEffect(() => {
    // 🔥 Simulate driver ETA → random 5-20 mins
    const driverETA = Math.floor(Math.random() * 16) + 5;

    // 🔥 Randomly pick an available spot if there are any
    const availableSpots = parkingSpots.filter(spot => spot.available);
    if (availableSpots.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableSpots.length);
      const randomSpot = availableSpots[randomIndex];

      setAssignedSpot({
        ...randomSpot,
        eta: driverETA,
      });
    }

    // 🔥 Simulate peak demand prediction → random between 60-100% for demo
    const demandPrediction = Math.floor(Math.random() * 41) + 60;
    setPredictedDemand(demandPrediction);
  }, [parkingSpots]);

  return (
    <div className="p-8 max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-6">🚚 Dedicated P&D Routing</h2>

      {assignedSpot ? (
        <div className="bg-white rounded-lg p-6 shadow mb-6 text-left">
          <h3 className="text-xl font-bold mb-2 text-green-700">Assigned Spot</h3>
          <p><strong>Spot ID:</strong> {assignedSpot.id}</p>
          <p><strong>Section:</strong> {assignedSpot.section}</p>
          <p><strong>ETA:</strong> {assignedSpot.eta} mins</p>
        </div>
      ) : (
        <p className="text-gray-600 mb-6">No available spots to assign right now.</p>
      )}

      <div className="bg-yellow-100 rounded-lg p-4 shadow text-left">
        <h3 className="text-lg font-bold mb-1 text-yellow-800">📈 Peak Demand Prediction</h3>
        <p>Predicted parking demand in next hour: <strong>{predictedDemand}% capacity</strong></p>
      </div>

      <button
        className="mt-8 bg-blue-600 text-white font-bold py-3 px-6 rounded hover:bg-blue-700 transition"
        onClick={() => setCurrentView('dashboard')}
      >
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default PDRoutingView;
