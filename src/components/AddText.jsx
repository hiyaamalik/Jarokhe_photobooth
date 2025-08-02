import React from 'react';

// This component allows users to add custom text and choose a font.
function AddText({ text, setText, font, setFont, onComplete, onBack }) {
  const availableFonts = ['Montserrat', 'Playfair Display', 'Caveat', 'Lobster'];

  return (
    <div className="photobooth-step-container">
      <h2 className="step-title">Add Text</h2>
      <p className="step-subtitle">Personalize your photo strip</p>

      <div className="text-input-container">
        <input 
          type="text"
          className="text-input"
          placeholder="Type here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <select 
          className="font-selector"
          value={font}
          onChange={(e) => setFont(e.target.value)}
        >
          {availableFonts.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>
      
      <p className="text-preview" style={{ fontFamily: font }}>
        {text || 'Your text will appear here'}
      </p>

      <div className="navigation-controls">
        <button className="btn btn-secondary" onClick={onBack}>&larr; Back</button>
        <button className="btn btn-primary" onClick={onComplete}>Finish &rarr;</button>
      </div>
    </div>
  );
}

export default AddText;
