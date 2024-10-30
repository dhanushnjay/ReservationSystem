import React, { useEffect, useState } from "react";
import AdminNavBar from "../components/AdminNavBar";
import axios from "axios";
import labImage from "../assets/lec.png"; 

const AdminLabs = () => {
  const [labs, setLabs] = useState([]);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/labs");
        setLabs(response.data);
      } catch (error) {
        console.error("Error fetching labs:", error);
      }
    };

    fetchLabs();
  }, []);

  return (
    <div className="page-content">
      <div className="admin-labs-page">
        <AdminNavBar />
        <div className="px-10 z-10">
        <h2 className="text-3xl font-bold text-center mt-8 mb-4">Labs</h2>
        <div className="labs-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5"> 
          {labs.map((lab) => (
            <div
              key={lab._id}
              className="lab-card bg-gray-100 border border-sky-600 rounded-lg p-4 shadow-lg flex flex-col items-center transition-transform duration-200 transform hover:scale-105" // Removed fixed width for responsive design
            >
              <img
                src={labImage}
                alt="Lab"
                className="lab-image w-4/5 rounded-lg mb-2"
              />
              <h3 className="text-lg font-medium mb-1">{lab.LabName}</h3>
              <p className="text-sm mb-1">Department: {lab.Department}</p>
              <p className="text-sm">Capacity: {lab.Capacity}</p>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLabs;
