import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  History as HistoryIcon, 
  ShieldCheck, 
  AlertTriangle, 
  Search, 
  SlidersHorizontal,
  ArrowLeft,
  Trash2
} from "lucide-react";

function History() {
  const [logs, setLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

 
  useEffect(() => {
    try {
      const cachedLogsRaw = localStorage.getItem("app_scans");
      const parsedLogs = cachedLogsRaw ? JSON.parse(cachedLogsRaw) : [];
      if (Array.isArray(parsedLogs)) {
        setLogs(parsedLogs);
      }
    } catch (error) {
      console.error("Failed parsing historical log matrix:", error);
    }
  }, []);

  // Clear tracking logs completely with handler
  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to permanently delete all scan history logs?")) {
      localStorage.setItem("app_scans", JSON.stringify([]));
      setLogs([]);
    }
  };

  // Processing search Queries and Filter states simultaneously
  const filteredLogs = logs.filter((log) => {
    if (!log) return false;
    
    const matchesSearch = 
      (log.brandName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.manufacturer || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.activeIngredient || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = 
      statusFilter === "ALL" || 
      log.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="dashboard-home-wrapper">
      
      {/* Upper Context Navigation Header */}
      <div className="dash-view-header">
        <div className="header-title-block">
          <div className="navigation-back-wrapper">
            <Link to="/dashboard" className="text-link-shortcut flex-center">
              <ArrowLeft size={14} className="shortcut-arrow-icon" />
              <span>Back to Control Center</span>
            </Link>
          </div>
          <h1>System Ledger History</h1>
          <p>Audit trail of all product verification passes processed by this ingestion terminal.</p>
        </div>
        
        {logs.length > 0 && (
          <button onClick={handleClearHistory} className=" quick-fix btn btn-secondary text-danger">
            <Trash2 size={16} />
            <span>Purge Ledger Logs</span>
          </button>
        )}
      </div>

      {/* FILTER CONTROL PANEL MATRIX */}
      <div className="pharma-card filter-controls-card">
        <div className="filter-inner-flex">
          
          {/* Search Box Element */}
          <div className="search-input-container">
            <Search size={16} className="search-decorator-icon" />
            <input
              type="text"
              placeholder="Search by Brand, Ingredient, or Manufacturer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="filter-search-input"
            />
          </div>

          {/* Status Filter Selection Pills */}
          <div className="status-pills-row">
            <SlidersHorizontal size={16} className="filter-icon-indicator" />
            
            <button 
              onClick={() => setStatusFilter("ALL")}
              className={`btn ${statusFilter === "ALL" ? "btn-primary" : "btn-secondary"}`}
            >
              All Passes ({logs.length})
            </button>
            
            <button 
              onClick={() => setStatusFilter("REGISTERED")}
              className={`btn ${statusFilter === "REGISTERED" ? "btn-primary" : "btn-secondary"}`}
            >
              Verified ({logs.filter(l => l.status === "REGISTERED").length})
            </button>
            
            <button 
              onClick={() => setStatusFilter("FLAGGED")}
              className={`btn ${statusFilter === "FLAGGED" ? "btn-primary" : "btn-secondary"}`}
            >
              Flagged ({logs.filter(l => l.status === "FLAGGED").length})
            </button>
          </div>

        </div>
      </div>

      {/* HISTORICAL LOGS COMPREHENSIVE VIEWPORT */}
      <div className="dashboard-split-layout">
        <div className="history-logs-summary-card">
          <div className="summary-list-viewport">
            {filteredLogs.length === 0 ? (
              <div className="summary-empty-placeholder">
                <HistoryIcon size={40} className="text-muted" />
                <p>No log rows match your current display criteria.</p>
                {logs.length === 0 && (
                  <Link to="/dashboard/scan" className="text-highlight font-medium underline">
                    Launch active scanning engine pipeline
                  </Link>
                )}
              </div>
            ) : (
              <div className="summary-logs-stack">
                {filteredLogs.map((log, index) => (
                  <div key={log.scannedId || index} className="summary-log-row-item">
                    
                    {/* Status Badging Column */}
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

                    {/* Metadata Content Details Column */}
                    <div className="summary-col-info">
                      <h4>{log.brandName || "Unknown Product"}</h4>
                      <p className="product-subtext">
                        <span className="manufacturer-tag">
                          {log.manufacturer || "Unknown Source"}
                        </span>
                        <span className="divider-dot">•</span>
                        <span className="ingredient-tag">{log.activeIngredient || "No compound listed"}</span>
                        <span className="divider-dot">•</span>
                        <span className="dosage-tag">{log.dosage || "N/A"}</span>
                      </p>
                    </div>

                    {/* System Time Verification Column */}
                    <div className="summary-col-meta">
                      <span className="summary-row-timestamp">{log.timeLogged || "Prior Entry"}</span>
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

export default History;