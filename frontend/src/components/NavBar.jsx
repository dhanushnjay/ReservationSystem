import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const sidebarRef = useRef(null);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); 
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
      setProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
        {/* Sidebar toggle button */}
        <button className="text-xl focus:outline-none" onClick={toggleSidebar}>
          {sidebarOpen ? 'X' : '☰'}
        </button>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded focus:outline-none"
            onClick={toggleProfileMenu}
          >
            Profile
          </button>
          {profileMenuOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-10"
              ref={profileMenuRef}
            >
              <ul>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => navigate('/notice-board')}>Notice Board</li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => navigate('/profile')}>Profile</li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => navigate('/my-reservations')}>My Reservations</li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => navigate('/calendar')}>Calendar</li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}
        ref={sidebarRef}
      >
        <ul className="flex flex-col p-4 space-y-2">
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={() => navigate('/booking')}>Booking</li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={() => navigate('/reservations')}>Reservations</li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={() => navigate('/labs')}>Labs</li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={() => navigate('/lecture-halls')}>Lecture Halls</li>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
