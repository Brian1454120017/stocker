import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import '../Custom.css'


const Dashboard = () => {

    return (
        <div className="Dashboard">
            <div className="logo-wrap">
                <img className="logo" src="/logo.png" alt="logo" />
            </div>
            <h1>Dashboard</h1>
        </div>
)};
export default Dashboard;