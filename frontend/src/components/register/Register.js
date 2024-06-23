import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
// import logoImage from '../../images/images.png';
import tickImage from '../../images/remove.png';
import axios from 'axios';
import './Register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('register-page');
    return () => {
      document.body.classList.remove('register-page');
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    axios.post('http://localhost:8081/register', { name, email, password })
    .then(res => {
        if (res.data) {
          console.log("success");
          setShowModal(true);
        } 
      })
      .catch(err => console.log(err));
  }

  const handleClose = () => {
    setShowModal(false);
    navigate('/');
  };

  return (
    <div className="main-container">
      

      <div className="authform">
        <h3 className="authform-title">Register</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter Full Name"
            required
            onChange={e => setName(e.target.value)}
          />
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
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            required
            onChange={e => setConfirmPassword(e.target.value)}
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <a href="/">Login</a></p>
      </div>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <img src={tickImage} alt="Success" style={{ width: '100px', display: 'block', margin: '0 auto' }} />
          <p className="text-center"><h5><strong>Thank you for registration!</strong></h5>Your account has been successfully created.</p>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="primary" style={{ backgroundColor: 'rgb(0, 20, 220)', borderColor: 'rgb(0, 20, 220)' }} onClick={handleClose}>
            Click Ok to Proceed
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Register;
