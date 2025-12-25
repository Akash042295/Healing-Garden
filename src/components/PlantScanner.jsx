// src/components/PlantScanner.jsx

import React, { useRef, useState, useEffect } from 'react';
import '../styles/PlantScanner.css';

const PlantScanner = ({ onClose, onDetected }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const modalRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadPreview, setUploadPreview] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);

  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error('Camera access denied:', err);
      setError('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      try {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      } catch (e) {}
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  const handleClose = () => {
    stopCamera();
    setScanResult(null);
    setUploadPreview(null);
    setError(null);
    setIsLoading(false);
    onClose();
  };

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // NEW: close when clicking anywhere outside the modal
  useEffect(() => {
    const handleDocClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    };
    document.addEventListener('mousedown', handleDocClick);
    document.addEventListener('touchstart', handleDocClick);
    return () => {
      document.removeEventListener('mousedown', handleDocClick);
      document.removeEventListener('touchstart', handleDocClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const context = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0);
    const imageData = canvasRef.current.toDataURL('image/jpeg');
    stopCamera();
    setUploadPreview(imageData);
    await analyzePlant(imageData);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      const imageData = event.target?.result;
      if (typeof imageData === 'string') {
        setUploadPreview(imageData);
        await analyzePlant(imageData);
      }
    };
    reader.readAsDataURL(file);
  };

  const analyzePlant = async (imageBase64) => {
    setIsLoading(true);
    setError(null);
    try {
      try {
        const response = await fetch('http://localhost:5000/api/scan-plant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64 })
        });
        const data = await response.json();
        if (data.success) {
          setScanResult({
            name: data.plantName,
            scientificName: data.scientificName,
            description: data.description,
            benefits: data.benefits,
            careInstructions: data.careInstructions,
            wateringNeeds: data.wateringNeeds,
            sunlight: data.sunlight,
            toxicity: data.toxicity,
            image: imageBase64
          });
          setIsLoading(false);
          return;
        }
      } catch (backendError) {
        console.warn('Backend API not available, using local Gemini API');
      }

      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      if (!apiKey) {
        setError('Plant scanning is not configured. Please set up your API key.');
        setIsLoading(false);
        return;
      }

      const base64Data = imageBase64.replace(/^data:image\/[^;]+;base64,/, '');
      const geminiResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { inlineData: { mimeType: 'image/jpeg', data: base64Data } },
              { text: `Analyze this plant image and provide the following information in JSON format:
{ "plantName": "Common name", "scientificName": "Scientific name", "description": "2-3 sentences", "benefits": ["..."], "careInstructions": "...", "wateringNeeds":"...", "sunlight":"...", "toxicity":"..." }
If you cannot identify the plant, respond with: {"error":"Plant not identifiable"}` }
            ]
          }]
        })
      });

      const geminiData = await geminiResponse.json();
      if (!geminiData.candidates || !geminiData.candidates[0]) {
        setError('Could not analyze plant. Please try a clearer image.');
        setIsLoading(false);
        return;
      }
      const text = geminiData.candidates[0].content.parts[0].text;
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        setError('Could not identify plant. Please try a clearer image.');
        setIsLoading(false);
        return;
      }
      const plantData = JSON.parse(jsonMatch[0]);
      if (plantData.error) {
        setError(plantData.error);
        setIsLoading(false);
        return;
      }
      setScanResult({
        name: plantData.plantName,
        scientificName: plantData.scientificName,
        description: plantData.description,
        benefits: plantData.benefits,
        careInstructions: plantData.careInstructions,
        wateringNeeds: plantData.wateringNeeds,
        sunlight: plantData.sunlight,
        toxicity: plantData.toxicity,
        image: imageBase64
      });
    } catch (err) {
      console.error('Plant scanning error:', err);
      setError('Error analyzing plant. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetScanner = () => {
    setScanResult(null);
    setUploadPreview(null);
    setIsCameraActive(false);
    setError(null);
  };

  return (
    <div className="scanner-modal-overlay">
      <div className="scanner-modal" ref={modalRef}>
        <div className="scanner-header">
          <h2>🌿 Plant Scanner</h2>
          <button className="close-btn" onClick={handleClose}>✕</button>
        </div>

        <div className="scanner-content">
          {error && <div className="error-message">⚠️ {error}</div>}

          {scanResult ? (
            <div className="result-section">
              <div className="result-image-container">
                <img src={scanResult.image} alt={scanResult.name} className="result-image" />
              </div>
              <div className="result-info">
                <h3>{scanResult.name}</h3>
                <p className="scientific-name"><em>{scanResult.scientificName}</em></p>
                <p className="description">{scanResult.description}</p>

                <div className="info-grid">
                  <div className="info-box"><strong>💧 Watering</strong><p>{scanResult.wateringNeeds}</p></div>
                  <div className="info-box"><strong>☀️ Sunlight</strong><p>{scanResult.sunlight}</p></div>
                  <div className="info-box"><strong>⚠️ Toxicity</strong><p>{scanResult.toxicity}</p></div>
                </div>

                <div className="benefits-section">
                  <strong>Benefits:</strong>
                  <ul>{scanResult.benefits?.map((b, i) => <li key={i}>{b}</li>)}</ul>
                </div>

                <p className="care-instructions"><strong>Care:</strong> {scanResult.careInstructions}</p>

                <button className="btn-scan-another" onClick={resetScanner}>🔄 Scan Another Plant</button>
              </div>
            </div>
          ) : isCameraActive ? (
            <div className="camera-section">
              <video ref={videoRef} autoPlay playsInline className="camera-feed" />
              <div className="camera-controls">
                <button className="btn-capture" onClick={capturePhoto} disabled={isLoading}>📸 Capture</button>
                <button className="btn-close-camera" onClick={stopCamera}>✕ Close</button>
              </div>
            </div>
          ) : uploadPreview ? (
            <div className="preview-section">
              <img src={uploadPreview} alt="Plant preview" className="preview-image" />
              <button className="btn-retake" onClick={() => { setUploadPreview(null); setError(null); fileInputRef.current?.click(); }}>Try Another</button>
            </div>
          ) : (
            <div className="options-section">
              <button className="option-btn" onClick={startCamera}><span className="icon">📷</span><span>Take Photo</span></button>
              <button className="option-btn" onClick={() => fileInputRef.current?.click()}><span className="icon">🖼️</span><span>Upload Photo</span></button>
            </div>
          )}

          {isLoading && (
            <div className="loading-overlay">
              <div className="spinner" />
              <p>Analyzing plant...</p>
            </div>
          )}
        </div>

        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
};

export default PlantScanner;