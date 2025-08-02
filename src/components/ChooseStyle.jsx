import React, { useState } from 'react';

// This component allows the user to select a style for their photos.
function ChooseStyle({ capturedImages, onComplete, onBack }) {
  const [selectedStyle, setSelectedStyle] = useState('Classic');
  const styles = ['Classic', 'Monochrome', 'Vintage', 'Vibrant'];

  return (
    <div className="photobooth-step-container">
      <h2 className="step-title">Choose Style</h2>
      <p className="step-subtitle">Select a look for your photo strip</p>

      <div className="style-selector-container">
        {/* Display a preview of the first 3 images with the selected style */}
        <div className="style-preview-photos">
          {capturedImages.slice(0, 3).map((img, index) => (
            <img 
              key={index} 
              src={img} 
              alt={`Preview ${index}`} 
              className={`style-preview-img style-filter-${selectedStyle.toLowerCase()}`} 
            />
          ))}
        </div>
        
        {/* Buttons to select a style */}
        <div className="style-options">
          {styles.map(style => (
            <button 
              key={style}
              className={`btn btn-style ${selectedStyle === style ? 'active' : ''}`}
              onClick={() => setSelectedStyle(style)}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      <div className="navigation-controls">
        <button className="btn btn-secondary" onClick={onBack}>&larr; Back</button>
        <button className="btn btn-primary" onClick={() => onComplete(selectedStyle)}>Next &rarr;</button>
      </div>
    </div>
  );
}

export default ChooseStyle;
