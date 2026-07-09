import React, { useState, useRef } from "react";
import { Camera, Upload, AlertCircle, CheckCircle2, RotateCcw, VideoOff } from "lucide-react";
import Tesseract from "tesseract.js";

const REGISTERED_DRUGS_DB = [
  {
    brandName: "Amoxicillin",
    activeIngredient: "Amoxicillin Trihydrate",
    manufacturer: "Kinapharma Ltd",
    dosage: "500mg"
  },
  {
    brandName: "Paracetamol",
    activeIngredient: "Acetaminophen",
    manufacturer: "M&G Pharmaceuticals",
    dosage: "500mg"
  },
  {
    brandName: "Artesunate",
    activeIngredient: "Artesunate 50mg / Amodiaquine 153mg",
    manufacturer: "Danadams Pharmaceuticals",
    dosage: "Composite"
  },
  {
    brandName: "Wormplex 400",
    activeIngredient: "Albendazole",
    manufacturer: "Pharma Nova Ltd",
    dosage: "400mg"
  },
  {
    brandName: "Gebedol",
    activeIngredient: "Paracetamol 325mg / Diclofenac Potassium 50mg / Caffeine 30mg",
    manufacturer: "Gokals Laborex Ltd",
    dosage: "Composite"
  },
  {
    brandName: "Koflyn",
    activeIngredient: "Diphenhydramine HCl / Ammonium Chloride / Sodium Citrate",
    manufacturer: "Kinapharma Ltd",
    dosage: "Composite"
  },
  {
    brandName: "Lonart",
    activeIngredient: "Artemether 20mg / Lumefantrine 120mg",
    manufacturer: "Bliss GVS Pharma",
    dosage: "Composite"
  },
  {
    brandName: "Cipro-Med",
    activeIngredient: "Ciprofloxacin",
    manufacturer: "Medreich Ltd",
    dosage: "500mg"
  },
  {
    brandName: "Ganda Plus",
    activeIngredient: "Metronidazole",
    manufacturer: "Ernest Chemists Ltd",
    dosage: "400mg"
  },
  {
    brandName: "Zinnat",
    activeIngredient: "Cefuroxime Axetil",
    manufacturer: "GlaxoSmithKline",
    dosage: "250mg"
  },
  {
    brandName: "Amlodipine",
    activeIngredient: "Amlodipine Besylate",
    manufacturer: "Letap Pharmaceuticals Ltd",
    dosage: "5mg"
  },
  {
    brandName: "Metformin",
    activeIngredient: "Metformin Hydrochloride",
    manufacturer: "M&G Pharmaceuticals",
    dosage: "500mg"
  },
  {
    brandName: "Ventolin",
    activeIngredient: "Salbutamol",
    manufacturer: "GlaxoSmithKline",
    dosage: "100mcg/dose"
  }
];


