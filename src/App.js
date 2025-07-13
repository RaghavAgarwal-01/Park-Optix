import React, { useState, useEffect } from 'react';
import Toast from './components/Toast';
import PDRoutingView from './components/PDRoutingView';
import RewardsView from './components/RewardsView';
import SessionOverlay from './components/SessionOverlay';
import RegistrationView from './components/RegistrationView';
import DashboardView from './components/DashboardView';
import FindParkingView from './components/FindParkingView';
import TicketView from './components/TicketView';
import CO2TrackingView from './components/CO2TrackingView';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [currentView, setCurrentView] = useState('registration');
  const [user, setUser] = useState(null);
  const [parkingSpots, setParkingSpots] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [parkingSession, setParkingSession] = useState(null);
  const [filterPeriod, setFilterPeriod] = useState('week');
  const [showOverlay, setShowOverlay] = useState(false);
  const [reminderTimeout, setReminderTimeout] = useState(null);
  const [userPoints, setUserPoints] = useState(0);

  const [co2Savings, setCO2Savings] = useState([
    { date: '2025-07-01', co2Saved: 0.5, timeSaved: 3 },
    { date: '2025-07-02', co2Saved: 0.8, timeSaved: 4 },
    { date: '2025-07-03', co2Saved: 1.0, timeSaved: 5 },
  ]);

  useEffect(() => {
    const sections = ['A', 'B', 'C'];
    const generated = [];
    sections.forEach(section => {
      for (let i = 1; i <= 5; i++) {
        generated.push({
          id: `${section}-${i}`,
          section,
          available: Math.random() > 0.3,
          distance: Math.floor(Math.random() * 50) + 10,
          type: i <= 2 ? 'close' : 'standard',
        });
      }
    });
    setParkingSpots(generated);

    const handleToastEvent = (e) => {
      setToastMessage(e.detail);
      setCurrentView('dashboard');
    };
    window.addEventListener('showToast', handleToastEvent);
    return () => window.removeEventListener('showToast', handleToastEvent);
  }, []);

  const handleRegister = (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleSpotSelect = (spot) => {
    const ticketNumber = Math.floor(100000 + Math.random() * 900000);

    setParkingSpots(prevSpots =>
      prevSpots.map(s =>
        s.id === spot.id ? { ...s, available: false } : s
      )
    );

    setSelectedSpot(spot);
    setParkingSession({
      id: Date.now(),
      ticketNo: ticketNumber,
      spot: spot,
      section: spot.section,
      status: 'reserved',
    });

    setCurrentView('ticket');
  };

const handleArrival = () => {
  setUserPoints(prev => prev + 50); // reward 50 points for quick engine off
  setParkingSession((prev) => ({
    ...prev,
    status: 'parked',
    startTime: new Date(),
    arrivalTime: new Date(),
  }));

  // 🔥 Calculate CO₂ saved for this parking event
  const averageSearchTime = 10; // minutes (typical time without ParkOptix)
  const estimatedParkOptixTime = 2; // minutes (time with app)
  const timeSaved = averageSearchTime - estimatedParkOptixTime;

  const CO2_PER_MINUTE = 0.016; // kg CO₂ saved per minute of idling avoided
  const co2Saved = timeSaved * CO2_PER_MINUTE;

  const today = new Date().toISOString().split('T')[0];

  setCO2Savings((prev) => [
    ...prev,
    {
      date: today,
      co2Saved: parseFloat(co2Saved.toFixed(2)),
      timeSaved: timeSaved,
    },
  ]);

  setShowOverlay(true);
  setToastMessage('🔔 Please turn off your engine to reduce CO₂ emissions and save fuel!');
};


  const handleEndParking = () => {
    setUserPoints(prev => prev + 100); // reward 100 points for releasing spot early

    if (parkingSession) {
      const endTime = new Date();
      const startTimeRaw = parkingSession.startTime;
      const startTime = startTimeRaw instanceof Date ? startTimeRaw : new Date(startTimeRaw);
      const durationMs = endTime - startTime;

      const totalMinutes = Math.max(Math.floor(durationMs / 60000), 1);

      // Pricing: first 30 mins free, ₹2/min after that
      let estimatedCost = 0;
      const gracePeriod = 30; // minutes
      const ratePerMinute = 2; // ₹ per min

      if (totalMinutes > gracePeriod) {
        const paidMinutes = totalMinutes - gracePeriod;
        estimatedCost = paidMinutes * ratePerMinute;
      }

      const minutes = totalMinutes;
      const seconds = Math.floor((durationMs % 60000) / 1000);

      const summary = `🧾 Parking Summary:
Ticket No: ${parkingSession.ticketNo}
Spot ID: ${parkingSession.spot?.id}
Section: ${parkingSession.section}
Time Parked: ${minutes} min ${seconds} sec
Estimated Cost: ₹${estimatedCost}`;

      setToastMessage(summary);

      setParkingSpots((prevSpots) =>
        prevSpots.map((spot) =>
          spot.id === parkingSession.spot.id ? { ...spot, available: true } : spot
        )
      );
    }

    if (reminderTimeout) {
      clearTimeout(reminderTimeout);
      setReminderTimeout(null);
    }

    setParkingSession(null);
    setSelectedSpot(null);
    setShowOverlay(false);
    setCurrentView('dashboard');
  };

  const handleDeparture = () => {
    handleEndParking();
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'registration':
        return <RegistrationView onRegister={handleRegister} />;
      case 'dashboard':
        return (
          <DashboardView
            user={user}
            parkingSpots={parkingSpots}
            parkingSession={parkingSession}
            co2Savings={co2Savings}
            setCurrentView={setCurrentView}
            vehicle={user?.vehicle}
          />
        );
              case 'rewards':
                return (
                  <RewardsView
                    userPoints={userPoints}
                    setUserPoints={setUserPoints}
                    onBack={() => setCurrentView('dashboard')}
                  />
                );


            case 'pdRouting':
      return (
        <PDRoutingView
          setCurrentView={setCurrentView}
          parkingSpots={parkingSpots}
        />
      );

      case 'findParking':
        return (
          <FindParkingView
            user={user}
            parkingSpots={parkingSpots}
            setCurrentView={setCurrentView}
            onSpotSelect={handleSpotSelect}
            onEndParking={handleEndParking}
            parkingSession={parkingSession}
          />
        );
      case 'ticket':
        return (
          <TicketView
            parkingSession={parkingSession}
            setCurrentView={setCurrentView}
            onArrival={handleArrival}
            onDeparture={handleDeparture}
          />
        );
      case 'co2Tracking':
        return (
          <CO2TrackingView
            co2Savings={co2Savings}
            filterPeriod={filterPeriod}
            setFilterPeriod={setFilterPeriod}
            onBack={() => setCurrentView('dashboard')}
          />
        );
      case 'profile':
        return (
          <div className="p-8 max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">👤 Profile</h2>
            <p className="mb-2"><strong>Name:</strong> {user?.name || 'N/A'}</p>
            <p className="mb-2"><strong>Vehicle:</strong> {user?.vehicle?.make || 'N/A'} {user?.vehicle?.model || ''} ({user?.vehicle?.type || 'N/A'})</p>
            <button
              className="mt-6 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
              onClick={() => setCurrentView('dashboard')}
            >
              ← Back to Dashboard
            </button>
          </div>
        );
case 'settings':
  return (
    <div className="p-8 max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">⚙️ Settings</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">Manage your preferences below:</p>

      {/* 🔥 Dark Mode Toggle */}
      <div className="flex items-center justify-center mb-6">
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="sr-only"
            />
            <div className={`w-10 h-4 rounded-full ${darkMode ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            <div
              className={`absolute top-0 left-0 w-4 h-4 bg-white rounded-full shadow transform transition-transform ${darkMode ? 'translate-x-6' : ''}`}
            ></div>
          </div>
          <span className="ml-3 text-gray-800 dark:text-gray-200 font-medium">Dark Mode</span>
        </label>
      </div>

      <button
        className="mt-6 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
        onClick={() => setCurrentView('dashboard')}
      >
        ← Back to Dashboard
      </button>
    </div>
  );

      default:
        return <RegistrationView onRegister={handleRegister} />;
    }
  };

  return (
      <div className={`font-sans min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} relative`}>
      {renderCurrentView()}
      {showOverlay && parkingSession && (
        <SessionOverlay
          parkingSession={parkingSession}
          onClick={() => {
            setCurrentView('ticket');
            setShowOverlay(false);
          }}
        />
      )}

      {toastMessage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setToastMessage('')}
        >
          <div
            className="bg-white bg-opacity-80 backdrop-blur-lg rounded-xl p-6 shadow-2xl max-w-md w-full text-center relative animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold focus:outline-none"
              onClick={() => setToastMessage('')}
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4 text-gray-800">Parking Summary</h3>
            <pre className="whitespace-pre-wrap text-gray-700 text-sm">{toastMessage}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
