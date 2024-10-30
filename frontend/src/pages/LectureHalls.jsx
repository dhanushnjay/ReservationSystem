import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LecturerNavBar from '../components/LecturerNavBar'; 
import lecImage from '../assets/lec.png'; // Adjust the path based on your folder structure

const LectureHalls = () => {
  const [lectureHalls, setLectureHalls] = useState([]);
  const [activeTab, setActiveTab] = useState('LGF');

  useEffect(() => {
    const fetchLectureHalls = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/lecturehalls');
        setLectureHalls(response.data);
      } catch (error) {
        console.error('Error fetching lecture halls:', error);
      }
    };

    fetchLectureHalls();
  }, []);

  const renderLectureHalls = () => {
    return lectureHalls
      .filter(hall => hall['Hall No'].startsWith(activeTab))
      .map(hall => (
        <div key={hall._id} className="border border-gray-300 rounded-lg p-4 bg-gray-100 shadow-md">
          <img src={lecImage} alt="Lecture Hall" className="w-full h-32 object-cover rounded-lg mb-4" /> {/* Added image */}
          <h2 className="text-lg font-semibold mt-0">{hall['Hall No']}</h2>
          <p className="my-2">Capacity: {hall.Capacity}</p>
          <p className="my-2">Multimedia Projector: {hall['Multimedia Projector']}</p>
          <p className="my-2">White Board: {hall['White Board']}</p>
          <p className="my-2">TV: {hall.TV}</p>
          <p className="my-2">Wall Fans: {hall['Wall Fans']}</p>
          <p className="my-2">Ceiling Fans: {hall['Ceiling Fans']}</p>
          <p className="my-2">Speakers: {hall.Speakers}</p>
        </div>
      ));
  };

  return (
    <div>
      <LecturerNavBar />
      <div className="flex justify-around mb-5 px-4 py-3 mx-10">
        {['LGF', 'GF', 'FF', 'SF'].map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-lg ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-5 mt-1 mx-20">
        {renderLectureHalls()}
      </div>
    </div>
  );
};

export default LectureHalls;
