import React, { useRef, useEffect, useState } from 'react';

// This component handles the camera feed and capturing photos.
function CameraCapture({ onComplete, setCapturedImages, capturedImages }) {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState('');
  const [isFlashing, setIsFlashing] = useState(false); // State for flash effect

  // Effect to start the camera stream when the component mounts
  useEffect(() => {
    let currentStream;
    async function getCameraStream() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
          currentStream = stream;
          setStream(stream);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Error accessing camera:", err);
          setError('Camera access was denied. Please allow camera permissions in your browser settings.');
        }
      } else {
        setError('Your browser does not support camera access.');
      }
    }

    getCameraStream();

    // Cleanup function to stop the stream when the component unmounts
    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Function to capture a photo from the video feed
  const handleCapture = () => {
    if (capturedImages.length >= 6) return;

    // Trigger flash effect for visual feedback
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 150);

    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    
    const imageUrl = canvas.toDataURL('image/jpeg');
    setCapturedImages(prevImages => [...prevImages, imageUrl]);
  };

  // Function to clear the last captured photo
  const handleClearLast = () => {
    setCapturedImages(prevImages => prevImages.slice(0, -1));
  };
  
  // Function to clear all captured photos and start over
  const handleClearAll = () => {
    setCapturedImages([]);
  };

  return (
    <div className="photobooth-step-container">
      <h2 className="step-title">Camera</h2>
      <p className="step-subtitle">Capture six pics</p>
      
      {error ? (
        <div className="camera-error">{error}</div>
      ) : (
        <div className="video-wrapper">
          <video ref={videoRef} autoPlay playsInline muted className="video-feed"></video>
          {isFlashing && <div className="flash-effect"></div>}
        </div>
      )}
      
      <div className="thumbnails-container">
        {Array(6).fill(null).map((_, index) => (
          <div key={index} className="thumbnail-placeholder">
            {capturedImages[index] && (
              <img src={capturedImages[index]} alt={`Capture ${index + 1}`} className="thumbnail-image" />
            )}
          </div>
        ))}
      </div>

      <div className="camera-controls-main">
        <button 
          className="btn btn-capture" 
          onClick={handleCapture} 
          disabled={capturedImages.length >= 6 || !!error}
        >
          Capture ({capturedImages.length}/6)
        </button>
      </div>

      <div className="camera-controls-secondary">
        <button 
          className="btn btn-secondary" 
          onClick={handleClearLast}
          disabled={capturedImages.length === 0 || !!error}
        >
          Clear Last
        </button>
        <button 
          className="btn btn-primary" 
          onClick={onComplete}
          disabled={capturedImages.length < 6 || !!error}
        >
          Next &rarr;
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={handleClearAll}
          disabled={capturedImages.length === 0 || !!error}
        >
          Retake All
        </button>
      </div>
    </div>
  );
}

export default CameraCapture;
