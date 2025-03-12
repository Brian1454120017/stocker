import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../Custom.css'

const PersonalInfo = () => {
    const navigate = useNavigate();

    // Initialize state with saved values or empty strings
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        addressLine3: "",
        zipCode: "",
        country: "",
        city: ""
    });

    // INITIALIZE ERROR STATES FOR FIRSTNAME AND LASTNAME
    const [errors, setErrors] = useState({
        firstNameError: "",
        lastNameError: ""
    });

    // LOAD DATA FROM LOCAL STORAGE WHEN THE COMPONENT MOUNTS
    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("personalInfo"));
        if (savedData) {
            setFormData(savedData);
        }
    }, []);

    // CONTANT VARAIBLES FOR MAXIMUM LENGTHS
    const MAX_ZIPCODE_LENGTH = 10;
    const MAX_CITY_LENGTH = 100;
    const MAX_ADDRESSLINE1_LENGTH = 100;
    const MAX_ADDRESSLINE2_LENGTH = 100;
    const MAX_ADDRESSLINE3_LENGTH = 100;

    // METHOD TO HANDLE CHANGES IN INPUT FIELDS
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedData = { ...formData, [name]: value };

        // Handle trimming for zipcode, city, addressline1, addressline2, addressline3
        if (name === 'zipCode' && value.length > MAX_ZIPCODE_LENGTH) {
            updatedData.zipCode = value.slice(0, MAX_ZIPCODE_LENGTH);
        } 
        else if (name === 'city' && value.length > MAX_CITY_LENGTH) {
            updatedData.city = value.slice(0, MAX_CITY_LENGTH);
        }   
        else if (name === 'addressLine1' && value.length > MAX_ADDRESSLINE1_LENGTH) {
            updatedData.addressLine1 = value.slice(0, MAX_ADDRESSLINE1_LENGTH);
        }
        else if (name === 'addressLine2' && value.length > MAX_ADDRESSLINE2_LENGTH) {
            updatedData.addressLine2 = value.slice(0, MAX_ADDRESSLINE2_LENGTH);
        } 
        else if (name === 'addressLine3' && value.length > MAX_ADDRESSLINE3_LENGTH) {
            updatedData.addressLine3 = value.slice(0, MAX_ADDRESSLINE3_LENGTH);
        } 
        else {
            setFormData(updatedData); // Update state
        }  

        // Save to localStorage
        localStorage.setItem("personalInfo", JSON.stringify(updatedData));

        // Clear errors when the user starts typing again
        if (name === 'firstName' || name === 'lastName') {
                setErrors({...errors,[`${name}Error`]: ""});
        }
    };

    // VALIDATION METHOD FOR FIRSTNAME AND LASTNAME FIELDS
    const validateNames = () => {
        let valid = true;
        let newErrors = { ...errors };

        // Regular expression to check for digits
        const numberRegex = /\d/;

        // Check if first name and last name contains numbers
        if (numberRegex.test(formData.firstName)) {
            newErrors.firstNameError = "First name should not contain numbers.";
            valid = false;
        }
        if (numberRegex.test(formData.lastName)) {
            newErrors.lastNameError = "Last name should not contain numbers.";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    // METHOD TO HANDLE FORM SUBMISSION
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form from refreshing page
    
        // Run validation for names
        const isNamesValid = validateNames();
    
         // If validation is successful, proceed to next step
        if (isNamesValid) {
            navigate('/setup_store');
        } 
       
    };

    // METHOD TO GO BACK TO GET STARTED PAGE
    const goBackToGetStartedPage = () => {
        navigate('/get_started');
    };

    return (
        <div className="personal-info-page">
            <div className="logo-wrap">
                <img className="logo" src="/logo.png" alt="logo" />
            </div>
            <div className="page-wrap">
                <div className="progress-bar-wrap">
                    <ul className='progress-bar'>
                        <li><a className="active" href="/get_started">1. Get started</a></li>
                        <li><a className="active" href="#">2. Personal info</a></li>
                        <li><a href="#">3. Setup store</a></li>
                        <li><a href="#">4. Customise store</a></li>
                        <li><a href="#">5. Payment & Billing</a></li>
                        <li><a href="#">6. Profile Summary</a></li>
                    </ul>
                    <div className="mobile-progress-indicator">
                        <span><b>2</b>/6</span>
                    </div>
                </div>
                
                <div className="onboarding-page-content">
                    <h1 className='main-title'>Personal Info</h1>
                    <p className="caption">
                        Please provide your personal details, this will be treated as admin information for your store. 
                    </p>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-group-small-wrap">
                            <div className="form-group-small">
                                <label>First name</label>
                                <input 
                                    className='form-control' 
                                    type="text"
                                    name="firstName"
                                    placeholder="Jenifer" 
                                    value={formData.firstName} 
                                    onChange={handleChange}  
                                    required
                                />
                                {errors.firstNameError && <p className="error-message-small">{errors.firstNameError}</p>}
                            </div>
                            <div className="form-group-small">
                                <label>Last name</label>
                                <input 
                                    className='form-control'
                                    type="text"  
                                    name="lastName" 
                                    placeholder="Whiteson" 
                                    value={formData.lastName} 
                                    onChange={handleChange} 
                                    required
                                />
                                {errors.lastNameError && <p className="error-message-small">{errors.lastNameError}</p>}
                            </div>
                        </div>

                        <div className="form-group-small-wrap">
                            <div className="form-group-small">
                                <label>Phone (exclude area code)</label>
                                <input 
                                    className='form-control' 
                                    type="number"  
                                    name="phone" 
                                    placeholder="+44 20 0000 0000" 
                                    value={formData.phone} 
                                    onChange={handleChange} 
                                    required
                                />
                            </div>
                            <div className="form-group-small">
                                <label>Address line 1</label>
                                <input 
                                    className='form-control' 
                                    type="text"  
                                    name="addressLine1" 
                                    placeholder="23 St Jones Avenue" 
                                    value={formData.addressLine1} 
                                    onChange={handleChange} 
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group-small-wrap">
                            <div className="form-group-small">
                                <label>Address line 2 (optional)</label>
                                <textarea  
                                    className='form-control' 
                                    type="text"  
                                    name="addressLine2"
                                    placeholder="Apt 4B, Floor 2"
                                    value={formData.addressLine2} 
                                    onChange={handleChange} 
                                />
                            </div>
                            <div className="form-group-small">
                                <label>Address line 3 (optional)</label>
                                <textarea 
                                    className='form-control' 
                                    type="text"  
                                    name="addressLine3" 
                                    placeholder="Opposite Green Mall, Near Central Park" 
                                    value={formData.addressLine3} 
                                    onChange={handleChange} 
                                />
                            </div>
                        </div>

                        <div className="form-group">
                                <label>City</label>
                                <input 
                                    className="form-control"  
                                    name="city" 
                                    placeholder="Manchester" 
                                    value={formData.city} 
                                    onChange={handleChange} 
                                    required 
                                />    
                        </div>

                        <div className="form-group-small-wrap">
                            <div className="form-group-small">
                                <label>Post code (optional)</label>
                                <input 
                                    className='form-control' 
                                    type="number"  
                                    name="zipCode"
                                    maxLength="10"
                                    placeholder="10001"
                                    value={formData.zipCode}
                                    onChange={handleChange} 
                                />
                            </div>
                            <div className="form-group-small">
                            <label>Country</label>
                                <select className="form-control"  name="country" value={formData.country} onChange={handleChange} required>
                                    <option value="" disabled selected hidden>Select your country</option>
                                    <option value="Afghanistan">Afghanistan</option>
                                    <option value="Albania">Albania</option>
                                    <option value="Algeria">Algeria</option>
                                    <option value="Andorra">Andorra</option>
                                    <option value="Angola">Angola</option>
                                    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                    <option value="Argentina">Argentina</option>
                                    <option value="Armenia">Armenia</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Austria">Austria</option>
                                    <option value="Azerbaijan">Azerbaijan</option>
                                    <option value="Bahamas">Bahamas</option>
                                    <option value="Bahrain">Bahrain</option>
                                    <option value="Bangladesh">Bangladesh</option>
                                    <option value="Barbados">Barbados</option>
                                    <option value="Belarus">Belarus</option>
                                    <option value="Belgium">Belgium</option>
                                    <option value="Belize">Belize</option>
                                    <option value="Benin">Benin</option>
                                    <option value="Bhutan">Bhutan</option>
                                    <option value="Bolivia">Bolivia</option>
                                    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                    <option value="Botswana">Botswana</option>
                                    <option value="Brazil">Brazil</option>
                                    <option value="Brunei">Brunei</option>
                                    <option value="Bulgaria">Bulgaria</option>
                                    <option value="Burkina Faso">Burkina Faso</option>
                                    <option value="Burundi">Burundi</option>
                                    <option value="Cabo Verde">Cabo Verde</option>
                                    <option value="Cambodia">Cambodia</option>
                                    <option value="Cameroon">Cameroon</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Central African Republic">Central African Republic</option>
                                    <option value="Chad">Chad</option>
                                    <option value="Chile">Chile</option>
                                    <option value="China">China</option>
                                    <option value="Colombia">Colombia</option>
                                    <option value="Comoros">Comoros</option>
                                    <option value="Congo (Congo-Brazzaville)">Congo</option>
                                    <option value="Costa Rica">Costa Rica</option>
                                    <option value="Croatia">Croatia</option>
                                    <option value="Cuba">Cuba</option>
                                    <option value="Cyprus">Cyprus</option>
                                    <option value="Czech Republic">Czech Republic</option>
                                    <option value="Denmark">Denmark</option>
                                    <option value="Djibouti">Djibouti</option>
                                    <option value="Dominica">Dominica</option>
                                    <option value="Dominican Republic">Dominican Republic</option>
                                    <option value="Ecuador">Ecuador</option>
                                    <option value="Egypt">Egypt</option>
                                    <option value="El Salvador">El Salvador</option>
                                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                                    <option value="Eritrea">Eritrea</option>
                                    <option value="Estonia">Estonia</option>
                                    <option value="Eswatini">Eswatini</option>
                                    <option value="Ethiopia">Ethiopia</option>
                                    <option value="Fiji">Fiji</option>
                                    <option value="Finland">Finland</option>
                                    <option value="France">France</option>
                                    <option value="Gabon">Gabon</option>
                                    <option value="Gambia">Gambia</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Germany">Germany</option>
                                    <option value="Ghana">Ghana</option>
                                    <option value="Greece">Greece</option>
                                    <option value="Grenada">Grenada</option>
                                    <option value="Guatemala">Guatemala</option>
                                    <option value="Guinea">Guinea</option>
                                    <option value="Guinea-Bissau">Guinea-Bissau</option>
                                    <option value="Guyana">Guyana</option>
                                    <option value="Haiti">Haiti</option>
                                    <option value="Honduras">Honduras</option>
                                    <option value="Hungary">Hungary</option>
                                    <option value="Iceland">Iceland</option>
                                    <option value="India">India</option>
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="Iran">Iran</option>
                                    <option value="Iraq">Iraq</option>
                                    <option value="Ireland">Ireland</option>
                                    <option value="Israel">Israel</option>
                                    <option value="Italy">Italy</option>
                                    <option value="Jamaica">Jamaica</option>
                                    <option value="Japan">Japan</option>
                                    <option value="Jordan">Jordan</option>
                                    <option value="Kazakhstan">Kazakhstan</option>
                                    <option value="Kenya">Kenya</option>
                                    <option value="Kiribati">Kiribati</option>
                                    <option value="Kuwait">Kuwait</option>
                                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                                    <option value="Laos">Laos</option>
                                    <option value="Latvia">Latvia</option>
                                    <option value="Lebanon">Lebanon</option>
                                    <option value="Lesotho">Lesotho</option>
                                    <option value="Liberia">Liberia</option>
                                    <option value="Libya">Libya</option>
                                    <option value="Liechtenstein">Liechtenstein</option>
                                    <option value="Lithuania">Lithuania</option>
                                    <option value="Luxembourg">Luxembourg</option>
                                    <option value="Madagascar">Madagascar</option>
                                    <option value="Malawi">Malawi</option>
                                    <option value="Malaysia">Malaysia</option>
                                    <option value="Maldives">Maldives</option>
                                    <option value="Mali">Mali</option>
                                    <option value="Malta">Malta</option>
                                    <option value="Marshall Islands">Marshall Islands</option>
                                    <option value="Mauritania">Mauritania</option>
                                    <option value="Mauritius">Mauritius</option>
                                    <option value="Mexico">Mexico</option>
                                    <option value="Micronesia">Micronesia</option>
                                    <option value="Moldova">Moldova</option>
                                    <option value="Monaco">Monaco</option>
                                    <option value="Mongolia">Mongolia</option>
                                    <option value="Montenegro">Montenegro</option>
                                    <option value="Morocco">Morocco</option>
                                    <option value="Mozambique">Mozambique</option>
                                    <option value="Myanmar (Burma)">Myanmar</option>
                                    <option value="Namibia">Namibia</option>
                                    <option value="Nauru">Nauru</option>
                                    <option value="Nepal">Nepal</option>
                                    <option value="Netherlands">Netherlands</option>
                                    <option value="New Zealand">New Zealand</option>
                                    <option value="Nicaragua">Nicaragua</option>
                                    <option value="Niger">Niger</option>
                                    <option value="Nigeria">Nigeria</option>
                                    <option value="North Korea">North Korea</option>
                                    <option value="Norway">Norway</option>
                                    <option value="Oman">Oman</option>
                                    <option value="Pakistan">Pakistan</option>
                                    <option value="Palau">Palau</option>
                                    <option value="Palestine">Palestine</option>
                                    <option value="Panama">Panama</option>
                                    <option value="Papua New Guinea">Papua New Guinea</option>
                                    <option value="Paraguay">Paraguay</option>
                                    <option value="Peru">Peru</option>
                                    <option value="Philippines">Philippines</option>
                                    <option value="Poland">Poland</option>
                                    <option value="Portugal">Portugal</option>
                                    <option value="Qatar">Qatar</option>
                                    <option value="Romania">Romania</option>
                                    <option value="Russia">Russia</option>
                                    <option value="Rwanda">Rwanda</option>
                                    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                    <option value="Saint Lucia">Saint Lucia</option>
                                    <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                                    <option value="Samoa">Samoa</option>
                                    <option value="San Marino">San Marino</option>
                                    <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                    <option value="Saudi Arabia">Saudi Arabia</option>
                                    <option value="Senegal">Senegal</option>
                                    <option value="Serbia">Serbia</option>
                                    <option value="Seychelles">Seychelles</option>
                                    <option value="Sierra Leone">Sierra Leone</option>
                                    <option value="Singapore">Singapore</option>
                                    <option value="Slovakia">Slovakia</option>
                                    <option value="Slovenia">Slovenia</option>
                                    <option value="Solomon Islands">Solomon Islands</option>
                                    <option value="Somalia">Somalia</option>
                                    <option value="South Africa">South Africa</option>
                                    <option value="South Korea">South Korea</option>
                                    <option value="Spain">Spain</option>
                                    <option value="Sri Lanka">Sri Lanka</option>
                                    <option value="Sudan">Sudan</option>
                                    <option value="Suriname">Suriname</option>
                                    <option value="Sweden">Sweden</option>
                                    <option value="Switzerland">Switzerland</option>
                                    <option value="Syria">Syria</option>
                                    <option value="Taiwan">Taiwan</option>
                                    <option value="Tajikistan">Tajikistan</option>
                                    <option value="Tanzania">Tanzania</option>
                                    <option value="Thailand">Thailand</option>
                                    <option value="Timor-Leste">Timor-Leste</option>
                                    <option value="Togo">Togo</option>
                                    <option value="Tonga">Tonga</option>
                                    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                    <option value="Tunisia">Tunisia</option>
                                    <option value="Turkey">Turkey</option>
                                    <option value="Turkmenistan">Turkmenistan</option>
                                    <option value="Tuvalu">Tuvalu</option>
                                    <option value="Uganda">Uganda</option>
                                    <option value="Ukraine">Ukraine</option>
                                    <option value="United Arab Emirates">United Arab Emirates</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="United States">United States</option>
                                    <option value="Uruguay">Uruguay</option>
                                    <option value="Uzbekistan">Uzbekistan</option>
                                    <option value="Vanuatu">Vanuatu</option>
                                    <option value="Vatican City">Vatican City</option>
                                    <option value="Venezuela">Venezuela</option>
                                    <option value="Vietnam">Vietnam</option>
                                    <option value="Yemen">Yemen</option>
                                    <option value="Zambia">Zambia</option>
                                    <option value="Zimbabwe">Zimbabwe</option>
                                </select>
                            </div>
                        </div>


                        <div className='form-actions'>
                            <button className='primary-button' type="submit">Continue</button>
                            <button className='alternative-button' onClick={goBackToGetStartedPage} type="button">Back</button>
                        </div>
                    </form>
               </div>
            </div>
        </div>
    );
};

export default PersonalInfo;
