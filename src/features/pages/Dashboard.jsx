import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  ShieldCheck, 
  AlertTriangle, 
  History, 
  ScanLine, 
  ArrowRight,
  TrendingUp,
  Clock,
  User,
  Bell
} from "lucide-react";

function Dashboard() {
  const [stats, setStats] = useState({
    totalScans: 0,
    registeredCount: 0,
    flaggedCount: 0,
    authenticityRate: 0,
  });
  const [recentScans, setRecentScans] = useState([]);

  useEffect(() => {
    try {
      const cachedLogsRaw = localStorage.getItem("app_scans");
      const logs = cachedLogsRaw ? JSON.parse(cachedLogsRaw) : [];

      if (Array.isArray(logs)) {
        const total = logs.length;
        const registered = logs.filter(item => item && item.status === "REGISTERED").length;
        const flagged = logs.filter(item => item && item.status === "FLAGGED").length;
        const rate = total > 0 ? Math.round((registered / total) * 100) : 0;

        setStats({
          totalScans: total,
          registeredCount: registered,
          flaggedCount: flagged,
          authenticityRate: rate,
        });

        // Slice the first 4 logs to safely handle representation constraints
        setRecentScans(logs.slice(0, 5));
      }
    } catch (error) {
      console.error("Failed parsing dashboard local log data:", error);
    }
  }, []);

  return (
    <div className="dashboard-home-wrapper">
      
      {/* TOP SYSTEM UTILITY & PROFILE ANCHOR BAR */}
      <div className="dash-top-profile-bar">
        <div className="top-bar-left">
          <span className="system-status-tag">
            <span className="pulse-dot"></span> Ingestion Nodes Online
          </span>
        </div>
        <div className="top-bar-right">
          <button className="top-utility-icon-btn" title="Notifications">
            <Bell size={18} />
          </button>
          
          {/* Clickable Profile Route Shortcut Trigger */}
          <Link to="/dashboard" className="top-user-profile-badge" title="View Profile">
            <div className="avatar-placeholder">
              <User size={16} />
            </div>
            <div className="user-meta-brief">
              <span className="profile-name">Inspector Agent</span>
              <span className="profile-role">Standard Access</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Upper Context Header Layout Grid */}
      <div className="dash-view-header">
        <div>
          <h1>Analytics Control Center</h1>
          <p>Real-time telemetry and overview metrics from authentication scanning checkpoints.</p>
        </div>
        <Link to="/dashboard/scan" className="btn btn-primary nav-shortcut-btn">
          <ScanLine size={18} />
          <span>Launch Scanner</span>
        </Link>
      </div>

      {/* METRICS ROW CARDS */}
      <div className="metrics-grid-row">
        
        {/* Metric Item 1: Total Counter */}
        <div className="metric-metric-card tile-total">
          <div className="metric-card-body">
            <div className="metric-meta">
              <span className="metric-label">Total Document Passed</span>
              <h2 className="metric-numeric-display">{stats.totalScans}</h2>
            </div>
            <div className="metric-badge-icon">
              <History size={24} />
            </div>
          </div>
          <div className="metric-card-footer">
            <TrendingUp size={14} className="text-muted" />
            <span>Cumulative scan actions log count</span>
          </div>
        </div>

        {/* Metric Item 2: Fully Verified Counter */}
        <div className="metric-metric-card tile-registered">
          <div className="metric-card-body">
            <div className="metric-meta">
              <span className="metric-label">Verified Authentic Products</span>
              <h2 className="metric-numeric-display text-success">{stats.registeredCount}</h2>
            </div>
            <div className="metric-badge-icon badge-success">
              <ShieldCheck size={24} />
            </div>
          </div>
          <div className="metric-card-footer">
            <span className="footer-status-indicator marker-success"></span>
            <span>Matches existing regulatory registry list</span>
          </div>
        </div>

        {/* Metric Item 3: Total Alerts Flagged */}
        <div className="metric-metric-card tile-flagged">
          <div className="metric-card-body">
            <div className="metric-meta">
              <span className="metric-label">Unlisted / Flagged Warnings</span>
              <h2 className="metric-numeric-display text-danger">{stats.flaggedCount}</h2>
            </div>
            <div className="metric-badge-icon badge-danger">
              <AlertTriangle size={24} />
            </div>
          </div>
          <div className="metric-card-footer">
            <span className="footer-status-indicator marker-danger"></span>
            <span>Requires inspection intervention</span>
          </div>
        </div>

        {/* Metric Item 4: Authenticity Rate percentage */}
        <div className="metric-metric-card tile-rate">
          <div className="metric-card-body">
            <div className="metric-meta">
              <span className="metric-label">Authenticity Clearance Rate</span>
              <h2 className="metric-numeric-display text-highlight">{stats.authenticityRate}%</h2>
            </div>
            <div className="metric-badge-icon badge-highlight">
              <LayoutDashboard size={24} />
            </div>
          </div>
          <div className="metric-card-footer">
            <div className="progress-bar-track">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${stats.authenticityRate}%` }}
              ></div>
            </div>
          </div>
        </div>

      </div>

      {/* RECENT SCAN FEEDS AND HISTORY SUMMARY */}
      <div className="dashboard-split-layout">
        <div className="pharma-card dashboard-logs-summary-card">
          <div className="card-header split-header-flex">
            <div>
              <h2>Recent Scanner Logs</h2>
              <p>Latest product authenticity data submitted across ingestion layers.</p>
            </div>
            <Link to="/dashboard/history" className="text-link-shortcut flex-center">
              <span>View All Logs</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="summary-list-viewport">
            {recentScans.length === 0 ? (
              <div className="summary-empty-placeholder">
                <Clock size={36} className="text-muted" />
                <p>No authentication checks executed yet.</p>
                <Link to="/dashboard/scan" className="text-highlight font-medium underline">
                  Run your first product scan pass
                </Link>
              </div>
            ) : (
              <div className="summary-logs-stack">
                {recentScans.map((log, index) => (
                  <div key={log.scannedId || index} className="summary-log-row-item">
                    
                    {/* Left Column: Fixed Width Status Badge Container */}
                    <div className="summary-col-status">
                      <span className={`status-pill-indicator indicator-${(log.status || "flagged").toLowerCase()}`}>
                        {log.status === "REGISTERED" ? (
                          <ShieldCheck size={14} />
                        ) : (
                          <AlertTriangle size={14} />
                        )}
                        <span>{log.status || "FLAGGED"}</span>
                      </span>
                    </div>

                    {/* Middle Column: Fluid Product Identity Metadata Details */}
                    <div className="summary-col-info">
                      <h4>{log.brandName || "Unknown Product"}</h4>
                      <p className="product-subtext">
                        <span className="manufacturer-tag">{log.manufacturer || "Unknown Source Manufacturer"}</span>
                        <span className="divider-dot">•</span>
                        <span className="dosage-tag">{log.dosage || "Unknown Dosage"}</span>
                      </p>
                    </div>

                    {/* Right Column: Date / Timestamp Reference Alignments */}
                    <div className="summary-col-meta">
                      <span className="summary-row-timestamp">{log.timeLogged || "Just now"}</span>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;