function Scan() {
  // Core functional app states
  const [image, setImage] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState("");
  const [verdict, setVerdict] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Hardware stream references
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // 1. Spins up device hardware capturing feeds
  const startCamera = async () => {
    setImage(null);
    setVerdict(null);
    setProgress("");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });

      streamRef.current = stream;
      setIsCameraActive(true);

      // Delays track assignment slightly to guarantee DOM elements are mounted
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 50);
    } catch (err) {
      console.error("Camera access denied or unavailable:", err);
      alert("Unable to open camera. Please check your browser's permissions.");
    }
  };

  // 2. Safely releases active video tracks
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  // 3. Grabs a screenshot slice from live playback stream frames
  const capturePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/jpeg");
    setImage(dataUrl);
    stopCamera();
  };

  // 4. Local file uploads
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedFileExt = ["jpg", "jpeg", "png", "webp", "bmp", "heic", "heif", "avif", "pjp", "pjpeg"];
    const fileExt = file.name.split(".").pop().toLowerCase();

    if (!allowedFileExt.includes(fileExt)) {
      alert('Invalid format. Accepted filetypes: "jpg", "jpeg", "png", "webp"');
      return;
    }

    stopCamera();
    setImage(URL.createObjectURL(file));
    setVerdict(null);
    setProgress("");
  };

  // 5. Tesseract Core Processing Matrix Pipeline
  const runVerificationPipeline = async () => {
    if (!image) return;

    setProcessing(true);
    setVerdict(null);
    setProgress("Initializing OCR Core Engine...");

    try {
      // Run the image through the Tesseract engine
      const { data: { text } } = await Tesseract.recognize(image, "eng", {
        logger: (m) => {
          if (m.status === "recognizing") {
            setProgress(`Analyzing Text Lines: ${Math.floor(m.progress * 100)}%`);
          }
        }
      });

      const normalizedScannedText = text.toLowerCase();

      console.log(normalizedScannedText);

      let matchedDrug = REGISTERED_DRUGS_DB.find((drug) =>
        normalizedScannedText.includes(drug.brandName.toLowerCase()) ||
        normalizedScannedText.includes(drug.activeIngredient.toLowerCase())
      );

      let scanResult = null;
      const timestamp = new Date().toLocaleString("en-GB", {
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit"
      });

      if (matchedDrug) {
        // MATCH DETECTED: Uses matching database credentials
        scanResult = {
          ...matchedDrug,
          status: "REGISTERED",
          timeLogged: timestamp,
          scannedId: Date.now()
        };
      } else {
        // NO DATABASE MATCH FOUND: Parse out the real scanned text dynamically!
        const rawLines = text
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0);

        // Fallback title text if the parsed block layout yields zero characters
        const detectedTitle = rawLines.length > 0 ? rawLines[0] : "Unreadable Print Layout";

        scanResult = {
          brandName: detectedTitle,
          activeIngredient: rawLines.length > 1 ? rawLines.slice(1, 3).join(", ") : "Undetermined Label Compound",
          manufacturer: "Unlisted Source Manufacturer",
          dosage: "Unknown",
          status: "FLAGGED", 
          timeLogged: timestamp,
          scannedId: Date.now()
        };

        console.log(scanResult);
      }
      

      // Append the record to localStorage for Dashboard integration
      const currentLogsRaw = localStorage.getItem("app_scans");
      const currentLogs = currentLogsRaw ? JSON.parse(currentLogsRaw) : [];
      localStorage.setItem("app_scans", JSON.stringify([scanResult, ...currentLogs]));

      setVerdict(scanResult);
    } catch (error) {
      console.error("OCR Extraction Crash:", error);
      setProgress("Processing error. Ensure image quality is high.");
    } finally {
      setProcessing(false);
    }
  };

  // Component View Template Render Matrix
  return (
    <div className="scanner-dashboard-wrapper">
      <div className="grid-container">

        {/* LEFT CARD: Capture Frame Viewport */}
        <div className="pharma-card capture-viewport-card">
          <div className="card-header">
            <h2>Source Image Capture</h2>
            <p>Upload or snap a clear photo of the medicine box text panel.</p>
          </div>

          <div className="viewport-preview-frame">
            {isCameraActive ? (
              <video ref={videoRef} autoPlay playsInline />
            ) : image ? (
              <img src={image} alt="Drug box snapshot" className="uploaded-preview-img" />
            ) : (
              <div className="viewport-empty-placeholder">
                <Camera className="icon-large" size={48} />
                <p>No active camera frame detected.</p>
                <span>Turn on your camera or choose a document photo to begin verification.</span>
              </div>
            )}
          </div>

          <div className="capture-action-controls">
            {isCameraActive ? (
              <>
                <button onClick={capturePhoto} className="btn btn-primary">
                  <Camera size={18} />
                  <span >Snap Photo</span>
                </button>
                <button onClick={stopCamera} className="btn btn-secondary">
                  <VideoOff size={18} />
                  <span>Cancel</span>
                </button>
              </>
            ) : (
              <>
                <button onClick={startCamera} className="btn btn-secondary">
                  <Camera size={18} />
                  <span>Use Camera</span>
                </button>

                <label className="btn btn-secondary cursor-pointer">
                  <Upload size={18} />
                  <span>Upload File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="hidden-file-input"
                  />
                </label>
              </>
            )}
          </div>

          {image && !isCameraActive && (
            <button
              onClick={runVerificationPipeline}
              disabled={processing}
              className="btn btn-primary"
              style={{ marginTop: "1.25rem", width: "100%" }}
            >
              <CheckCircle2 size={18} />
              <span>{processing ? "Analyzing Text..." : "Verify Product"}</span>
            </button>
          )}

          {processing && (
            <div className="ocr-progress-container" style={{ marginTop: "1rem" }}>
              <div className="progress-spinner"></div>
              <p className="progress-status-text">{progress}</p>
            </div>
          )}
        </div>

        {/* RIGHT CARD: Database Verification Sheets */}
        <div className="preview-card status-result-card">
          <div className="card-header">
            <h2>Verification Analysis</h2>
            <p>Cross-referenced results against the regulatory registry database.</p>
          </div>

          {!verdict ? (
            <div className="result-empty-placeholder">
              <AlertCircle size={40} />
              <p>Awaiting Scanner Input</p>
              <span>Upload an image and trigger the verification engine to see authenticity status.</span>
            </div>
          ) : (
            <div className="result-display-wrapper">
              <div className={`status-banner banner-${verdict.status.toLowerCase()}`}>
                <div className="banner-icon-frame">
                  <CheckCircle2 size={24} />
                </div>
                <div className="banner-text-frame">
                  <h3>Product Status: {verdict.status}</h3>
                  <p>
                    {verdict.status === "REGISTERED"
                      ? "This product is fully verified."
                      : "Warning: Unlisted manufacturing data."}
                  </p>
                </div>
              </div>

              <div className="metadata-details-grid">
                <div className="metadata-row">
                  <span className="field-label">Brand Name</span>
                  <span className="field-value text-highlight">{verdict.brandName}</span>
                </div>
                <div className="metadata-row">
                  <span className="field-label">Active Chemical Ingredient</span>
                  <span className="field-value">{verdict.activeIngredient}</span>
                </div>
                <div className="metadata-row">
                  <span className="field-label">Licensed Manufacturer</span>
                  <span className="field-value">{verdict.manufacturer}</span>
                </div>
                <div className="metadata-row">
                  <span className="field-label">Declared Unit Dosage</span>
                  <span className="field-value">{verdict.dosage}</span>
                </div>
                <div className="metadata-row">
                  <span className="field-label">Timestamp Logged</span>
                  <span className="field-value timestamp-value">{verdict.timeLogged}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setImage(null);
                  setVerdict(null);
                }}
                className="btn btn-reset"
              >
                <RotateCcw size={16} />
                <span>Reset Scanner Panel</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Scan;