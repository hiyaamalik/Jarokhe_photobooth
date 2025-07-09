import React, { useEffect, useState } from 'react';
import '../styles/main.css';

const HeroIntro = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onFinish, 2000); // Wait for fade animation
    }, 3000); // Show for 3 seconds

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`hero-container ${fadeOut ? 'fade-out' : ''}`} />
  );
};

export default HeroIntro;
