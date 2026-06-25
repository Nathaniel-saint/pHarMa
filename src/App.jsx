import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Nav from "./sections/Nav";
import Hero from "./sections/Hero";
import SignIn from "./features/auth/SignIn";
import SignUp from "./features/auth/SignUP";
import Footer from "./sections/Footer"; 
import DashLayout from "./features/pages/DashLayout";
import Dashboard from "./features/pages/Dashboard";
import Scan from "./features/pages/Scan";
import History from "./features/pages/History";
import User from "./features/pages/User";
import './features/auth/Auth.css';
import './features/pages/Dash.css'
import './features/pages/HistInsight.css'
import Insight from "./features/pages/Insight";
import PublicRegistry from "./features/pages/PublicRegistry";
import ProtectedRoute from "./features/auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      {/* 1. We wrap EVERYTHING in a standard conditional Router switcher */}
      <Routes>
        
        {/* LANDING PAGE ROUTE: Includes Nav, Hero Content, Background Curve, and Footer */}
        <Route 
          path="/" 
          element={
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <div className="hero-container">
                <Nav />
                <Hero />
              </div>
              <Footer />
            </div>
          } 
        />

        {/* AUTHENTICATION ROUTES: Completely separate, clean, no Nav, no Footer */}
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path ='/registry' element ={<PublicRegistry/>}/>
        
        <Route element={<ProtectedRoute/>}>
          <Route path="/dashboard" element={<DashLayout />}>
            {/* Default view when going to /dashboard */}
            <Route index element={<Dashboard/>} />
            <Route path="scan" element={<Scan/>} />
            <Route path="history" element={<History/>} />
            <Route path="insight" element={<Insight/>} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;