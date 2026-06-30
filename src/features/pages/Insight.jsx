import React from "react";
import { 
  Brain, 
  TrendingUp, 
  ShieldAlert, 
  CheckCircle, 
  Activity,
  Info
} from "lucide-react";

function Insight() {
  return (
    <div className="dashboard-home-wrapper">
      
      {/* View Header */}
      <div className="dash-view-header">
        <div className="header-title-block">
          <h1>Automated AI Diagnostics & Insights</h1>
          <p>Heuristic audit summaries and systemic risk analysis generated from your active ledger activity.</p>
        </div>
      </div>

      {/* AI Status Accent Banner */}
      <div className="pharma-card insight-ai-banner">
        <div className="insight-banner-flex">
          <div className="ai-banner-text">
            <strong>System Telemetry Analysis Active</strong>
            <span>Continuous Local Ingestion Matrix Engine v1.4.2 parsing background logs.</span>
          </div>
        </div>
      </div>

      {/* Numerical Analytical Metrics */}
      <div className="dashboard-metrics-grid">
        <div className="metric-card-item">
          <div className="metric-icon-wrapper pass-icon-bg">
            <CheckCircle size={20} />
          </div>
          <div className="metric-data-block">
            <span className="metric-label">Integrity Confidence</span>
            <h3>94.2%</h3>
          </div>
        </div>

        <div className="metric-card-item">
          <div className="metric-icon-wrapper alert-icon-bg">
            <ShieldAlert size={20} />
          </div>
          <div className="metric-data-block">
            <span className="metric-label">Anomalous Spike Index</span>
            <h3>High</h3>
          </div>
        </div>

        <div className="metric-card-item">
          <div className="metric-icon-wrapper trend-icon-bg">
            <TrendingUp size={20} />
          </div>
          <div className="metric-data-block">
            <span className="metric-label">Weekly Batch Drift</span>
            <h3>+4.8%</h3>
          </div>
        </div>
      </div>

      {/* Strategic Analytical Briefing Blocks */}
      <div className="dashboard-split-layout">
        
        {/* Left Column: Executive Summary Evaluation */}
        <div className="insight-logs-summary-card">
          <div className="card-header-inline">
            <Brain size={18} className="section-header-icon" />
            <h3>Executive Audit Summary</h3>
          </div>
          
          <div className="insight-narrative-box">
            <p>
              Based on empirical scan logs captured over the running 30-day evaluation interval, systemic product integrity parameters remain within normal historical boundaries. However, localized validation trends suggest an increasing rate of failed integrity parameters among imported compound sets.
            </p>
            <p>
              <strong>Primary Risk Vector:</strong> Unregistered products matching missing active ingredients have spiked during late-shift operations, presenting a notable clustering anomaly.
            </p>
          </div>

          <blockquote className="insight-blockquote">
            <Info size={16} className="blockquote-decorator" />
            <span><strong>Recommendation:</strong> Increase inspection frequency protocols on batches originating from unverified supply loops with non-standard packaging dimensions.</span>
          </blockquote>
        </div>

        {/* Right Column: Targeted Key Anomalies Discovered */}
        <div className="insight-logs-summary-card">
          <div className="card-header-inline">
            <Activity size={18} className="section-header-icon" />
            <h3>Anomalies Detected</h3>
          </div>

          <div className="insight-anomaly-stack">
            
            {/* Anomaly Node 1 */}
            <div className="anomaly-item-row status-border-danger">
              <div className="anomaly-meta-meta">
                <span className="anomaly-tag-danger">Batch Drift</span>
                <span className="anomaly-time-stamp">2 hours ago</span>
              </div>
              <h4>Amoxicillin Counterfeit Cluster</h4>
              <p>Multiple sequential scans failed structural character verification algorithms due to packaging typographical anomalies.</p>
            </div>

            {/* Anomaly Node 2 */}
            <div className="anomaly-item-row status-border-warning">
              <div className="anomaly-meta-meta">
                <span className="anomaly-tag-warning">Supply Chain</span>
                <span className="anomaly-time-stamp">1 day ago</span>
              </div>
              <h4>Unregistered Manufacturer Identification</h4>
              <p>Inbound scans flagged items matching unregistered licensing coordinates from unverified distribution points.</p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

export default Insight;