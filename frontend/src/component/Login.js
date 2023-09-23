import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  }, []);

  const collectData = async () => {
    let result = await fetch('http://localhost:1000/login', {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    result = await result.json();
    if (result.name) {
      localStorage.setItem('user', JSON.stringify(result));
      navigate('/');
    } else {
      alert('Incorrect username and password');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Login Form</h1>
        <label className="block mb-2">Your Email</label>
        <input
          type="text"
          placeholder="Your Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        />
        <label className="block mt-4 mb-2">Your Password</label>
        <input
          type="password"
          placeholder="Your Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        />
        <button
          type="button"
          onClick={collectData}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
        >
          Login
        </button>
        <p className="mt-4">
          Don't have an account?{' '}
          <Link to="/sign" className="text-blue-500 hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
