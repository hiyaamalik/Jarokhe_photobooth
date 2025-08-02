import React, { useState, useEffect } from 'react';
import CameraCapture from './components/CameraCapture';
import ChooseStyle from './components/ChooseStyle';
import ChooseAddons from './components/ChooseAddons.jsx';
import AddText from './components/AddText';
import DesignMade from './components/DesignMade';
import './App.css';

function App() {
  // --- STATE MANAGEMENT ---
  // Controls the overall page being displayed ('welcome', 'privacy', 'photobooth')
  const [appPage, setAppPage] = useState('welcome'); 
  
  // Controls the current step within the photobooth flow
  const [photoboothStep, setPhotoboothStep] = useState('capture'); 
  
  // --- DATA STATE ---
  // Stores the 6 images captured by the user
  const [capturedImages, setCapturedImages] = useState([]);
  // Stores the selected style filter (e.g., 'Vintage')
  const [chosenStyle, setChosenStyle] = useState('Classic');
  // Stores the selected emoji addons
  const [selectedAddons, setSelectedAddons] = useState([]);
  // Stores the custom text input by the user
  const [customText, setCustomText] = useState('');
  // Stores the selected font for the custom text
  const [chosenFont, setChosenFont] = useState('Montserrat');

  // --- NAVIGATION & LOGIC ---
  // Resets the photobooth state to start over
  const restartPhotobooth = () => {
    setCapturedImages([]);
    setSelectedAddons([]);
    setCustomText('');
    setChosenFont('Montserrat');
    setChosenStyle('Classic');
    setPhotoboothStep('capture');
  };

  // --- RENDER LOGIC ---
  // This function determines which photobooth step component to render
  const renderPhotobooth = () => {
    switch (photoboothStep) {
      case 'capture':
        return <CameraCapture 
                  capturedImages={capturedImages}
                  setCapturedImages={setCapturedImages}
                  onComplete={() => setPhotoboothStep('style')} 
                />;
      case 'style':
        return <ChooseStyle 
                  capturedImages={capturedImages}
                  onComplete={(style) => { setChosenStyle(style); setPhotoboothStep('addons'); }}
                  onBack={() => setPhotoboothStep('capture')}
                />;
      case 'addons':
        return <ChooseAddons
                  selectedAddons={selectedAddons}
                  setSelectedAddons={setSelectedAddons}
                  onComplete={() => setPhotoboothStep('text')}
                  onBack={() => setPhotoboothStep('style')}
                />;
      case 'text':
        return <AddText
                  text={customText}
                  setText={setCustomText}
                  font={chosenFont}
                  setFont={setChosenFont}
                  onComplete={() => setPhotoboothStep('final')}
                  onBack={() => setPhotoboothStep('addons')}
                />;
      case 'final':
        return <DesignMade
                  capturedImages={capturedImages}
                  style={chosenStyle}
                  addons={selectedAddons}
                  text={customText}
                  font={chosenFont}
                  onBack={restartPhotobooth}
                />;
      default:
        return <div>Error: Unknown photobooth step.</div>;
    }
  };

  // This function determines which main page of the app to render
  const renderAppPage = () => {
    switch (appPage) {
      case 'privacy':
        return <PrivacyPage onBack={() => setAppPage('welcome')} />;
      case 'photobooth':
        return renderPhotobooth();
      case 'welcome':
      default:
        return <WelcomeScreen onStart={() => setAppPage('photobooth')} onPrivacy={() => setAppPage('privacy')} />;
    }
  };

  // The main return uses a loader for the initial splash screen, then renders the current app page
  return <InitialLoader>{renderAppPage()}</InitialLoader>;
}

// --- SUB-COMPONENTS for cleaner code ---

// Handles the initial fade-in animation
const InitialLoader = ({ children }) => {
  const [showLanding, setShowLanding] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsFading(true), 1500);
    const removeTimer = setTimeout(() => setShowLanding(false), 2500);
    return () => { clearTimeout(fadeTimer); clearTimeout(removeTimer); };
  }, []);

  if (showLanding) {
    return (
      <div className={`landing-container ${isFading ? 'fading' : ''}`}>
        <picture>
          <source media="(min-width: 1024px)" srcSet="/hero-desktop.jpg" />
          <source media="(min-width: 768px)" srcSet="/hero-tablet.jpg" />
          <img src="/hero-mobile.jpg" alt="Hero background" className="hero-image" />
        </picture>
      </div>
    );
  }
  return children;
};

// The main welcome screen with the CSS frame
const WelcomeScreen = ({ onStart, onPrivacy }) => (
  <main className="main-content">
    <div className="frame-gold-border"><div className="frame-cream-border"><div className="frame-floral-border"><div className="frame-maroon-border"><div className="frame-arch-container">
      <div className="welcome-text-container">
        <h1 className="welcome-title">Jarokhe</h1>
        <p className="welcome-tagline">the photobooth you needed</p>
        <p className="welcome-description">NOT JUST A PHOTOBOOTH IT'S YOUR IT GIRL MOMENT WITH A DESI TWIST. SNAP, PRINT, SLAY</p>
        <div className="welcome-buttons-container">
          <button className="btn btn-primary" onClick={onStart}>Get Started</button>
          <button className="btn btn-secondary" onClick={onPrivacy}>Privacy Policy</button>
        </div>
        <p className="welcome-footer-text">Μόνη</p>
      </div>
    </div></div></div></div></div>
  </main>
);

// The simple privacy policy page
const PrivacyPage = ({ onBack }) => (
  <main className="main-content">
    <div className="privacy-policy-container">
      <h2>privacy policy</h2>
      <h3>and only yours.</h3>
      <p>At Jarokhe, your memories are yours. We do not store, share, or upload any of your images to the cloud or any external servers. All photos are processed locally and temporarily for your session only. Once your photo is printed or exported, it's gone for good from the system.</p>
      <button className="btn btn-secondary" onClick={onBack}>&larr; Back</button>
    </div>
  </main>
);

export default App;
