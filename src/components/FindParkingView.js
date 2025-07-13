import React from 'react';

const FindParkingView = ({
  user,
  parkingSpots,
  setCurrentView,
  onSpotSelect,
  onEndParking,
  parkingSession,
}) => {
  const displaySpots = parkingSpots.map((spot) => {
    const isReservedByUser = parkingSession && parkingSession.spot.id === spot.id;
    return {
      ...spot,
      show: spot.available || isReservedByUser,
      isReservedByUser,
    };
  });

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        🚗 Available Parking Spots
      </h2>

      {/* Spots grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-10">
        {displaySpots
          .filter((spot) => spot.show)
          .map((spot) => (
            <div
              key={spot.id}
              className={`p-6 rounded-lg border shadow-lg cursor-pointer text-center transition transform hover:scale-105 ${
                spot.isReservedByUser
                  ? 'bg-yellow-100 border-yellow-500'
                  : 'bg-white hover:bg-gray-100'
              }`}
              onClick={() => !spot.isReservedByUser && onSpotSelect(spot)}
            >
              <span className="text-xl font-bold text-gray-800">{spot.id}</span>
              {spot.isReservedByUser ? (
                <p className="text-red-600 mt-2 font-semibold animate-pulse">
                  [Your Reserved Spot]
                </p>
              ) : (
                <p className="text-green-600 mt-2 font-medium">Available</p>
              )}
            </div>
          ))}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          className="bg-gray-600 text-white font-bold py-3 px-6 rounded hover:bg-gray-700 transition"
          onClick={() => setCurrentView('dashboard')}
        >
          ⬅️ Back to Dashboard
        </button>
        {parkingSession && (
          <button
            className="bg-red-600 text-white font-bold py-3 px-6 rounded hover:bg-red-700 transition"
            onClick={onEndParking}
          >
            🛑 End Current Session
          </button>
        )}
      </div>
    </div>
  );
};

export default FindParkingView;
