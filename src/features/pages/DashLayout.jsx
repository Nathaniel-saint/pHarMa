import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { LayoutDashboard, ScanLine, FolderClock, Brain, LogOut } from "lucide-react";

function DashLayout() {
  const location = useLocation();


  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem('user_token');
    sessionStorage.removeItem('user_token');

    window.location.href = '/';
  }



  return (
    <div className="dash-container">
      {/* Left Hand Sidebar Navigation Panel */}
      <aside className="dash-sidebar">
        <div className="dash-logo-space">
          <div className="brand-header-flex">
            <div className="brand-logo-mock"></div>
            <span className="brand-name-text">pHarMa</span>
          </div>
        </div>

        <nav className="dash-nav">
          <span className="nav-section-title">MENU</span>
          <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/dashboard/scan" className={location.pathname === "/dashboard/scan" ? "active" : ""}>
            <ScanLine size={20} />
            <span>Scan</span>
          </Link>
          <Link to="/dashboard/history" className={location.pathname === "/dashboard/history" ? "active" : ""}>
            <FolderClock size={20} />
            <span>History</span>
          </Link>
          <Link to="/dashboard/insight" className={location.pathname === "/dashboard/insight" ? "active" : ""}>
            <Brain size={20} />
            <span>Insight</span>
          </Link>

          <span className="nav-section-title margin-top-md">GENERAL</span>
          <Link onClick={handleLogout} to="#logout" className="dash-logout-btn">
            <LogOut size={20} />
            <span>Logout</span>
          </Link>
        </nav>
      </aside>

      {/* Right Hand App Shell Content Panel Container */}
      <main className="dash-content-area">
        <div className="dash-view-workspace" style={{ padding: "2rem", width: "100%" }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashLayout;