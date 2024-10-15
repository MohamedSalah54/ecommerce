import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaCheck } from 'react-icons/fa'; // Import Font Awesome icons
import { MyContext } from './MyContext';
import { useContext } from 'react';

const SignUpForm = () => {
  const {handleLogin} = useContext(MyContext)
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/users');
      const users = await response.json();
      const emailExists = users.some(user => user.email === email);

      if (emailExists) {
        setError('Email already exists. Please use a different email.');
        return;
      }

      const createUserResponse = await fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (createUserResponse.ok) {
        setSuccess('Registration successful!');
        handleLogin(email);
        setTimeout(() => navigate('/'), 2000);
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      {error && <p className="signup-error">{error}</p>}
      {success && <p className="signup-success">{success}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <FaUser className="icon" /> {/* Username icon */}
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <FaEnvelope className="icon" /> {/* Email icon */}
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <FaLock className="icon" /> {/* Password icon */}
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="form-group">
          <FaCheck className="icon" /> {/* Confirm Password icon */}
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </div>
        <button type="submit" className="signup-button1">Sign Up</button>
        <div className="signin-link">
          <p>Already have an account?</p>
          <a href="/login" className="signin-button1">Sign In</a>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
