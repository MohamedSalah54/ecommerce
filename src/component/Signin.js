import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa'; // Import Font Awesome icons
import { useContext } from 'react';
import { MyContext } from './MyContext';

const SignInForm = () => {
  const {handleLogin} = useContext(MyContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/users');
      const users = await response.json();

      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        handleLogin(email);
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="signin-container">
      <h2 className="signin-title">Sign In</h2>
      {error && <p className="signin-error">{error}</p>}
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="form-group">
          <FaUser className="icon" /> {/* Account icon */}
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
          <FaLock className="icon" /> {/* Lock icon */}
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="signin-button">Sign In</button>
        <div className="signup-link">
          <p>Don't have an account?</p>
          <a href="/signup" className="signup-button">Sign Up</a>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
