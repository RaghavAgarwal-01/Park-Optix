import React, { useEffect, useState } from 'react';

const TicketView = ({ parkingSession, setCurrentView, onArrival, onDeparture }) => {
  const [timeParked, setTimeParked] = useState(0);

  useEffect(() => {
    let interval;
    if (parkingSession?.arrivalTime) {
      interval = setInterval(() => {
        const diff = Math.floor((new Date() - new Date(parkingSession.arrivalTime)) / 1000);
        setTimeParked(diff);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [parkingSession]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} min ${secs} sec`;
  };

  const handleEndParking = () => {
    const parkedTimeStr = formatTime(timeParked);
    const ticketDetails = `Ticket #${parkingSession?.ticketNo}\nSpot: ${parkingSession?.spot.id}\nSection: ${parkingSession?.section}\nTime Parked: ${parkedTimeStr}`;

    window.dispatchEvent(new CustomEvent('showToast', { detail: ticketDetails }));
    onDeparture();
  };

  if (!parkingSession) return null;

  return (
    <div className="max-w-md mx-auto bg-white rounded p-6 shadow my-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        🎟️ Your Parking Ticket
      </h2>

      <p className="text-gray-700 mb-2">
        <strong>Ticket Number:</strong> {parkingSession.ticketNo}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Spot ID:</strong> {parkingSession.spot.id}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Section:</strong> {parkingSession.section}
      </p>
      <p className="text-gray-700 mb-4">
        <strong>Reservation Time:</strong>{" "}
        {parkingSession.startTime
          ? new Date(parkingSession.startTime).toLocaleString()
          : "Not started yet"}
      </p>

      {parkingSession.status === 'reserved' && (
        <button
          className="w-full bg-green-600 text-white p-3 rounded mb-4 hover:bg-green-700"
          onClick={onArrival}
        >
          I Have Arrived
        </button>
      )}

      {parkingSession.status === 'parked' && (
        <p className="text-green-600 font-bold mb-4">
          <strong>Time Parked:</strong> {formatTime(timeParked)}
        </p>
      )}

      <button
        className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700"
        onClick={handleEndParking}
        disabled={parkingSession.status !== 'parked'}
      >
        End Parking
      </button>

      <button
        className="mt-4 text-blue-600 hover:underline text-sm"
        onClick={() => setCurrentView('dashboard')}
      >
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default TicketView;
