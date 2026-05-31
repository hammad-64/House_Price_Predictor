import { useState, useRef } from "react"
import "./App.css"

const fieldOptions = {
  GrLivArea: { label: "Above Ground Living Area", unit: "sq ft", options: [500, 750, 1000, 1250, 1500, 1750, 2000, 2500, 3000, 3500, 4000] },
  BedroomAbvGr: { label: "Bedrooms", unit: "", options: [1, 2, 3, 4, 5, 6] },
  FullBath: { label: "Full Bathrooms", unit: "", options: [1, 2, 3, 4] },
  GarageArea: { label: "Garage Area", unit: "sq ft", options: [0, 200, 300, 400, 500, 600, 700, 800] },
  YearBuilt: { label: "Year Built", unit: "", options: [1900, 1920, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2005, 2010, 2015, 2020] },
  OverallQual: { label: "Overall Quality", unit: "/10", options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  TotalBsmtSF: { label: "Basement Area", unit: "sq ft", options: [0, 200, 400, 600, 800, 1000, 1200, 1500, 2000] },
  LotArea: { label: "Lot Area", unit: "sq ft", options: [2000, 4000, 6000, 8000, 10000, 12000, 15000, 20000, 30000] },
}

function SelectField({ fieldKey, value, onChange }) {
  const [isCustom, setIsCustom] = useState(false)
  const field = fieldOptions[fieldKey]

  return (
    <div className="field-wrap">
      <label className="field-label">
        {field.label}
        {field.unit && <span className="field-unit">{field.unit}</span>}
      </label>
      {isCustom ? (
        <div className="custom-input-wrap">
          <input
            type="number"
            className="field-input"
            placeholder={`Custom value`}
            value={value}
            onChange={(e) => onChange(fieldKey, e.target.value)}
          />
          <button className="toggle-btn" onClick={() => { setIsCustom(false); onChange(fieldKey, "") }}>↩ List</button>
        </div>
      ) : (
        <div className="custom-input-wrap">
          <select
            className="field-input"
            value={value}
            onChange={(e) => onChange(fieldKey, e.target.value)}
          >
            <option value="">— Select —</option>
            {field.options.map(opt => (
              <option key={opt} value={opt}>{opt}{field.unit}</option>
            ))}
          </select>
          <button className="toggle-btn" onClick={() => { setIsCustom(true); onChange(fieldKey, "") }}>✎ Custom</button>
        </div>
      )}
    </div>
  )
}

export default function App() {
  const predictorRef = useRef(null)
  const [form, setForm] = useState(Object.fromEntries(Object.keys(fieldOptions).map(k => [k, ""])))
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  const scrollToPredictor = () => {
    predictorRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async () => {
    const missing = Object.keys(form).filter(k => form[k] === "" || form[k] === null)
    if (missing.length > 0) { setError("Please fill in all fields before predicting."); return }
    setLoading(true); setError(null); setPrediction(null)
    try {
      const body = Object.fromEntries(Object.keys(form).map(k => [k, parseFloat(form[k])]))
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      setPrediction(data.predicted_price)
    } catch { setError("Cannot connect to server. Make sure Flask backend is running.") }
    setLoading(false)
  }

  const allFilled = Object.values(form).every(v => v !== "" && v !== null)

  return (
    <div className="page">
      {/* HERO */}
      <nav className="navbar">
        <span className="nav-logo">🏠 HomePricer</span>
      </nav>
      <section className="hero">
        <div className="hero-bg">
          <div className="grid-lines" />
          <div className="orb orb1" />
          <div className="orb orb2" />
          <div className="orb orb3" />
        </div>
        <div className="hero-content">
          <div className="hero-badge">Ames, Iowa · United States</div>
          <h1 className="hero-title">
            <span className="title-line1">What's Your</span>
            <span className="title-line2">Home Worth?</span>
          </h1>
          <p className="hero-desc">
            Powered by a Random Forest ML model trained on <strong>1,460 real homes</strong> from Ames, Iowa.
            Enter your house details and get an instant price estimate with <strong>89% accuracy</strong>.
          </p>
          <div className="hero-stats">
            <div className="stat"><span className="stat-num">1,460</span><span className="stat-label">Homes Trained</span></div>
            <div className="stat-divider" />
            <div className="stat"><span className="stat-num">89%</span><span className="stat-label">Accuracy</span></div>
            <div className="stat-divider" />
            <div className="stat"><span className="stat-num">80</span><span className="stat-label">Features</span></div>
          </div>
          <button className="hero-cta" onClick={scrollToPredictor}>
            <span>Predict My Home Price</span>
            <span className="cta-arrow">↓</span>
          </button>
        </div>
        <div className="house-illustration">
          <div className="house-svg">
            <div className="house-roof" />
            <div className="house-body">
              <div className="house-window" />
              <div className="house-window" />
              <div className="house-door" />
            </div>
          </div>
        </div>
      </section>

      {/* PREDICTOR */}
      <section className="predictor-section" ref={predictorRef}>
        <div className="predictor-container">
          <div className="predictor-header">
            <div className="predictor-tag">ML-Powered Estimator</div>
            <h2 className="predictor-title">Enter House Details</h2>
            <p className="predictor-subtitle">Select from common values or enter a custom number for each field</p>
          </div>

          <div className="fields-grid">
            {Object.keys(fieldOptions).map(key => (
              <SelectField key={key} fieldKey={key} value={form[key]} onChange={handleChange} />
            ))}
          </div>

          <div className="predict-actions">
            <button className="predict-btn" onClick={handleSubmit} disabled={loading || !allFilled}>
              {loading ? <span className="btn-loading"><span className="spinner" />Analyzing...</span> : "Calculate Price Estimate"}
            </button>
            {!allFilled && <p className="hint-text">Fill in all fields to enable prediction</p>}
          </div>

          {error && <div className="error-box">{error}</div>}

          {prediction && (
            <div className="result-box">
              <div className="result-label">Estimated Market Value</div>
              <div className="result-price">${prediction.toLocaleString()}</div>
              <div className="result-note">Based on Ames, Iowa housing data · Random Forest Model · ±$17,498 avg error</div>
              <div className="result-bar">
                <div className="result-bar-fill" style={{ width: `${Math.min((prediction / 500000) * 100, 100)}%` }} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-copy">© {new Date().getFullYear()} Built by Hammad · Trained on Kaggle Ames Housing Dataset · For educational purposes only</span>
        </div>
      </footer>
    </div>
  )
}