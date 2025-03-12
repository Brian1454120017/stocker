import React, {useState} from 'react';
import { useNavigate } from'react-router-dom';
import { Link } from 'react-router-dom';
import '../Custom.css';


const LandingPage = () => {
    
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signInError, setSignInError] = useState('');
  
    const navigate = useNavigate();

    // METHOD TO HANDLE FORM SUBMISSION
    const handleSubmit = (e) => {
      e.preventDefault(); // Prevent form from refreshing page
      let valid = true;
  
      setSignInError(''); // Reset errors
  
      // VALIDATION LOGIC
      if (email !== 'test@mail.com' && password !== '12345') {
        setSignInError('Invalid email and password. Please try again.');
        valid = false;
      } 
      else if (email!== 'test@mail.com') {
        setSignInError('Invalid email. Please try again.');
        valid = false;
      }
      else if (password !== '12345') {
        setSignInError('Invalid password. Please try again.');
        valid = false;
      }
  
      // If validation passes, redirect or perform login logic
      if (valid) {
        navigate('/dashboard');
      }
    };

  return (
    <div className="landing-page">
        <div className="logo-wrap">
           <img className="logo" src="/logo.png" alt="logo" />
        </div>
            <div className="landing-page-wrap">
                <div className="landing-page-content">
                    <h1 className="landing-page-title">Hello, Welcome!</h1>
                    <p className="landing-page-text">
                        Welcome to <b>Stocker</b>, the smart and intuitive digital software designed to help you seamlessly manage
                        your business’s inventory. <b>Stocker</b> saves you time by streamlining workflows and reducing manual effort,
                        while its user-friendly design ensures efficiency and effectiveness at every step. Whether you're 
                        tracking stock, optimizing processes, or making decisions, Stocker empowers you to focus on growing your
                        business without the hassle of complex systems.
                    </p>
                    <h2 className="landing-page-subtitle">Simple . Efficient . Effective</h2>
                </div>
            </div>

           <div className="login-wrap">
                <div className="form-content">
                    <h1 className="main-title">Keep Stock Organised!</h1>
                    <p className="caption">
                        Dive into stock management by simply signing into your account
                    </p>
                    <form className="form" onSubmit={handleSubmit} >
                        <div className="form-group">
                            <label>Email</label>
                            <input 
                                className='form-control' 
                                type="email" 
                                placeholder="Enter your email"  
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input 
                                className='form-control' 
                                type="password" 
                                placeholder="Enter your password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {signInError && <p className="error-message">{signInError}</p>}
                        </div>
                        <div className='form-actions'>
                            <button className='primary-button' type="submit">Sign in</button>
                            <a className="forgot-password">Reset Password?</a>
                        </div>
                    </form>
                    <div className='create-account-hyperlink'>
                        <span><hr/>New Here?<hr/></span>
                        <Link to="/get_started">Create Account</Link>
                    </div>
                </div>
           </div>
    </div>
  );
};

export default LandingPage;