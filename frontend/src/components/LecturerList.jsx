import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ConfirmationModal from './ConfirmationModal';

const LecturerList = () => {
  const [lecturers, setLecturers] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [lecturerToRemove, setLecturerToRemove] = useState(null);

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        const filteredLecturers = response.data.filter(user => user.role !== 'admin');
        setLecturers(filteredLecturers);
      } catch (error) {
        console.error('Error fetching lecturers:', error);
      }
    };

    fetchLecturers();
  }, []);

  const handleEditClick = (lecturer) => {
    setSelectedLecturer(lecturer);
    setEditModalOpen(true);
  };

  const handleRemoveClick = (lecturer) => {
    setLecturerToRemove(lecturer);
    setConfirmModalOpen(true);
  };

  const handleConfirmRemove = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${lecturerToRemove._id}`);
      setLecturers(lecturers.filter(lecturer => lecturer._id !== lecturerToRemove._id));
      setConfirmModalOpen(false);
      setLecturerToRemove(null);
    } catch (error) {
      console.error('Error removing lecturer:', error);
    }
  };

  const handleModalClose = () => {
    setEditModalOpen(false);
    setSelectedLecturer(null);
  };

  const handleConfirmCancel = () => {
    setConfirmModalOpen(false);
    setLecturerToRemove(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
      {lecturers.length === 0 ? (
        <p>No lecturers found.</p>
      ) : (
        lecturers.map((lecturer) => (
          <div key={lecturer._id} className="bg-white border border-orange-500 rounded-lg p-5 shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg flex flex-col">
            <h3 className="text-orange-500 text-lg mb-2">{lecturer.fullName}</h3>
            <p className="text-gray-700">Email: {lecturer.email}</p>
            <p className="text-gray-700">Phone: {lecturer.phone}</p>
            <p className="text-gray-700">Department: {lecturer.department}</p>
            <p className="text-gray-700">Subject: {lecturer.subject}</p>
            <div className="mt-4">
              <button 
                className="mr-2 px-3 py-2 bg-orange-500 text-white rounded hover:bg-black transition"
                onClick={() => handleEditClick(lecturer)}
              >
                Edit
              </button>
              <button 
                className="px-3 py-2 bg-orange-500 text-white rounded hover:bg-black transition"
                onClick={() => handleRemoveClick(lecturer)}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
      {editModalOpen && selectedLecturer && (
        <EditLecturerModal 
          lecturer={selectedLecturer} 
          onClose={handleModalClose} 
          onUpdate={(updatedLecturer) => {
            setLecturers(lecturers.map(lecturer => 
              lecturer._id === updatedLecturer._id ? updatedLecturer : lecturer
            ));
            handleModalClose();
          }} 
        />
      )}
      {confirmModalOpen && (
        <ConfirmationModal 
          message="Are you sure you want to remove?" 
          onConfirm={handleConfirmRemove} 
          onCancel={handleConfirmCancel} 
        />
      )}
    </div>
  );
};

const EditLecturerModal = ({ lecturer, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({ ...lecturer });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${lecturer._id}`, formData);
      onUpdate(response.data);
    } catch (error) {
      console.error('Error updating lecturer:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white p-6 rounded-lg w-90 max-w-lg shadow-md">
        <h2 className="text-orange-500 text-xl mb-4">Edit Lecturer</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="font-bold mt-2">Full Name:
            <input 
              type="text" 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleChange} 
              required 
              className="border border-gray-300 p-2 rounded"
            />
          </label>
          <label className="font-bold mt-2">Email:
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              className="border border-gray-300 p-2 rounded"
            />
          </label>
          <label className="font-bold mt-2">Phone:
            <input 
              type="text" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              required 
              className="border border-gray-300 p-2 rounded"
            />
          </label>
          <label className="font-bold mt-2">Department:
            <input 
              type="text" 
              name="department" 
              value={formData.department} 
              onChange={handleChange} 
              required 
              className="border border-gray-300 p-2 rounded"
            />
          </label>
          <label className="font-bold mt-2">Subject:
            <input 
              type="text" 
              name="subject" 
              value={formData.subject} 
              onChange={handleChange} 
              required 
              className="border border-gray-300 p-2 rounded"
            />
          </label>
          <label className="font-bold mt-2">Username:
            <input 
              type="text" 
              name="username" 
              value={formData.username} 
              onChange={handleChange} 
              required 
              className="border border-gray-300 p-2 rounded"
            />
          </label>
          <label className="font-bold mt-2">Password:
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              className="border border-gray-300 p-2 rounded"
            />
          </label>
          <label className="font-bold mt-2">Role:
            <select 
              name="role" 
              value={formData.role} 
              onChange={handleChange} 
              required 
              className="border border-gray-300 p-2 rounded"
            >
              <option value="lecturer">Lecturer</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <button type="submit" className="mt-4 bg-orange-500 text-white p-2 rounded hover:bg-black transition">Save Changes</button>
          <button type="button" className="mt-2 bg-white text-orange-500 border border-orange-500 p-2 rounded hover:bg-orange-500 hover:text-white transition" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default LecturerList;
