import React from 'react';
import LecturerNavBar from '../components/LecturerNavBar';
import NoticeBoard from '../components/NoticeBoard';

const LecturerPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <LecturerNavBar />
      <div className="container mx-auto py-8">
        <NoticeBoard isAdmin={false} />
      </div>
    </div>
  );
};

export default LecturerPage;
