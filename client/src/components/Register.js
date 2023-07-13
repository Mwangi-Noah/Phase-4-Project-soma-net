import React, { useState } from 'react';


const Register = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (response.ok) {
        // Handle successful registration
        onRegister();
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form className="form" onSubmit={handleRegister}>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button type="submit" className="button">Register</button>
      </form>
    </div>
  );
};

export default Register;