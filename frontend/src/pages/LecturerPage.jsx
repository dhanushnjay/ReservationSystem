//This is the homepage for lecturers. Notice borad is appear in here
import React from 'react';
import LecturerNavBar from '../components/LecturerNavBar';
import NoticeBoard from '../components/NoticeBoard';
import './LecturerPage.css';

const LecturerPage = () => {
  return (
    <div className='lecturer-page'>
      <LecturerNavBar />
      <div className='lec-notice-board-conttainor'>
      <NoticeBoard isAdmin={false} />
      </div>
    </div>
  );
};

export default LecturerPage;
