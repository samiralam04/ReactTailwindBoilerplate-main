import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faB } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  // State to manage countdown
  const [countdown, setCountdown] = useState(10);

  // Function to handle the countdown
  const handleCountdown = () => {
    // Logic for countdown
    console.log('Countdown started!');
    // Example: Decrease countdown every second
    const countdownInterval = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    // Example: Stop countdown after 10 seconds
    setTimeout(() => {
      clearInterval(countdownInterval);
    }, 10000);
  };

  return (
    <nav className="navbar-bg w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Project Dashboard (left corner) */}
          <div className="flex items-center">
            {/* FontAwesome "B" icon */}
            <FontAwesomeIcon icon={faB} className="text-black text-2xl mr-2" />
            <span className="text-black font-bold text-lg">Project Dashboard</span>
          </div>
          {/* Search Bar and Button (right corner) */}
          <div className="hidden md:flex items-center">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search my storyboards"
              className="bg-gray-700 text-white rounded-md py-2 px-3 mr-2 focus:outline-none focus:bg-gray-600"
            />
            {/* Quick Start Button with Countdown */}
            <button
              className="bg-gray-700 text-white px-8 py-2 rounded-md text-sm font-medium relative flex items-center ml-2"
              onClick={handleCountdown}
            >
              {/* Countdown Display */}
              {countdown > 0 && (
                <span className="absolute left-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center animate-pulse text-xs  ml-2">
                  {countdown} {/* Countdown number */}
                </span>
              )}
              Quick Start
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
