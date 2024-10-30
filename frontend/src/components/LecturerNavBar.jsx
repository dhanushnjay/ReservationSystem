import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; 
import {
  FaClipboardList,
  FaBook,
  FaFlask,
  FaChalkboardTeacher,
} from "react-icons/fa";

const LecturerNavBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const sidebarRef = useRef(null);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); 
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (
      profileMenuRef.current &&
      !profileMenuRef.current.contains(event.target)
    ) {
      setProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex justify-between items-center p-5 bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg">
        <div className="flex items-center lg:px-7  sm:px-2">
          <button
            className="text-2xl focus:outline-none transition duration-300 transform hover:scale-110"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}{" "}
          </button>
        </div>
        <div className="relative lg:px-7 sm:px-2">
          <button
            className="text-white focus:outline-none transition duration-300 transform hover:scale-110 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 shadow-md"
            onClick={toggleProfileMenu}
            aria-label="Profile menu"
          >
            Profile
          </button>
          {profileMenuOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50 pb-2 pl-3"
              ref={profileMenuRef}
            >
              <ul className="pt-2 pb-0 ">
                <li
                  className="hover:bg-gray-200 cursor-pointer p-2 rounded transition duration-200"
                  onClick={() => navigate("/lecturer")}
                >
                  Notice Board
                </li>
                <li
                  className="hover:bg-gray-200 cursor-pointer p-2 rounded transition duration-200"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </li>
                <li
                  className="hover:bg-gray-200 cursor-pointer p-2 rounded transition duration-200"
                  onClick={() => navigate("/my-reservations")}
                >
                  My Reservations
                </li>
                <li
                  className="hover:bg-gray-200 cursor-pointer p-2 rounded transition duration-200"
                  onClick={() => navigate("/calendar")}
                >
                  Calendar
                </li>
                <li
                  className="hover:bg-red-500 text-black-700 cursor-pointer p-2 rounded transition duration-200"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div
        className={`fixed z-40 mt-20 left-0 top-0 w-64 max-h-72  bg-gray-800 text-white transition-transform duration-300 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        ref={sidebarRef}
      >
        <ul className="mt-16">
          <li
            className="p-4 flex items-center hover:bg-gray-600 cursor-pointer"
            onClick={() => navigate("/booking")}
          >
            <FaClipboardList className="mr-2" />
            Booking
          </li>
          <li
            className="p-4 flex items-center hover:bg-gray-600 cursor-pointer"
            onClick={() => navigate("/reservations")}
          >
            <FaBook className="mr-2" />
            Reservations
          </li>
          <li
            className="p-4 flex items-center hover:bg-gray-600 cursor-pointer"
            onClick={() => navigate("/labs")}
          >
            <FaFlask className="mr-2" /> 
            Labs
          </li>
          <li
            className="p-4 flex items-center hover:bg-gray-600 cursor-pointer"
            onClick={() => navigate("/lecture-halls")}
          >
            <FaChalkboardTeacher className="mr-2" />{" "}
            Lecture Halls
          </li>
        </ul>
      </div>
    </>
  );
};

export default LecturerNavBar;
