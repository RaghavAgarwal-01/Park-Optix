import React, { useState } from 'react';

const RewardsView = ({ userPoints, setUserPoints, onBack }) => {
  const [popup, setPopup] = useState(null);

  const handleRedeem = (cost, rewardName) => {
    if (userPoints >= cost) {
      setUserPoints(prev => prev - cost);
      setPopup(`🎉 Coupon "${rewardName}" collected successfully!`);
    } else {
      setPopup(`❌ Not enough points for "${rewardName}". You have ${userPoints} points.`);
    }
  };

  const coupons = [
    { name: '$5 Off Walmart Groceries', cost: 500 },
    { name: 'Free Walmart Pickup Fee', cost: 300 },
    { name: '10% Off Electronics', cost: 1000 },
  ];

  return (
    <div className="p-8 max-w-md mx-auto text-center relative">
      <h2 className="text-3xl font-bold mb-6 text-yellow-500">🎁 Rewards</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300 text-lg">
        Your Eco Points: <span className="font-bold text-green-600">{userPoints}</span>
      </p>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">🎟 Redeemable Coupons</h3>
        <ul className="space-y-4 text-left">
          {coupons.map(coupon => (
            <li
              key={coupon.name}
              className="p-4 rounded border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
              onClick={() => handleRedeem(coupon.cost, coupon.name)}
            >
              <strong>{coupon.name}</strong> – {coupon.cost} Points
            </li>
          ))}
        </ul>
      </div>

      <button
        className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
        onClick={onBack}
      >
        ← Back to Dashboard
      </button>

      {/* Popup */}
      {popup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setPopup(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-2xl max-w-sm w-full text-center relative animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 text-xl font-bold focus:outline-none"
              onClick={() => setPopup(null)}
            >
              &times;
            </button>
            <p className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">{popup}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardsView;
