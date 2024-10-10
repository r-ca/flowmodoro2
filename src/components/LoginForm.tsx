import React, { useState } from 'react';

interface LoginFormProps {
  onLoginSuccess: (token: string) => void;
  onRegisterClick: () => void;
}

const API_URL = 'http://localhost:3000/api';

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess, onRegisterClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        onLoginSuccess(data.token);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred while logging in');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
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
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Login
      </button>
      <p className="text-center">
        Don't have an account?{' '}
        <button type="button" onClick={onRegisterClick} className="text-blue-500 hover:underline">
          Register
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
