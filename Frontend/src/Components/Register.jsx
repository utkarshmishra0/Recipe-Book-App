import { useNavigate, Link } from 'react-router-dom';
import React, { useState } from 'react';
import './Something.css';

const Register = (props) => {
  const navigateTo = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [gmail, setGmail] = useState('');

  const handleSubmit = async () => {
    // Remove the invalid useNavigate call from here
    props.setLoader(true);
    let response = await fetch('http://localhost:4500/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, gmail }),
    });
    let data = await response.json();
    console.log(data);
    if (data.token) {
      props.setLogin(data.token);
      navigateTo('/viewAll');
      props.setLoader(false);
    } else {
      // Handle unsuccessful registration, e.g., display an error message
      alert('Registration failed');
      props.setLoader(false);
    }
  };

  return (
    <div className="form-container">
      <div id="postForm">
        <h1 className="font-black text-center text-[50px]">Register</h1>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="gmail">Gmail:</label>
        <input type="text" id="email" value={gmail} onChange={(e) => setGmail(e.target.value)} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button type="submit" onClick={handleSubmit}>
            Register
          </button>
          <br />
        </div>

        <p>
        <Link to="/login">already have an account? click here.</Link>
        </p>
      </div>
      <div className="backgroundimg"></div>
    </div>
  );
};

export default Register;