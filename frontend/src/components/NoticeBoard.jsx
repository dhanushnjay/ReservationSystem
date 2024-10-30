import React, { useEffect, useState } from 'react';
import noticeAPI from '../api/notice';

const NoticeBoard = ({ isAdmin }) => {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [noticeToDelete, setNoticeToDelete] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      const data = await noticeAPI.getAllNotices();
      setNotices(data);
    };

    fetchNotices();
  }, [notices]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await noticeAPI.updateNotice(editId, title, content);
        setEditId(null);
      } else {
        await noticeAPI.createNotice(title, content);
      }
      setTitle('');
      setContent('');
      setShowAddForm(false);
    } catch (error) {
      console.error('Error submitting notice:', error);
    }
  };

  const handleEdit = (notice) => {
    setTitle(notice.title);
    setContent(notice.content);
    setEditId(notice._id);
    setShowEditPopup(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await noticeAPI.updateNotice(editId, title, content);
      setEditId(null);
      setTitle('');
      setContent('');
      setShowEditPopup(false);
    } catch (error) {
      console.error('Error updating notice:', error);
    }
  };

  const handleDelete = async () => {
    try {
      if (noticeToDelete) {
        await noticeAPI.deleteNotice(noticeToDelete._id);
        setShowDeleteConfirm(false);
        setNoticeToDelete(null);
      }
    } catch (error) {
      console.error('Error deleting notice:', error);
    }
  };

  const showDeleteConfirmation = (notice) => {
    setNoticeToDelete(notice);
    setShowDeleteConfirm(true);
  };

  const hideDeleteConfirmation = () => {
    setShowDeleteConfirm(false);
    setNoticeToDelete(null);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  return (
    <div className="flex flex-col items-center mx-auto w-4/5">
      <h2 className="text-2xl font-bold mb-4">Notice Board</h2>
      <div className="flex flex-col gap-5 w-full max-w-xl">
        {notices.map(notice => (
          <div key={notice._id} className="bg-gray-100 border border-orange-600 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-semibold mb-2">{notice.title}</h3>
            <p className="whitespace-pre-wrap">{notice.content}</p>
            {isAdmin && (
              <div className="flex justify-end mt-2">
                <button className="border border-orange-600 bg-white text-orange-600 px-3 py-1 rounded-md hover:bg-gray-200" onClick={() => handleEdit(notice)}>Edit</button>
                <button className="bg-orange-600 text-white px-3 py-1 rounded-md ml-2 hover:bg-black" onClick={() => showDeleteConfirmation(notice)}>Delete</button>
              </div>
            )}
          </div>
        ))}
        {notices.length > 0 && isAdmin && !showAddForm && (
          <button className="bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl hover:bg-black" onClick={toggleAddForm}>+</button>
        )}
      </div>

      {notices.length === 0 && isAdmin && !showAddForm && (
        <button className="bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl hover:bg-black" onClick={toggleAddForm}>+</button>
      )}

      {showAddForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-md text-center max-w-md w-full">
            <h3 className="text-lg font-bold mb-5">{editId ? 'Edit Notice' : 'Add Notice'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1">Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-4/5 p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Content:</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} required className="w-4/5 p-2 border border-gray-300 rounded-md" />
              </div>
              <button type="submit" className="bg-orange-600 text-white px-5 py-2 rounded-md mr-2 hover:bg-black">
                {editId ? 'Update Notice' : 'Add Notice'}
              </button>
              <button type="button" className="border border-black bg-white text-black px-5 py-2 rounded-md hover:bg-gray-200" onClick={() => setShowAddForm(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-md text-center max-w-md w-full">
            <p className="mb-4">Are You Sure You Want to Delete?</p>
            <button className="border border-orange-600 bg-white text-orange-600 px-5 py-2 rounded-md mr-2 hover:bg-gray-200" onClick={hideDeleteConfirmation}>Stay</button>
            <button className="bg-orange-600 text-white px-5 py-2 rounded-md hover:bg-black" onClick={handleDelete}>Yes</button>
          </div>
        </div>
      )}

      {showEditPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-md text-center max-w-md w-full">
            <h3 className="text-lg font-bold mb-5">Edit Notice</h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block mb-1">Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-4/5 p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Content:</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} required className="w-4/5 p-2 border border-gray-300 rounded-md" />
              </div>
              <button type="submit" className="bg-orange-600 text-white px-5 py-2 rounded-md hover:bg-black">Update Notice</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeBoard;
