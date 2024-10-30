import React, { useEffect, useState } from 'react';
import LecturerNavBar from '../components/LecturerNavBar';
import axios from 'axios';

const ProfilePage = () => {
  const [lecturer, setLecturer] = useState(null);
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    const fetchLecturer = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${username}`);
        setLecturer(response.data);
      } catch (error) {
        console.error('Error fetching lecturer:', error);
      }
    };

    fetchLecturer();
  }, [username]);

  if (!lecturer) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <LecturerNavBar />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Lecturer Profile</h1>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6">
            <h2 className="text-white text-2xl font-semibold">{lecturer.fullName}</h2>
            <p className="text-gray-200 text-sm">Username: {lecturer.username}</p>
          </div>
          <div className="p-6">
            <p className="text-lg mb-4"><strong>Email:</strong> {lecturer.email}</p>
            <p className="text-lg mb-4"><strong>Phone:</strong> {lecturer.phone}</p>
            <p className="text-lg mb-4"><strong>Department:</strong> {lecturer.department}</p>
            <p className="text-lg mb-4"><strong>Subject:</strong> {lecturer.subject}</p>
            <div className="flex justify-center mt-6">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition duration-300">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
