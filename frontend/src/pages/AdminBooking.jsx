import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavBar from "../components/AdminNavBar"; 

const AdminBooking = () => {
  const [bookingRequests, setBookingRequests] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null); 
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllBookingRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/bookingrequests");
        console.log(response.data); 
        setBookingRequests(response.data);
      } catch (error) {
        setError("Error fetching booking requests.");
        console.error("Error fetching booking requests:", error);
      }
    };

    fetchAllBookingRequests();
  }, []);

  const handleCardClick = (id) => {
    setExpandedCard(expandedCard === id ? null : id); 
  };

  const handleBookClick = (request) => {
    alert(`Booking confirmed for ${request.fullName}`);
  };

  return (
    <div className="page-content">
      <AdminNavBar className="w-full" /> 
      <div className="admin-booking-container bg-gray-100 rounded-lg flex flex-col items-center px-3">
        <h2 className="text-xl font-bold mb-4">All Booking Requests</h2>
        {error && <p className="text-red-600">{error}</p>}
        <div className="booking-requests flex flex-wrap justify-center gap-4 mt-5">
          {bookingRequests.length > 0 ? (
            bookingRequests.map((request) => (
              <div
                className={`booking-card border p-4 rounded-lg bg-white shadow-md transition-all cursor-pointer w-60 ${
                  expandedCard === request._id ? "bg-blue-100" : ""
                }`}
                key={request._id}
                onClick={() => handleCardClick(request._id)}
              >
                <h3 className="font-semibold">{request.fullName}</h3>
                <p>{request.email}</p>
                {expandedCard === request._id && (
                  <div className="expanded-details mt-2 p-2 border-t border-gray-300 bg-gray-50">
                    <p>
                      <strong>Phone:</strong> {request.phone}
                    </p>
                    <p>
                      <strong>Department:</strong> {request.department}
                    </p>
                    <p>
                      <strong>Number of Students:</strong> {request.numberOfStudents}
                    </p>
                    <p>
                      <strong>Room Type:</strong> {request.roomType}
                    </p>
                    <p>
                      <strong>Room:</strong> {request.room}
                    </p>
                    <p>
                      <strong>Date:</strong> {new Date(request.date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Duration:</strong> {request.duration}
                    </p>
                    <p>
                      <strong>Time Slot:</strong> {request.timeSlot}
                    </p>
                    <p>
                      <strong>Note:</strong> {request.note}
                    </p>
                    <button
                      className="book-button mt-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-black transition-transform"
                      onClick={(e) => {
                        e.stopPropagation(); 
                        handleBookClick(request);
                      }}
                    >
                      Book
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No booking requests found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBooking;
