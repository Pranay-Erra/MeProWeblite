import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const nav=useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        toast('Login successful!');
        console.log('User:', data.user);
        // Redirect or store token here if needed
        nav('/home')
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p>Login to your account</p>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            value={credentials.email}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            required
            placeholder="********"
            value={credentials.password}
            onChange={handleChange}
          />

          <button type="submit">Login</button>
          <div className="login-footer">
            <span>Don't have an account? </span>
            <a href="/register">Register here</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
