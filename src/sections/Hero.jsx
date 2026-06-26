import React from "react";
import { Link } from 'react-router-dom';

function Hero() {
    return (
        <section className="hero-section">

            
            <div className="hero-content">
                <h1 className="hero-heading">
                    One Platform, <br />
                    <span className="green-text">Clears All Unregistered Drugs</span>
                </h1>
                
                <p className="hero-subtext">
                    An AI-driven pharmacovigilance ecosystem. Photograph any medicine to instantly extract 
                    structured data, match batch records, and verify regulatory legitimacy in real time.
                </p>
                
                <div className="hero-buttons">
                    <Link to="/register" className="button-h button-primary">
                        Get Started
                    </Link>
                    <Link to="/registry" className="button-h button-secondary">
                        Flagged Drugs
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Hero;