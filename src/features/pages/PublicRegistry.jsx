import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  AlertTriangle, 
  Search, 
  ArrowLeft, 
  ShieldAlert 
} from "lucide-react";

function PublicRegistry() {
  const [flaggedLogs, setFlaggedLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    try {
      const cachedLogsRaw = localStorage.getItem("app_scans");
      const parsedLogs = cachedLogsRaw ? JSON.parse(cachedLogsRaw) : [];
      if (Array.isArray(parsedLogs)) {
   
        const unregisteredItems = parsedLogs.filter(log => log && log.status === "FLAGGED");
        setFlaggedLogs(unregisteredItems);
      }
    } catch (error) {
      console.error("Failed parsing public registry matrix:", error);
    }
  }, []);

  const filteredRegistry = flaggedLogs.filter((log) => {
    return (
      (log.brandName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.manufacturer || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.activeIngredient || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="dashboard-home-wrapper">
      
      <div className="dash-view-header">
        <div className="header-title-block">
          <div className="navigation-back-wrapper">
            <Link to="/" className="text-link-shortcut flex-center">
              <ArrowLeft size={19} className="shortcut-arrow-icon" />
              <span className="arrow-text">Return to Home</span>
            </Link>
          </div>
          <h1>Public Warning Registry</h1>
          <p>Real-time directory of unverified, counterfeit, or unregistered products detected by this network.</p>
        </div>
      </div>

      <div className="pharma-card public-warning-banner">
        <div className="warning-banner-flex">
          <ShieldAlert size={24} className="warning-banner-icon" />
          <div className="warning-banner-text">
            <strong className="warning-banner-title">{flaggedLogs.length} High-Risk Products Flagged</strong>
            <span className="warning-banner-subtitle">The items listed below failed verification passes and lack valid regulatory registration records.</span>
          </div>
        </div>
      </div>

      <div className="pharma-card filter-controls-card">
        <div className="filter-inner-flex">
          <div className="search-input-container">
            <Search size={16} className="search-decorator-icon" />
            <input
              type="text"
              placeholder="Search registry by Brand, Manufacturer, or Compound..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="filter-search-input"
            />
          </div>
        </div>
      </div>

      <div className="dashboard-split-layout">
        <div className="dashboard-logs-summary-card">
          <div className="summary-list-viewport">
            {filteredRegistry.length === 0 ? (
              <div className="summary-empty-placeholder">
                <AlertTriangle size={40} className="empty-registry-icon" />
                <p>Clean Sheet! No unregistered entries match your search criteria.</p>
              </div>
            ) : (
              <div className="summary-logs-stack">
                {filteredRegistry.map((log, index) => (
                  <div key={log.scannedId || index} className="summary-log-row-item dynamic-danger-border">
                    
                    <div className="summary-col-status">
                      <span className="status-pill-indicator indicator-flagged">
                        <AlertTriangle size={14} />
                        <span>UNREGISTERED</span>
                      </span>
                    </div>

                    <div className="summary-col-info">
                      <h4>{log.brandName || "Unknown Product"}</h4>
                      <p className="product-subtext">
                        <span className="manufacturer-tag">{log.manufacturer || "Unknown Source"}</span>
                        <span className="divider-dot">||</span>
                        <span className="ingredient-tag">{log.activeIngredient || "No compound listed"}</span>
                        <span className="divider-dot">||</span>
                        <span className="dosage-tag">{log.dosage || "N/A"}</span>
                      </p>
                    </div>

                    <div className="summary-col-meta">
                      <span className="summary-row-timestamp">Flagged: {log.timeLogged || "Recently"}</span>
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

export default PublicRegistry;