import React, { useState } from 'react';

const DashboardView = ({ user, parkingSpots, co2Savings, setCurrentView }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const totalCO2 = co2Savings.reduce((acc, entry) => acc + entry.co2Saved, 0).toFixed(2);
  const totalTime = co2Savings.reduce((acc, entry) => acc + entry.timeSaved, 0);

  return (
    <div className="container mx-auto py-8 px-4 relative">
      {/* Header */}
      <header className="mb-6 flex items-center justify-between relative">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
            🚗
          </div>
          <div>
            <h1 className="text-2xl font-bold">ParkOptix</h1>
            <p className="text-gray-600">Welcome, {user?.name}!</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-green-700 font-semibold relative">
          <span>🌿 CO₂ Neutral Shopping</span>
          <button
            className="text-black text-2xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            &#9776;
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 top-12 bg-white border rounded-md shadow-lg w-48 z-50">
              <ul className="flex flex-col">
                <li
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setMenuOpen(false);
                    setCurrentView('profile');
                  }}
                >
                  👤 Profile
                </li>
                <li
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setMenuOpen(false);
                    setCurrentView('settings');
                  }}
                >
                  ⚙️ Settings
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg p-6 shadow">
          <h3 className="text-gray-500 mb-2">CO₂ Saved</h3>
          <p className="text-2xl font-bold text-green-600">{totalCO2} kg</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow">
          <h3 className="text-gray-500 mb-2">Time Saved</h3>
          <p className="text-2xl font-bold text-blue-600">{totalTime} min</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow">
          <h3 className="text-gray-500 mb-2">Available Spots</h3>
          <p className="text-2xl font-bold text-purple-600">
            {parkingSpots.filter(spot => spot.available).length}
          </p>
        </div>
      </div>

      {/* Quick Actions + Vehicle Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-lg p-6 shadow">
          <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
          <div className="flex flex-col gap-4">
            <button
              className="bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
              onClick={() => setCurrentView('findParking')}
            >
              📍 Find Parking Spot
            </button>
            <button
            className="bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition"
            onClick={() => setCurrentView('pdRouting')}
          >
            🚚 Dedicated P&D Routing
          </button>

            <button
              className="bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition"
              onClick={() => setCurrentView('co2Tracking')}
            >
              🌿 View CO₂ Savings
            </button>
            <button
            className="bg-yellow-500 text-white font-bold py-3 rounded-lg hover:bg-yellow-600 transition"
            onClick={() => setCurrentView('rewards')}
          >
            🎁 View Rewards
          </button>

          </div>
        </div>

        {/* 🚘 Modern Vehicle Info Card */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 shadow-lg flex flex-col justify-between hover:shadow-2xl transition">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl">
              🚘
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-700">Your Vehicle</h3>
              <p className="text-sm text-gray-500">ParkOptix Registered Car</p>
            </div>
          </div>
          <div className="text-gray-700 space-y-1">
            <p><span className="font-semibold">Make:</span> {user?.vehicle?.make || 'N/A'}</p>
            <p><span className="font-semibold">Model:</span> {user?.vehicle?.model || 'N/A'}</p>
            <p><span className="font-semibold">Type:</span> {user?.vehicle?.type || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
