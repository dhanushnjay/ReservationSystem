import React from 'react';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 text-center shadow-lg">
        <p className="text-gray-800 mb-4">{message}</p>
        <div className="flex justify-center mt-4">
          <button
            className="bg-white text-black border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 mr-2"
            onClick={onCancel}
          >
            Stay
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500"
            onClick={onConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
