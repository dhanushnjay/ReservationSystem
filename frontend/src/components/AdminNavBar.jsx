import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNavBar = () => {
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
      <div className="flex justify-between items-center p-4 bg-gray-800 text-white lg:px-14">
        <div className="navbar-left">
          <button
            className="text-xl focus:outline-none"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? 'X' : '☰'}
          </button>
        </div>
        <div className="navbar-right relative">
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded focus:outline-none"
            onClick={toggleProfileMenu}
          >
            Profile
          </button>
          {profileMenuOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg"
              ref={profileMenuRef}
            >
              <ul>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => navigate('/admin')}>Notice Board</li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => navigate('/admin-profile')}>Profile</li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => navigate('/my-reservations')}>My Reservations</li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => navigate('/calendar')}>Calendar</li>
                <li className="px-4 py-2 hover:bg-red-500 cursor-pointer" onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className={`z-40 sidebar ${sidebarOpen ? 'fixed' : 'hidden'} bg-gray-800 text-white`} ref={sidebarRef}>
        <ul className="flex flex-col p-4">
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={() => navigate('/admin-booking')}>Booking</li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={() => navigate('/reservation-requests')}>Reservation Requests</li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={() => navigate('/admin-labs')}>Labs</li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={() => navigate('/admin-lecture-halls')}>Lecture Halls</li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={() => navigate('/lectures')}>Lectures</li>
        </ul>
      </div>
    </>
  );
};

export default AdminNavBar;
