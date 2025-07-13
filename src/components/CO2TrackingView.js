import React from 'react';
import { Leaf, Clock, Calendar, Filter } from 'lucide-react';

const CO2TrackingView = ({ co2Savings, filterPeriod, setFilterPeriod, onBack }) => {
  const filtered = filterPeriod === 'week' ? co2Savings.slice(0, 7) : co2Savings.slice(0, 30);
  const totalCO2 = filtered.reduce((s, d) => s + d.co2Saved, 0);
  const totalTime = filtered.reduce((s, d) => s + d.timeSaved, 0);

  const avgCO2 = filterPeriod === 'month' && filtered.length
    ? totalCO2 / filtered.length
    : 0;

  const maxCO2 = filterPeriod === 'month' && filtered.length
    ? Math.max(...filtered.map(d => d.co2Saved))
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">CO₂ Tracking</h1>
          <button onClick={onBack} className="text-blue-600 hover:text-blue-800">
            ← Back to Dashboard
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Environmental Impact</h2>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <select
              value={filterPeriod}
              onChange={e => setFilterPeriod(e.target.value)}
              className="border p-1 rounded"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded shadow-sm">
            <h3 className="font-semibold mb-2 flex items-center">
              <Leaf className="w-5 h-5 text-green-600 mr-2" /> CO₂ Saved
            </h3>
            <p className="text-3xl font-bold text-green-600">{totalCO2.toFixed(2)} kg</p>
          </div>
          <div className="bg-white p-6 rounded shadow-sm">
            <h3 className="font-semibold mb-2 flex items-center">
              <Clock className="w-5 h-5 text-blue-600 mr-2" /> Time Saved
            </h3>
            <p className="text-3xl font-bold text-blue-600">{totalTime} min</p>
          </div>

          {filterPeriod === 'month' && (
            <>
              <div className="bg-white p-6 rounded shadow-sm">
                <h3 className="font-semibold mb-2">Average CO₂ Saved/Day</h3>
                <p className="text-2xl text-purple-600 font-bold">
                  {avgCO2.toFixed(2)} kg/day
                </p>
              </div>
              <div className="bg-white p-6 rounded shadow-sm">
                <h3 className="font-semibold mb-2">Highest CO₂ Saved in a Day</h3>
                <p className="text-2xl text-orange-600 font-bold">
                  {maxCO2.toFixed(2)} kg
                </p>
              </div>
            </>
          )}
        </div>

        <div className="bg-white p-6 rounded shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Daily Breakdown</h3>
          {filtered.map(day => (
            <div key={day.date} className="flex justify-between py-2 border-b">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>{new Date(day.date).toLocaleDateString()}</span>
              </div>
              <div className="flex space-x-4 text-sm">
                <span className="flex items-center">
                  <Leaf className="w-4 h-4 text-green-500 mr-1" /> {day.co2Saved.toFixed(2)} kg
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 text-blue-500 mr-1" /> {day.timeSaved} min
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CO2TrackingView;
