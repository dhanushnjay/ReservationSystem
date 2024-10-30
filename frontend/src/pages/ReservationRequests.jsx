import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavBar from "../components/AdminNavBar";

const ReservationRequests = () => {
  const [bookingRequests, setBookingRequests] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllBookingRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/bookingrequests"
        );
        setBookingRequests(response.data);
      } catch (error) {
        setError("Error fetching booking requests.");
        console.error("Error fetching booking requests:", error);
      }
    };

    fetchAllBookingRequests();
  }, []);

  const handleBookClick = (request) => {
    alert(`Booking confirmed for ${request.fullName}`);
  };

  return (
    <div className="page-content ">
      <div className="admin-booking-container ">
        <AdminNavBar className="w-full" />
        <div className="px-8 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">All Booking Requests</h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <div className="booking-requests grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookingRequests.length > 0 ? (
            bookingRequests.map((request) => (
              <div
                key={request._id}
                className="booking-card border p-4 rounded-lg shadow-lg bg-white"
              >
                <h3 className="text-lg font-semibold text-gray-800">{request.fullName}</h3>
                <p className="text-gray-600">{request.email}</p>
                <div className="expanded-details mt-3 pt-3 border-t border-gray-300">
                  <p><strong>Phone:</strong> {request.phone}</p>
                  <p><strong>Department:</strong> {request.department}</p>
                  <p><strong>Number of Students:</strong> {request.numberOfStudents}</p>
                  <p><strong>Room Type:</strong> {request.roomType}</p>
                  <p><strong>Room:</strong> {request.room}</p>
                  <p><strong>Date:</strong> {new Date(request.date).toLocaleDateString()}</p>
                  <p><strong>Duration:</strong> {request.duration}</p>
                  <p><strong>Time Slot:</strong> {request.timeSlot}</p>
                  <p><strong>Note:</strong> {request.note}</p>
                  <button
                    className="book-button mt-3 px-4 py-2 bg-sky-500 text-white rounded hover:bg-green-600 transition-colors"
                    onClick={() => handleBookClick(request)}
                  >
                    Book
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No booking requests found.</p>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationRequests;
