import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavBar from "../components/AdminNavBar"; 
import lecImage from "../assets/lec.png"; 

const AdminLectureHalls = () => {
  const [lectureHalls, setLectureHalls] = useState([]);
  const [activeTab, setActiveTab] = useState("LGF");

  useEffect(() => {
    const fetchLectureHalls = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/lecturehalls");
        setLectureHalls(response.data);
      } catch (error) {
        console.error("Error fetching lecture halls:", error);
      }
    };

    fetchLectureHalls();
  }, []);

  const renderLectureHalls = () => {
    return lectureHalls
      .filter((hall) => hall["Hall No"].startsWith(activeTab))
      .map((hall) => (
        <div key={hall._id} className="lecture-hall-card p-4 border border-gray-300 rounded shadow-md min-w-[250px] flex flex-col">
          <div className="image-container w-full h-36 overflow-hidden">
            <img src={lecImage} alt={`${hall["Hall No"]} Image`} className="w-full h-full object-cover" />
          </div>
          <h2 className="text-lg font-semibold mb-2">{hall["Hall No"]}</h2>
          <p className="text-sm mb-1">Capacity: {hall.Capacity}</p>
          <p className="text-sm mb-1">Multimedia Projector: {hall["Multimedia Projector"]}</p>
          <p className="text-sm mb-1">White Board: {hall["White Board"]}</p>
          <p className="text-sm mb-1">TV: {hall.TV}</p>
          <p className="text-sm mb-1">Wall Fans: {hall["Wall Fans"]}</p>
          <p className="text-sm mb-1">Ceiling Fans: {hall["Celling Fans"]}</p>
          <p className="text-sm">Speakers: {hall.Speakers}</p>
        </div>
      ));
  };

  return (
    <div className="page-content">
      <div className="admin-lecture-halls-container">
        <AdminNavBar />
        <div className="tabs flex justify-around mb-5">
          {["LGF", "GF", "FF", "SF"].map((tab) => (
            <button
              key={tab}
              className={`px-5 py-2 text-lg border-none cursor-pointer ${activeTab === tab ? "bg-blue-600 text-white" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="admin-lecture-halls-grid flex overflow-x-auto gap-5">
          {renderLectureHalls()}
        </div>
      </div>
    </div>
  );
};

export default AdminLectureHalls;
