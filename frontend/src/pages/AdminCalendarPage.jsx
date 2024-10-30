import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AdminCalendarPage.css';
import AdminNavBar from '../components/AdminNavBar';
import axios from 'axios';

const AdminCalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [reservations, setReservations] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');

  // Fetch reservations whenever date or selectedRoom changess
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
    <div className="admin-calendar-page">
      <AdminNavBar />
      <div className="content">
        <h1>Admin Calendar</h1>
        <Calendar
          onChange={handleDateChange}
          value={date}
          className="calendar"
        />
        <div className="room-selection">
          <label htmlFor="room">Select Room: </label>
          <select id="room" value={selectedRoom} onChange={handleRoomChange}>
            <option value="">All Rooms</option>
            <option value="FF01">FF01</option>
            <option value="FF02">FF02</option>
            <option value="FF03">FF03</option>
          </select>
        </div>
        <div className="selected-date">
          <h2>Selected Date: {date.toLocaleDateString()}</h2>
          <h3>Reservations for this date:</h3>
          {reservations.length === 0 ? (
            <p>No reservations found for this date and room.</p>
          ) : (
            reservations.map((reservation) => (
              <div className="reservation-card" key={reservation._id}>
                <h4>{reservation.room}</h4>
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

export default AdminCalendarPage;
