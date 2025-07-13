import React, { useState } from 'react';
import { User, Car, Lock } from 'lucide-react';

const RegistrationView = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleType, setVehicleType] = useState('compact');

  const handleSubmit = (e) => {
  e.preventDefault();
  onRegister({
    name,
    vehicle: {
      make: vehicleMake,
      model: vehicleModel,
      type: vehicleType,
    },
  });
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register to ParkOptix</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Vehicle Make</label>
            <div className="relative">
              <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={vehicleMake}
                onChange={e => setVehicleMake(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Toyota"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Vehicle Model</label>
            <input
              type="text"
              value={vehicleModel}
              onChange={e => setVehicleModel(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Corolla"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Vehicle Type</label>
            <select
              value={vehicleType}
              onChange={e => setVehicleType(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="compact">Compact</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="truck">Truck</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 flex items-center justify-center"
          >
            <Lock className="w-5 h-5 mr-2" /> Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationView;
