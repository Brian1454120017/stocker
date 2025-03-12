import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import LandingPage from './components/LandingPage';
import GetStartedPage from './components/GetStartedPage';
import PersonalInfoPage from './components/PersonalInfoPage';
import SetupStorePage from './components/SetupStorePage';
import CustomiseStorePage from './components/CustomiseStorePage';
import PaymentAndBillingPage from './components/PaymentAndBilling';
import ProfileSummaryPage from './components/ProfileSummary';
import DashboardPage from './components/Dashboard';


function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
          <Route path="/" element={<LandingPage  />} />
          <Route path="/get_started" element={<GetStartedPage />} />
          <Route path= "/personal_info" element={<PersonalInfoPage />} />
          <Route path= "/setup_store" element={<SetupStorePage />} />
          <Route path= "/customise_store" element={<CustomiseStorePage />} />
          <Route path= "/payment_and_billing" element={<PaymentAndBillingPage />} />
          <Route path= "/profile_summary" element={<ProfileSummaryPage />} />
          <Route path= "/dashboard" element={<DashboardPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
