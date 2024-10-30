import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LecturerNavBar from '../components/LecturerNavBar';

const Labs = () => {
  const [labs, setLabs] = useState([]);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/labs');
        setLabs(response.data);
      } catch (error) {
        console.error('Error fetching labs:', error);
      }
    };

    fetchLabs();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen relative"> 
      <LecturerNavBar />
      <h1 className="text-3xl font-bold text-center mb-5">Laboratories</h1> 
      <div className="flex justify-center pt-10 px-10 z-10 ml-20"> 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-0">
          {labs.map((lab) => (
            <div
              key={lab._id}
              className="p-6 border border-gray-300 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl bg-white"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{lab.LabName}</h2>
              <p className="mb-1 text-gray-600">Department: {lab.Department}</p>
              <p className="text-gray-600">Capacity: {lab.Capacity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Labs;
