import React, { useState, useEffect } from 'react';
import LecturerNavBar from '../components/LecturerNavBar';
import axios from 'axios';

const LecturerBookingPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    numberOfStudents: '',
    roomType: '',
    room: '',
    date: '',
    duration: '',
    timeSlot: '',
    note: '',
  });

  const [bookingRequests, setBookingRequests] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const username = sessionStorage.getItem('username');

  useEffect(() => {
    const fetchLecturerData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${username}`);
        setFormData({
          ...formData,
          fullName: response.data.fullName,
          email: response.data.email,
          phone: response.data.phone,
          department: response.data.department,
        });
      } catch (error) {
        console.error('Error fetching lecturer data:', error);
      }
    };

    fetchLecturerData();
  }, [username]);

  useEffect(() => {
    const fetchBookingRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/bookingrequests?username=${username}`);
        setBookingRequests(response.data);
      } catch (error) {
        console.error('Error fetching booking requests:', error);
      }
    };

    fetchBookingRequests();
  }, [username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoomTypeChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, roomType: value, room: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://localhost:5000/api/bookingrequests', {
        ...formData,
        username
      });
      setShowModal(true);
      setFormData({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
        numberOfStudents: '',
        roomType: '',
        room: '',
        date: '',
        duration: '',
        timeSlot: '',
        note: '',
      });
      const response = await axios.get(`http://localhost:5000/api/bookingrequests?username=${username}`);
      setBookingRequests(response.data);
      fullName("");
    } catch (error) {
      setError('Failed to submit booking request.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="w-full h-full bg-gray-100">
      <LecturerNavBar />
      <div className="mb-10 p-8 flex flex-col items-center">
        <h2 className="text-center text-2xl font-bold mb-5">Book a Room</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white p-6 rounded shadow-md space-y-4">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 px-2">
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Full Name:</label>
                <input type="text" name="fullName" value={formData.fullName} readOnly className="w-full p-2 border border-gray-400 rounded" />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Email:</label>
                <input type="email" name="email" value={formData.email} readOnly className="w-full p-2 border border-gray-400 rounded" />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Phone:</label>
                <input type="tel" name="phone" value={formData.phone} readOnly className="w-full p-2 border border-gray-400 rounded" />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Department:</label>
                <input type="text" name="department" value={formData.department} readOnly className="w-full p-2 border border-gray-400 rounded" />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Number of Students:</label>
                <input type="number" name="numberOfStudents" value={formData.numberOfStudents} onChange={handleChange} required className="w-full p-2 border border-gray-400 rounded" />
              </div>
            </div>
            <div className="w-full md:w-1/2 px-2">
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Lecture Hall or Lab:</label>
                <select name="roomType" value={formData.roomType} onChange={handleRoomTypeChange} required className="w-full p-2 border border-gray-400 rounded">
                  <option value="">Select Type</option>
                  <option value="Lecture Hall">Lecture Hall</option>
                  <option value="Lab">Lab</option>
                </select>
              </div>
              {formData.roomType && (
                <div className="mb-4">
                  <label className="block mb-1 font-semibold">{formData.roomType}:</label>
                  <select name="room" value={formData.room} onChange={handleChange} required className="w-full p-2 border border-gray-400 rounded">
                    <option value="">Select {formData.roomType}</option>
                    {formData.roomType === 'Lecture Hall' && (
                      <>
                        <option value="FF01">FF01</option>
                        <option value="FF02">FF02</option>
                        <option value="FF03">FF03</option>
                      </>
                    )}
                    {formData.roomType === 'Lab' && (
                      <>
                        <option value="ICT Common Lab 1">ICT Common Lab 1</option>
                        <option value="ICT Common Lab 2">ICT Common Lab 2</option>
                        <option value="Multimedia Lab">Multimedia Lab</option>
                      </>
                    )}
                  </select>
                </div>
              )}
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Date:</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full p-2 border border-gray-400 rounded" />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Select Duration:</label>
                <select name="duration" value={formData.duration} onChange={handleChange} required className="w-full p-2 border border-gray-400 rounded">
                  <option value="">Select Duration</option>
                  <option value="1 hour">1 hour</option>
                  <option value="2 hours">2 hours</option>
                </select>
              </div>
              {formData.duration && (
                <div className="mb-4">
                  <label className="block mb-1 font-semibold">Select Time Slot:</label>
                  <select name="timeSlot" value={formData.timeSlot} onChange={handleChange} required className="w-full p-2 border border-gray-400 rounded">
                    <option value="">Select Time Slot</option>
                    {formData.duration === '1 hour' && (
                      <>
                        <option value="8:00-9:00">8:00-9:00</option>
                        <option value="9:00-10:00">9:00-10:00</option>
                        <option value="10:00-11:00">10:00-11:00</option>
                        <option value="11:00-12:00">11:00-12:00</option>
                        <option value="1:00-2:00">1:00-2:00</option>
                        <option value="2:00-3:00">2:00-3:00</option>
                        <option value="3:00-4:00">3:00-4:00</option>
                        <option value="4:00-5:00">4:00-5:00</option>
                        <option value="5:00-6:00">5:00-6:00</option>
                      </>
                    )}
                    {formData.duration === '2 hours' && (
                      <>
                        <option value="8:00-10:00">8:00-10:00</option>
                        <option value="10:00-12:00">10:00-12:00</option>
                        <option value="1:00-3:00">1:00-3:00</option>
                        <option value="3:00-5:00">3:00-5:00</option>
                      </>
                    )}
                  </select>
                </div>
              )}
              <div>
                <label className="block mb-1 font-semibold">Special Note:</label>
                <textarea name="note" value={formData.note} onChange={handleChange} className="w-full p-2 border border-gray-400 rounded"></textarea>
              </div>
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Submit</button>
        </form>
      </div>

      <div className="mb-10 p-8">
        <h2 className="text-center text-2xl font-bold mb-5">My Booking Requests</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow-md">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Time Slot</th>
                <th className="px-4 py-2 border">Room</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookingRequests.map((request) => (
                <tr key={request.id}>
                  <td className="px-4 py-2 border">{request.date}</td>
                  <td className="px-4 py-2 border">{request.timeSlot}</td>
                  <td className="px-4 py-2 border">{request.room}</td>
                  <td className="px-4 py-2 border">{request.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md text-center">
            <h2 className="text-xl font-bold mb-4">Booking Request Submitted</h2>
            <p>Your booking request has been submitted successfully!</p>
            <button onClick={handleCloseModal} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LecturerBookingPage;
