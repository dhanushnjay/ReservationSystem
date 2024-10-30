import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authAPI from '../api/auth';
import img1 from "../assets/logo.png";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await authAPI.login(username, password);
      console.log(response);
      sessionStorage.setItem("username", response.username);

      if (response.message === 'admin') {
        navigate('/admin');
      } else if (response.message === 'lecturer') {
        navigate('/lecturer');
      } else {
        setError('The username or password is incorrect');
      }
    } catch (error) {
      setError('The username or password is incorrect');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form onSubmit={handleSubmit} className="w-96 p-6 border-2 border-orange-600 rounded-lg bg-gray-100 shadow-md text-center">
        <div className="mb-4  ">
        <div className="mb-4 flex flex-col items-center">
    <img src={img1} alt="University Logo" className="w-24 h-24 mb-4"/>
        <h1 className="text-2xl text-black font-bold mb-2">Faculty of Technology</h1>
        <h2 className="text-xl text-orange-600 mb-4">University of Sri Jayewardenepura</h2>
    </div>

        </div>
        <div className="mb-4">
          <label className="block font-bold mb-1">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-4/5 p-3 border border-orange-600 rounded-md bg-gray-300 text-black outline-none text-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-1">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-4/5 p-3 border border-orange-600 rounded-md bg-gray-300 text-black outline-none text-lg"
          />
        </div>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <button type="submit" className="w-4/5 p-3 bg-orange-600 text-white text-lg rounded-md hover:bg-white hover:border hover:border-orange-600 hover:text-orange-600 transition-colors duration-200">
          LOG IN
        </button>
        <a href="/forgot-password" className="block mt-4 text-sm text-orange-600 hover:underline">Forget your password?</a>
      </form>
    </div>
  );
};

export default LoginPage;
