import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Custom.css';

import axios from "axios";

import axiosClient from "../axiosClient";

const GetStartedPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [checkboxError, setCheckboxError] = useState('');
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isChecked, setIsChecked] = useState(false);


  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('getStartedData'));
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    localStorage.setItem('getStartedData', JSON.stringify(updatedData));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  let valid = true;

  setEmailError('');
  setPasswordError('');

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    setEmailError('Please enter a valid email address.');
    valid = false;
  }

  // Password validation
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(formData.password)) {
    setPasswordError('Password must be at least 8 characters long and include letters and numbers.');
    valid = false;
  } else if (formData.password !== formData.confirmPassword) {
    setPasswordError('Passwords do not match.');
    valid = false;
  }


  // Checkbox validation
  if (!isChecked) {
    setCheckboxError('You must agree to the Terms & Conditions.');
    valid = false;
  }

  if (valid) {
      navigate('/personal_info');
  }
};

const goBackLandingPage = () => navigate('/');

return (
    <div className='get-started-page'>
      <div className="logo-wrap">
        <img className="logo" src="/logo.png" alt="logo" />
      </div>
      <div className="page-wrap">
        <div className="progress-bar-wrap">
          <ul className='progress-bar'>
            <li><a className="active" href="#">1. Get started</a></li>
            <li><a href="#">2. Personal info</a></li>
            <li><a href="#">3. Setup store</a></li>
            <li><a href="#">4. Customise store</a></li>
            <li><a href="#">5. Payment & Billing</a></li>
            <li><a href="#">6. Profile Summary</a></li>
          </ul>
          <div className="mobile-progress-indicator">
            <span><b>1</b>/6</span>
          </div>
        </div>

        <div className="onboarding-page-content">
          <h1 className='main-title'>Get Started here</h1>
          <p className="caption">
            To get started with stock management on Stocker, please sign up by providing the following information.
          </p>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                className='form-control'
                type="email"
                name="email"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {emailError && <p className="error-message">{emailError}</p>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                className='form-control'
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                className='form-control'
                type="password"
                name='confirmPassword'
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {passwordError && <p className="error-message">{passwordError}</p>}
            </div>

            <div className="check-group">
              <input 
                type="checkbox" 
                onChange={(e) => setIsChecked(e.target.checked)}
                required/>
              <span>I aree to the <b>Terms & Conditions.</b></span><br/>
            </div>
            {checkboxError && <p className="warning-message">{checkboxError}</p>}


            <div className='form-actions'>
              <button className='primary-button' onClick={handleSubmit} type="submit">Next</button>
              <button onClick={goBackLandingPage} className='alternative-button' type="button">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetStartedPage;
