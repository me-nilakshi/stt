import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import logoImage from '../../images/Nayalogo.png';
import instagramLogo from '../../images/insta-white.png';
import linkedinLogo from '../../images/linkedin-icon.jpg';

import './home.css';

import axios from 'axios';

function Home() {
  // const [adminClicked, setAdminClicked] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Add class to body when component mounts
    document.body.classList.add('login-page');
    // Remove class from body when component unmounts
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:8081/', { email, password })
      .then((res) => {
        console.log(res);
        if (res.data === 'Login Successful') {
          navigate('/ticket-form');
        } else {
          alert('Login failed: ' + res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  // const handleAdminClick = () => {
  //   setAdminClicked(!adminClicked);
  // };

  
  return (

  <>
    <nav className="navbar">
      <a href="/admin" className="navbar-link" title="Go to Admin Page">Admin</a>
      {/* <a href="/ticket-form" className="navbar-link" title="Facing an issue!? Resolve it">Create Ticket</a> */}
    </nav>

    <div className="main-container">
      
      <h1 style={{ textAlign: 'center', marginBottom: '50px', width: '650px'}}>Welcome to Service Ticketing Tool!</h1>
      <div className="authform">

          <img src={require('../../images/logo.png')} alt="Logo" className="logo" />
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              required
              onChange={e => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              required
              onChange={e => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
          <p>Don't have an account? <a href="/register">Register</a></p>
        </div>

        <footer className="footer">
  <a href="https://www.instagram.com/slb_global/" target="_blank" rel="noreferrer">
    <div className="social-icon">
      <img src={instagramLogo} alt="Instagram" />
    </div>
  </a>
  <a href="https://www.linkedin.com/company/slbglobal/" target="_blank" rel="noreferrer">
    <div className="social-icon">
      <img src={linkedinLogo} alt="LinkedIn" />
    </div>
  </a>
</footer>



    </div>
    </>
  );
}

export default Home;
