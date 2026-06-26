# pHarMa — Product Authenticity & Verification Terminal

An advanced, frontend-driven verification dashboard and scanner application built to identify unregistered, counterfeit, or unverified pharmaceutical items. The application operates entirely client-side using browser-based OCR technology and local telemetry databases, prioritizing deployment efficiency and data confidentiality.

---

## 🚀 Key Architectural Features

**Analytics Control Center Dashboard**  
Real-time telemetry computing authenticity rates, document pass statistics, and live activity trackers.

**OCR-Powered Verification Ingestion Engine**  
Utilizes localized computer vision strings matching against a mock regulatory reference registry.

**Dual-Layer Data Privacy Ledger**
- **System Ledger History** (Authenticated Auth Guard) — Full administrative access with search filters, category selectors, and database purge options.
- **Public Warning Registry** (Public Safety Track) — An unauthenticated workspace exposing only non-verified or flagged high-risk products.

**Protected Route Guardians**  
Enforces localized route security via a wrapper that intercepts unauthorized manual address bar paths.

---

## 🛠️ Tech Stack & Framework Footprint

| Component | Technology |
|-----------|------------|
| **Core UI Engine** | React (Functional Components + Lifecycle Hooks) |
| **Routing Network** | react-router-dom (Nested Layout + Dynamic Guard Transitions) |
| **Iconography** | lucide-react |
| **Text Ingestion / Extractor** | tesseract.js (Client-side OCR) |
| **Data Node Architecture** | Web Storage API (localStorage serialization) |
| **Design System** | Custom CSS (Dash.css) — Zero external framework weight |

---

## 📂 Project Directory Breakdown

```
├── src/
│   ├── assets/                 # Static media assets (hero imagery, icons)
│   ├── features/
│   │   ├── auth/
│   │   │   ├── Auth.css        # Authentication UI specific layout sheets
│   │   │   ├── ProtectedRoute.jsx # Route security layer intercepting sessions
│   │   │   ├── SignIn.jsx      # Portal administrative entry screen
│   │   │   └── SignUP.jsx      # Registry screen for access authorization
│   │   └── pages/
│   │       ├── Dash.css        # Central Dashboard control shell tokens
│   │       ├── Dashboard.jsx   # Metrics, core summaries, and pass rate trackers
│   │       ├── DashLayout.jsx  # Context wrapper containing navigation rails
│   │       ├── HistInsight.css # Specialized sheets handling lists and analysis logs
│   │       ├── History.jsx     # Master log file ledger track
│   │       ├── Insight.jsx     # Automated heuristic diagnostic analysis summary view
│   │       ├── PublicRegistry.jsx # Open-access restricted item tracker
│   │       ├── Scan.jsx        # Image capture manipulation processing frame
│   │       ├── Unregistered.jsx# Suspicious batch evaluation page
│   │       └── User.jsx        # User Profile page --not developed yet
│   ├── sections/               # Public landing home sections
│   │   ├── Nav.jsx             
│   │   ├── Hero.jsx            
│   │   └── Footer.jsx          
│   ├── App.css                 # Base globally shared stylesheet rules
│   ├── App.jsx                 # Entry Route engine map architecture
│   ├── index.css               # Native CSS typography properties
│   └── main.jsx                # Layout component element mount node
```

---

## ⚙️ Setup & Local Deployment Guidelines

### Prerequisites

Ensure your local environment has:
- **Node.js** v18.0.0 or higher
- **npm** or **yarn** package manager

### Installation Steps

**1. Clone the repository**

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/pharma-scanner-dashboard.git
cd pharma-scanner-dashboard
```

**2. Install dependencies**

```bash
npm install
```

**3. Start the development server**

```bash
npm run dev
```

The application will be available at `http://localhost:5173/` in your browser.

---

## 🔐 Authentication & Local Mock Configuration

This application operates with a **serverless architecture pattern**, using browser-based data storage for verification tokens and historical logs:

**Access Token Authorization**  
Entering valid credentials on the Login screen stores a token payload (`user_token`) directly in localStorage.

**Session Lifecycle Management**  
Clicking Logout triggers an event handler that clears the `user_token` from browser storage and redirects to the landing page.

---

## 📝 Regulatory Reference Seed Database

The scanning layout parses character structures directly against the following initialized data block (`Scan.jsx`):

| Brand Name | Active Chemical Ingredient | Licensed Manufacturer | Declared Unit Dosage |
| :--- | :--- | :--- | :--- |
| **Amoxicillin** | Amoxicillin Trihydrate | Kinapharma Ltd | 500mg |
| **Paracetamol** | Acetaminophen | M&G Pharmaceuticals | 500mg |
| **Artesunate** | Artesunate 50mg / Amodiaquine 153mg | Danadams Pharmaceuticals | Composite |
| **Wormplex 400** | Albendazole | Pharma Nova Ltd | 400mg |
| **Gebedol** | Paracetamol 325mg / Diclofenac Potassium 50mg / Caffeine 30mg | Gokals Laborex Ltd | Composite |
| **Koflyn** | Diphenhydramine HCl / Ammonium Chloride / Sodium Citrate | Kinapharma Ltd | Composite |
| **Lonart** | Artemether 20mg / Lumefantrine 120mg | Bliss GVS Pharma | Composite |
| **Cipro-Med** | Ciprofloxacin | Medreich Ltd | 500mg |
| **Ganda Plus** | Metronidazole | Ernest Chemists Ltd | 400mg |
| **Zinnat** | Cefuroxime Axetil | GlaxoSmithKline | 250mg |
| **Amlodipine** | Amlodipine Besylate | Letap Pharmaceuticals Ltd | 5mg |
| **Metformin** | Metformin Hydrochloride | M&G Pharmaceuticals | 500mg |
| **Ventolin** | Salbutamol | GlaxoSmithKline | 100mcg/dose |

Any scanning capture payload mismatching this matrix is explicitly tagged with a `FLAGGED` status configuration and isolated directly inside the **Public Warning Registry**.

---

## 📄 License

This project is provided as-is for pharmaceutical verification purposes.
