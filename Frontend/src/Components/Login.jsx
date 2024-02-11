import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Something.css'

const Login = (props) => {
  const navigateTo = useNavigate();
    let [username,setUsername] = useState('');
    let [password,setPassword] = useState('');

    useEffect(()=> {
      props.setLogin(null);
    },[])

    let handleSubmit = async(event) => {
      props.setLoader(true);
        event.preventDefault();
        let response = await fetch('http://localhost:4500/api/login',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username,password})
        });
        let data = await response.json();
        console.log(data.token);
        if (data.token) {
          // Redirect to another page after successful login
          props.setLogin(data.token);
          props.setLoader(false);
          navigateTo('/viewAll') // Replace with the actual page URL
      } else {
          // Handle unsuccessful login, e.g., display an error message
          alert('Login failed');
          props.setLoader(false);
      }
    };


  return (
      <div className="form-container">
    <form onSubmit={handleSubmit} id="postForm">
        <h1 className='font-black text-center text-[50px]'>Login</h1>
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <button className='submit-btn' type="submit" style={{
          
    }}>Login</button>
    </div>
    <p><Link to='/register'>For a new account click here.</Link></p>
    </form>
    <div className="backgroundimg"></div>
    </div>
  )
}

export default Login
