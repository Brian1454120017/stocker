import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../Custom.css';

const SetupStorePage = () => {
    const navigate = useNavigate();

    // INITIALIZE STATE WITH SAVED EMPTY STRING
    const [formData, setFormData] = useState({
        storeName: "",
        storeCategory: "",
        tradingCurrency: "",
        storeSpeciality: "",
        storeDescription: "",
    });

    // ERROR STATES
    const [errors, setErrors] = useState({
        storeSpecialityError: "",
        storeDescriptionError: "",
    });

    // MAXIMUM LENGTHS FOR STORE SPECIALITY AND STORE DESCRIPTION
    const MAX_SPECIALITY_LENGTH = 100;
    const MAX_DESCRIPTION_LENGTH = 300;

    // LOAD DATA FROM LOCAL STORAGE WHEN THE COMPONENT IS MOUNTS
    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("setupStoreData"));
        if (savedData) {
            setFormData(savedData);
        }
    }, []);


    // HANDLE INPUT CHANGES
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle trimming for store speciality and description
        if (name === 'storeSpeciality' && value.length > MAX_SPECIALITY_LENGTH) {
            setFormData({ ...formData, [name]: value.slice(0, MAX_SPECIALITY_LENGTH) });
        } 
        else if (name === 'storeDescription' && value.length > MAX_DESCRIPTION_LENGTH) {
            setFormData({ ...formData, [name]: value.slice(0, MAX_DESCRIPTION_LENGTH) });
        } 
        else {
            setFormData({ ...formData, [name]: value });
        }

        // Save to localStorage
        localStorage.setItem("setupStoreData", JSON.stringify({ ...formData, [name]: value }));
    };

    // VALIDATION METHOD FOR DESCRIPTION AND SPECIALITY
    const validateLength = () => {
        let valid = true;
        let newErrors = { ...errors };

        // Check if store speciality exceeds the limit
        if (formData.storeSpeciality.length > MAX_SPECIALITY_LENGTH) {
            newErrors.storeSpecialityError = `Store speciality cannot exceed ${MAX_SPECIALITY_LENGTH} characters.`;
            valid = false;
        }
        else {
            newErrors.storeSpecialityError = "";
        }

        // Check if store description exceeds the limit
        if (formData.storeDescription.length > MAX_DESCRIPTION_LENGTH) {
            newErrors.storeDescriptionError = `Store description cannot exceed ${MAX_DESCRIPTION_LENGTH} characters.`;
            valid = false;
        } 
        else {
            newErrors.storeDescriptionError = "";
        }

        setErrors(newErrors);
        return valid;
    };

    // HANDLE FORM SUBMISSION
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form from refreshing page

        // Run validation for length
        const isValid = validateLength();

        // Check if store name is "Store test"
        let newErrors = { ...errors };
        if (formData.storeName === "Store test") {
            newErrors.storeNameError = "Store name already taken";
        } else {
            newErrors.storeNameError = "";
        }

        setErrors(newErrors); // Update the error state

        // If validation is successful and store name is not "Store test"
        if (isValid && !newErrors.storeNameError) {
            navigate('/customise_store');
        }
    };

    const goBackToPersonalInfoPage = () => {
        navigate('/personal_info');
    };

    return (
        <div className="setup-store-page">
            <div className="logo-wrap">
                <img className="logo" src="/logo.png" alt="logo" />
            </div>
            <div className="page-wrap">
                <div className="progress-bar-wrap">
                    <ul className='progress-bar'>
                        <li><a className="active" href="/get_started">1. Get started</a></li>
                        <li><a className="active" href="personal_info">2. Personal info</a></li>
                        <li><a className="active" href="#">3. Setup store</a></li>
                        <li><a href="#">4. Customise store</a></li>
                        <li><a href="#">5. Payment & Billing</a></li>
                        <li><a href="#">6. Profile Summary</a></li>
                    </ul>
                    <div className="mobile-progress-indicator">
                        <span><b>3</b>/6</span>
                    </div>
                </div>

                <div className="onboarding-page-content">
                    <h1 className='main-title'>Setup Your Store</h1>
                    <p className="caption">
                        Now setup your store, provide your store details for all required fields to continue. 
                    </p>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Store name</label>
                            <input 
                                className='form-control' 
                                type="text" 
                                name="storeName" 
                                placeholder="e.g Jenifer's Clothing" 
                                value={formData.storeName} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.storeNameError && <p className="error-message">{errors.storeNameError}</p>}
                        </div>

                        <div className="form-group-small-wrap">
                            <div className="form-group-small">
                                <label>Store category</label>
                                <select className="form-control" name="storeCategory" value={formData.storeCategory} onChange={handleChange} required>
                                    <option value="" disabled selected hidden>Select Category</option>
                                    <option value="Clothing & Footwear">Clothing & Footwear</option>
                                    <option value="Jewelry and Fashon Accessories">Jewelry & Fashion Accessories</option>
                                    <option value="Gadgets & Electronics">Gadgets & Electronics</option>
                                    <option value="Food and Beverage">Food & Beverages</option>
                                    <option value="Grocery">Grocery</option>
                                    <option value="Pharmacy">Pharmacy</option>
                                </select>
                            </div>

                            <div className="form-group-small">
                                <label>Trading currency</label>
                                <select className="form-control" name="tradingCurrency" value={formData.tradingCurrency} onChange={handleChange} required>
                                    <option value="" disabled selected hidden>Select Trading Currency</option>
                                    <option value="GBP">GBP</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                                <label>Store's speciality (Optional)</label>
                                <input 
                                    className='form-control' 
                                    name="storeSpeciality" 
                                    type="text" 
                                    placeholder="What makes your store unique?" 
                                    value={formData.storeSpeciality} 
                                    onChange={handleChange}
                                />
                        </div>

                        <div className="form-group">
                            <label>Store description</label>
                            <textarea 
                                className='form-control'
                                name="storeDescription"
                                type="text" 
                                placeholder="Tell us about your store..."
                                value={formData.storeDescription} 
                                onChange={handleChange} 
                                required
                            />
                            {errors.storeDescriptionError && <p className="error-message">{errors.storeDescriptionError}</p>}
                        </div>

                        <div className='form-actions'>
                            <button className='primary-button' type="submit">Continue</button>
                            <button className='alternative-button' onClick={goBackToPersonalInfoPage} type="button">Back</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SetupStorePage;
