import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AdminNavBar from '../components/AdminNavBar';
import axios from 'axios';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [reservations, setReservations] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');

  // Fetch reservations whenever date or selectedRoom changes
  useEffect(() => {
    const fetchReservations = async () => {
      const formattedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
      try {
        const response = await axios.get('http://localhost:5000/api/reservations', {
          params: { date: formattedDate, room: selectedRoom }, // Pass both date and room
        });
        setReservations(response.data);
      } catch (err) {
        console.error('Failed to fetch reservations:', err);
      }
    };

    fetchReservations();
  }, [date, selectedRoom]); // Depend on date and selectedRoom

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleRoomChange = (event) => {
    setSelectedRoom(event.target.value);
  };

  return (
    <div className="p-5">
      <AdminNavBar />
      <div className="mt-5">
        <h1 className="text-2xl font-bold">Admin Calendar</h1>
        <Calendar
          onChange={handleDateChange}
          value={date}
          className="max-w-md mx-auto"
        />
        <div className="mt-4">
          <label htmlFor="room" className="block mb-2">Select Room:</label>
          <select id="room" value={selectedRoom} onChange={handleRoomChange} className="border rounded p-2">
            <option value="">All Rooms</option>
            <option value="FF01">FF01</option>
            <option value="FF02">FF02</option>
            <option value="FF03">FF03</option>
          </select>
        </div>
        <div className="text-center mt-5 text-lg">
          <h2>Selected Date: {date.toLocaleDateString()}</h2>
          <h3 className="mt-3">Reservations for this date:</h3>
          {reservations.length === 0 ? (
            <p>No reservations found for this date and room.</p>
          ) : (
            reservations.map((reservation) => (
              <div className="border p-4 rounded mt-3" key={reservation._id}>
                <h4 className="font-semibold">{reservation.room}</h4>
                <p>{new Date(reservation.date).toLocaleDateString()}</p>
                <p>Time Slot: {reservation.timeSlot}</p>
                <p>Reserved by: {reservation.fullName}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
