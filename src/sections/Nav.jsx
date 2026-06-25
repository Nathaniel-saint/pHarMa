import React from "react";
import { Link } from 'react-router-dom'; 

function Nav(){
    return(
        <div>    
            <nav className="nav-bar">
                <span className="logo">pHarMa</span>
                <div className="links">
                    
                    <Link to="/register" className="nav-btn">Register</Link>
                    <Link to="/login" className="nav-btn">Sign In</Link>
                </div>
            </nav>
            
        </div>
    );
}

export default Nav;