import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import '../Custom.css'


const ProfileSummaryPage = () => {
    const navigate = useNavigate();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to show success message
    const [signupData, setSignupData] = useState({});

    const goBackToPaymentAndBillingPage = () => {
        navigate('/payment_and_billing');
    };

    // Retrieve and merge all saved data
    useEffect(() => {
            const getStartedData = JSON.parse(localStorage.getItem("getStartedData")) || {};
            const personalInfoData = JSON.parse(localStorage.getItem("personalInfo")) || {};
            const setUpStore = JSON.parse(localStorage.getItem("setupStoreData")) || {};
            const customiseStoreData = JSON.parse(localStorage.getItem("customiseStoreData")) || {};
            const paymentAndBillingData = JSON.parse(localStorage.getItem("paymentAndBillingData")) || {};
    
            // Merge all stored data into one object
            const combinedData = {
                ...getStartedData,
                ...personalInfoData,
                ...setUpStore,
                ...customiseStoreData,
                ...paymentAndBillingData,
            };
            console.log("Combined signup data:", combinedData);
            setSignupData(combinedData);
    }, []);

    const API_BASE_URL = "https://stocker-api-f8awdmhhgrfchacd.uksouth-01.azurewebsites.net/api";

    const successPopup = async () => {
        try {
            // Ensure data is available before submitting
            if (!signupData || Object.keys(signupData).length === 0) {
                alert("No signup data found!");
                return;
            }

            const response = await axios.post(
                `${API_BASE_URL}/user`,
                {
                    email: signupData.email,
                    password: signupData.password,
                    name: signupData.firstName,
                    phone: signupData.phone,
                    addressLine1: signupData.addressLine1,
                    addressLine2: signupData.addressLine2,
                    addressLine3: signupData.addressLine3,
                    city: signupData.city,
                    postalCode: signupData.zipCode,
                    country: signupData.country,
                    storeName: signupData.storeName,
                    storeCategory: signupData.storeCategory,
                    tradingCurrency: signupData.tradingCurrency,
                    storeSpeciality: signupData.storeSpeciality,
                    storeDescription: signupData.storeDescription,
                    cardNumber: signupData.cardNumber,
                    cvvNumber: signupData.cvvNumber,
                    expiryDate: signupData.expiryDate,
                    paymentType: signupData.paymentType,  
                    createdAt: new Date().toISOString(),
                }
            );
            

            console.log("User created successfully:", response.data);
            
            // Show success message
            setShowSuccessMessage(true);

            // Optionally, clear localStorage after submission
            // localStorage.removeItem("signupData");

        } catch (error) {
            console.error("Error submitting signup data:", error);
        }
    };

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <div className="profile-summary-page">
            <div className="logo-wrap">
                <img className="logo" src="/logo.png" alt="logo" />
            </div>
            <div className="page-wrap">
                <div className="progress-bar-wrap">
                    <ul className='progress-bar'>
                        <li><a className="active" href="/get_started">1. Get started</a></li>
                        <li><a className="active" href="personal_info">2. Personal info</a></li>
                        <li><a className="active" href="setup_store">3. Setup store</a></li>
                        <li><a className="active" href="/customise_store">4. Customise store</a></li>
                        <li><a className="active" href="/payment_and_billing">5. Payment & Billing</a></li>
                        <li><a className="active" href="#">6. Profile Summary</a></li>
                    </ul>
                    <div className="mobile-progress-indicator">
                        <span><b>6</b>/6</span>
                    </div>
                </div>
                
               <div className="profile-summary-content">
                    <h1 className='main-title'>Profile Summary</h1>
                    <p className="caption">
                        Before you proceed, please make sure the information you have provided is correct.
                    </p>
                   
                    <div className="profile-summary-info-section">
                        <div className="profile-summary-details-wrap">
                            <h2 className="sub-title">Personal info</h2>
                            <div className="profile-summary-details">
                                <p className="label">Name</p>
                                <p>{signupData.firstName + " " + signupData.lastName || "N/A"}</p>
                            </div>
                            <div className="profile-summary-details">
                                <p className="label">Phone number</p>
                                <p>{signupData.phone || "N/A"}</p>
                            </div>
                            <div className="profile-summary-details">
                                <p className="label">Physical address line 1</p>
                                <p>{signupData.addressLine1 || "N/A"}</p>
                            </div>
                            <div className="profile-summary-details">
                                <p className="label">Physical address line 2</p>
                                <p>{signupData.addressLine2 || "N/A"}</p>
                            </div>
                            <div className="profile-summary-details">
                                <p className="label">Physical address line 3</p>
                                <p>{signupData.addressLine3 || "N/A"}</p>
                            </div>
                            <div className="profile-summary-details">
                                <p className="label">City</p>
                                <p>{signupData.city || "N/A"}</p>
                            </div>
                            <div className="profile-summary-details">
                                <p className="label">Postal code</p>
                                <p>{signupData.zipCode || "N/A"}</p>
                            </div>
                            <div className="profile-summary-details">
                                <p className="label">Country</p>
                                <p>{signupData.country || "N/A"}</p>
                            </div>
                        </div>

                        <div className="profile-summary-details-wrap">
                            <h2 className="sub-title">Store info</h2>
                            <div className="profile-summary-details">
                                <p className="label">Store name</p>
                                <p>{signupData.storeName || "N/A"}</p>
                            </div>
                            <div className="profile-summary-details">
                                <p className="label">Store category</p>
                                <p>{signupData.storeCategory || "N/A"}</p>
                            </div>
                            <div className="profile-summary-details">
                                <p className="label">Trading currency</p>
                                <p>{signupData.tradingCurrency || "N/A"}</p>
                            </div>
                            <div className="profile-summary-details">
                                <p className="label">Store speciality</p>
                                <p>{signupData.storeSpeciality || "N/A"}</p>
                         </div>
                            <div className="profile-summary-details">
                                <p className="label">Store description</p>
                                <p>{signupData.storeDescription || "N/A"}</p>
                            </div>
                        </div>
                     
                        <div className="profile-summary-details-wrap">
                            <h2 className="sub-title">Payment & billing info</h2>
                            <div className="profile-summary-details">
                                <p className="label">Card number</p>
                                <p>{signupData.cardNumber || "**** **** **** 1234"}</p>
                            </div>
                            <div className="profile-summary-details">
                                <p className="label">Cvv number</p>
                                <p>{signupData.cvvNumber || "***"}</p>
                            </div>
                            <div className="profile-summary-details">
                                <p className="label">Expiry date</p>
                                <p>{signupData.expiryDate || "N/A"}</p>
                            </div>
                            <div className="profile-summary-details">
                                <p className="label">Payment type</p>
                                <p>{signupData.paymentType || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='form-actions'>
                    <button onClick={successPopup} className='primary-button' type="submit" >Submit</button>
                    <button onClick={goBackToPaymentAndBillingPage} className='alternative-button' type="submit">Back</button>
                </div>
            </div>

          
                  {/* Popup Success Message */}
                    {showSuccessMessage && (
                        <>
                        <div className="overlay"></div>
                        <div className="success-popup">
                            <img className="success-message-icon" src="/assets/img/logo_icon.png" alt="success message icon"/>
                            <h1>Hi, {signupData.firstName}! You're all set!</h1>
                            <p>
                                You've <b>successfully</b> unlocked the door to endless tock management possibilities, you are now part of 
                                the <b>Stocker</b> community, and we can't wait to help you achieve yor goals. Weather it's exploring
                                new opportunities or discovering personalized features, your journey has just  begun.
                                <br/><b>Ready to dive in?</b><br/>
                            </p>
                            <button onClick={goToDashboard} className='primary-button'>Let's go!</button>
                        </div>
                        </>
                    )}
        </div>
)};
export default ProfileSummaryPage;