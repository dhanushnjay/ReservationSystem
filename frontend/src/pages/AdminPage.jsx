import React from 'react';
import AdminNavBar from '../components/AdminNavBar';
import NoticeBoard from '../components/NoticeBoard';

const AdminPage = () => {
  return (
    <div className='page-content'>
      <AdminNavBar />
      <br/><br/><br/>
      <NoticeBoard isAdmin={true} />
    </div>
  );
};

export default AdminPage;
