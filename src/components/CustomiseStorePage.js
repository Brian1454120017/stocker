import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Custom.css";

const CustomizeStorePage = () => {


   
  // Initialize state with saved values or empty strings
  const [formData, setFormData] = useState({
      logoImage: "",
      bannerImage: "",
      storeCustomURL: "",
  });

  // Load data from localStorage when the component mounts
  useEffect(() => {
      const savedData = JSON.parse(localStorage.getItem("customiseStoreData"));
      if (savedData) {
          setFormData(savedData);
      }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
      const { name, value } = e.target;
      const updatedData = { ...formData, [name]: value };

      setFormData(updatedData); // Update state
      localStorage.setItem("customiseStoreData", JSON.stringify(updatedData)); // Save to localStorage
  };

  const navigate = useNavigate();

  const goBackToSetupStorePage = () => {
    navigate('/setup_store');
  };

  // Navigate to Payment and Billing Page
  const goToPaymentAndBillingPage = () => {
    navigate("/payment_and_billing");
  };

  // State for Drag and Drop Uploads
  const [logoImage, setLogoImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);

  // Drag and Drop Handlers
  const handleDrop = (event, setImage) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    }
  };

  const handleFileChange = (event, setImage) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="customise-store-page">
       <div className="logo-wrap">
           <img className="logo" src="/logo.png" alt="logo" />
        </div>
      <div className="page-wrap">
        {/* Progress Bar */}
        <div className="progress-bar-wrap">
          <ul className="progress-bar">
            <li><a className="active" href="/get_started">1. Get started</a></li>
            <li><a className="active" href="personal_info">2. Personal info</a></li>
            <li><a className="active" href="setup_store">3. Setup store</a></li>
            <li><a className="active" href="#">4. Customise store</a></li>
            <li><a href="#">5. Payment & Billing</a></li>
            <li><a href="#">6. Profile Summary</a></li>
          </ul>
          <div className="mobile-progress-indicator">
              <span><b>4</b>/6</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="onboarding-page-content">
          <h1 className="main-title">Customise Your Store</h1>
          <p className="caption">
            Personalise your store (Optional), tailor your store's look and feel, or skip this step and do it later.
          </p>
          <form className="form">
            {/* Drag and Drop Areas */}
            <div className="form-group-small-wrap">

              {/* Store Logo */}
              <div className="form-group-small">
                <label>Store's logo (Optional)</label>
                <input 
                  className="mobile-file-input" 
                  type="file" 
                  name="logoImage" 
                  accept="image/*" 
                  onChange={(event) => handleFileChange(event, setLogoImage)} 
                  value={formData.logoImage} 
                />
                <div className="drag-drop-area-logo" onDrop={(event) => handleDrop(event, setLogoImage)} onDragOver={handleDragOver}>
                  <img className="upload-icon" src="/assets/icons/upload.svg" alt="upload icon"/>
                  <p>Choose file or drag and drop.</p>
                  <label className="custom-file-input">
                    Choose file
                    <input 
                      className="file-input" 
                      type="file" 
                      name="logoImage" 
                      accept="image/*" 
                      onChange={(event) => handleFileChange(event, setLogoImage)} 
                      value={formData.logoImage} 
                    />
                  </label>
                </div>
                {logoImage && <p>Uploaded: {logoImage.name}</p>}
              </div>

              {/* Store Logo */}
              <div className="form-group-small">
                <label>Store's banner (Optional)</label>
                <input 
                  className="mobile-file-input"  
                  type="file" 
                  name="bannerImage" 
                  accept="image/*" 
                  onChange={(event) => handleFileChange(event, setBannerImage)} 
                  value={formData.bannerImage}
                />
                <div className="drag-drop-area-banner" onDrop={(event) => handleDrop(event, setBannerImage)} onDragOver={handleDragOver}>
                <img className="upload-icon" src="/assets/icons/upload.svg" alt="upload icon"/>
                  <p>Choose file or drag and drop.<br/><span>jpeg,jpg and png format up 10mb</span></p>
                  <label className="custom-file-input">
                    Choose file
                    <input 
                      className="file-input"  
                      type="file" 
                      name="bannerImage" 
                      accept="image/*" 
                      onChange={(event) => handleFileChange(event, setBannerImage)} 
                      value={formData.bannerImage}
                    />
                  </label>
                </div>
                {bannerImage && <p>Uploaded: {bannerImage.name}</p>}
              </div>
            </div>

            <div className="form-group">
              <label>Store URL (Optional)</label>
              <input 
                className="form-control" 
                type="text" name="storeCustomURL" 
                placeholder="Custom URL (e.g. mysite.com/jenifersclothingstore)" 
                value={formData.storeCustomURL} 
                onChange={handleChange}
              />
            </div>

            <div className="form-actions">
              <div className="button-group">
                <button className="primary-button" type="submit">Continue</button>
                <button className="secondary-button" onClick={(event) => {event.preventDefault(); goToPaymentAndBillingPage();}}type="button">Skip</button>
              </div>
              <button className="alternative-button" onClick={goBackToSetupStorePage} type="button">Back</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomizeStorePage;
