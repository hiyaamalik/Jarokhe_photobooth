import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>My Awesome Project 🖼️</h1>
      </header>
      
      <main>
        <picture>
          {/* Desktop version (screens wider than 1024px) */}
          <source media="(min-width: 1024px)" srcSet="/hero-desktop.jpg" />
          
          {/* Tablet version (screens wider than 768px) */}
          <source media="(min-width: 768px)" srcSet="/hero-tablet.jpg" />
          
          {/* Mobile version (default) */}
          <img 
            src="/hero-mobile.jpg" 
            alt="A descriptive caption for the hero image"
            className="hero-image"
          />
        </picture>
      </main>
    </div>
  );
}

export default App;