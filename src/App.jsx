import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State to control if the landing page is part of the DOM
  const [showLanding, setShowLanding] = useState(true);
  
  // State to control the fade-out animation
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // After 2.5 seconds, trigger the fade-out animation
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2500);

    // After the fade-out is complete (1s animation), remove the landing page
    const removeTimer = setTimeout(() => {
      setShowLanding(false);
    }, 3500);

    // Cleanup timers if the component unmounts early
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []); // The empty array [] ensures this effect runs only once on mount

  return (
    <>
      {/* The Initial Full-Screen Image */}
      {showLanding && (
        <div className={`landing-container ${isFading ? 'fading' : ''}`}>
          <picture>
            <source media="(min-width: 1024px)" srcSet="/hero-desktop.jpg" />
            <source media="(min-width: 768px)" srcSet="/hero-tablet.jpg" />
            <img 
              src="/hero-mobile.jpg" 
              alt="Hero background"
              className="hero-image"
            />
          </picture>
        </div>
      )}

      {/* The Main Content with the new CSS Frame */}
      {!showLanding && (
        <main className="main-content">
          {/* Each div below is a layer of the frame, from outside to inside */}
          <div className="frame-gold-border">
            <div className="frame-cream-border">
              <div className="frame-floral-border">
                <div className="frame-maroon-border">
                  <div className="frame-arch-container">
                    <div className="welcome-text-container">
                      <h2 className="welcome-subtitle">Welcome to</h2>
                      <h1 className="welcome-title">Jarokhe Photobooth</h1>
                      <p className="welcome-tagline">the one photobooth we knew you needed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default App;
