import React from 'react';

// This component lets users select fun "add-on" stickers.
function ChooseAddons({ selectedAddons, setSelectedAddons, onComplete, onBack }) {
  // A list of available emoji stickers
  const availableAddons = ['💖', '✨', '🎉', '😎', '🔥', '👑', '😂', '😍'];

  // This function adds an addon if it's not selected, or removes it if it is.
  const toggleAddon = (addon) => {
    setSelectedAddons(prevSelected => 
      prevSelected.includes(addon) 
        ? prevSelected.filter(a => a !== addon) // Remove the addon
        : [...prevSelected, addon]                // Add the addon
    );
  };

  return (
    <div className="photobooth-step-container">
      <h2 className="step-title">Choose Add-ons</h2>
      <p className="step-subtitle">Select some fun extras</p>

      {/* A grid to display all the available addon buttons */}
      <div className="addons-grid">
        {availableAddons.map(addon => (
          <button 
            key={addon}
            // The 'active' class is added if the addon is in the selectedAddons array
            className={`btn-addon ${selectedAddons.includes(addon) ? 'active' : ''}`}
            onClick={() => toggleAddon(addon)}
          >
            {addon}
          </button>
        ))}
      </div>
      
      {/* A small preview showing which addons have been selected */}
      <p className="step-subtitle">
        Selected: {selectedAddons.join(' ')}
      </p>

      {/* Navigation buttons to go to the previous or next step */}
      <div className="navigation-controls">
        <button className="btn btn-secondary" onClick={onBack}>&larr; Back</button>
        <button className="btn btn-primary" onClick={onComplete}>Next &rarr;</button>
      </div>
    </div>
  );
}

export default ChooseAddons;
