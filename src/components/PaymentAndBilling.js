import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../Custom.css';

const PaymentAndBillingPage = () => {
    const [formData, setFormData] = useState({
        cardNumber: "",
        cvvNumber: "",
        expiryDate: "",
        paymentType: "0",
    });

    const [selectedCard, setSelectedCard] = useState("0");

    const [errors, setErrors] = useState({
        cardNumberError: "",
        cvvNumberError: "",
    });

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("paymentAndBillingData"));
        if (savedData) {
            setFormData(savedData);
        }
        
    }, []);

    


    const MAX_CARDNUMBER_LENGTH = 16;
    const MAX_CVV_LENGTH = 3;

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedValue = value;

        if (name === 'cardNumber' && value.length > MAX_CARDNUMBER_LENGTH) {
            updatedValue = value.slice(0, MAX_CARDNUMBER_LENGTH);
        } else if (name === 'cvvNumber' && value.length > MAX_CVV_LENGTH) {
            updatedValue = value.slice(0, MAX_CVV_LENGTH);
        }

        const updatedData = { ...formData, [name]: updatedValue };

        setFormData(updatedData);
        localStorage.setItem("paymentAndBillingData", JSON.stringify(updatedData));
        
    };

    const handleCardSelect = (cardType) => {
        setSelectedCard(cardType);
        setFormData((prevData) => ({
            ...prevData,
            paymentType: cardType
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/profile_summary');
    };

    const navigate = useNavigate();
    const goBackToCustomizeStorePage = () => {
        navigate('/customise_store');
    };

    return (
        <div className="payment-and-billing-page">
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
                        <li><a className="active" href="#">5. Payment & Billing</a></li>
                        <li><a href="#">6. Profile Summary</a></li>
                    </ul>
                    <div className="mobile-progress-indicator">
                        <span><b>5</b>/6</span>
                    </div>
                </div>

                <div className="onboarding-page-content">
                    <h1 className='main-title'>Payment & Billing</h1>
                    <p className="caption">
                        Almost done! Complete your profile by adding payment and billing details to your account.
                    </p>

                    <form className="form" onSubmit={handleSubmit}>
                        <div className={selectedCard === "0" ? "visa" : "mastercard"}>
                            <img
                                className={selectedCard === "0" ? 'visa-icon' : 'mastercard-icon'}
                                src={selectedCard === "0" ? '/assets/icons/visa-logo-icon.svg' : '/assets/icons/mastercard-logo-icon.svg'}
                                alt={selectedCard === "0" ? "Visa" : "MasterCard"}
                                onClick={() => handleCardSelect(selectedCard === "0" ? "1" : "0")}
                            />
                        </div>

                        <div className="form-group">
                            <label>{selectedCard === "0" ? "Visa" : "MasterCard"} card number</label>
                            <input
                                className='form-control'
                                type="text"
                                name="cardNumber"
                                placeholder="0000 0000 0000 0000"
                                value={formData.cardNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group-small-wrap">
                            <div className="form-group-small">
                                <label>CVV number</label>
                                <input
                                    className='form-control'
                                    type="text"
                                    name="cvvNumber"
                                    placeholder="000"
                                    value={formData.cvvNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group-small">
                                <label>Card expiry date (mm/yy)</label>
                                <input
                                    className='form-control'
                                    id="expirydate"
                                    type="month"
                                    name="expiryDate"
                                    placeholder="MM/YY"
                                    value={formData.expiryDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <p className="caption-2">Or use</p>
                        <div className="form-group-payment-options">
                            <div className="visa">
                                <img
                                    className='visa-icon'
                                    src='/assets/icons/visa-logo-icon.svg'
                                    onClick={() => handleCardSelect("0")}
                                />
                            </div>
                            <div className="mastercard">
                                <img
                                    className='mastercard-icon'
                                    src='/assets/icons/mastercard-logo-icon.svg'
                                    alt="MasterCard"
                                    onClick={() => handleCardSelect("1")}
                                />
                            </div>
                            <div className="paypal">
                                <img className='paypal-icon' src='/assets/icons/paypal-logo-icon.svg' />
                            </div>
                        </div>

                        <div className='form-actions'>
                            <button className='primary-button' type="submit">Preview</button>
                            <button onClick={goBackToCustomizeStorePage} className='alternative-button' type="button">Back</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaymentAndBillingPage;
