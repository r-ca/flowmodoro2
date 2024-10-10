import React, { useState } from 'react';

interface RegisterFormProps {
  onRegisterSuccess: () => void;
}

const API_URL = 'http://localhost:3000/api';

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Registration successful! Please log in.');
        onRegisterSuccess();
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error registering:', error);
      alert('An error occurred while registering');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <div>
        <label htmlFor="username" className="block mb-1">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-1">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
