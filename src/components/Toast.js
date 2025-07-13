import React from 'react';

const Toast = ({ message, onClose }) => (
  <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300 z-50">
    {message}
    <button onClick={onClose} className="ml-4 underline text-white">Close</button>
  </div>
);

export default Toast;
