import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-bar">
            <div className="footer-left">
                <span className="footer-logo">pHarMa</span>
                <p className="footer-tagline">Intelligent Medicine Authentication Ecosystem</p>
            </div>
            
            <div className="footer-right">
                <p className="footer-copy">
                    &copy; {currentYear} pHarMa. All rights reserved. Registered with the Ghana FDA Register.
                </p>
                <div className="footer-links">
                    <Link to="/privacy" className="footer-link">Privacy Policy</Link>
                    <Link to="/terms" className="footer-link">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;