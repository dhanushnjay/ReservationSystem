import React from 'react';
import LecturerNavBar from '../components/LecturerNavBar';

const ReservationsPage = () => {
  return (
    <div className="reservations-page min-h-screen flex flex-col">
      <LecturerNavBar />
      <div className="content flex-grow p-5">
        <h1 className="text-3xl font-bold mb-4">Reservations</h1>
      </div>
    </div>
  );
};

export default ReservationsPage;
