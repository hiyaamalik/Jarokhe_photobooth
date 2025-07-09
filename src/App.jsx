import React, { useState } from 'react';
import HeroIntro from './components/HeroIntro';
import './styles/main.css';

const App = () => {
  const [showLanding, setShowLanding] = useState(false);

  return (
    <>
      {!showLanding && <HeroIntro onFinish={() => setShowLanding(true)} />}

      {showLanding && (
        <div className="landing">
          <h1>Welcome to Ethnic Photobooth 📸</h1>
          <p>Capture memories with tradition. Add your favorite frames and print instantly.</p>
        </div>
      )}
    </>
  );
};

export default App;
