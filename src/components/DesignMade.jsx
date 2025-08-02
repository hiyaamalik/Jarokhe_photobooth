import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// This component displays the final design and handles sharing/downloading.
function DesignMade({ capturedImages, style, addons, text, font, onBack }) {
  const finalDesignRef = useRef(null);

  const handleDownloadImage = () => {
    if (!finalDesignRef.current) return;
    html2canvas(finalDesignRef.current, { backgroundColor: null }).then(canvas => {
      const link = document.createElement('a');
      link.download = 'jarokhe-photobooth.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  const handleDownloadPdf = () => {
    if (!finalDesignRef.current) return;
    html2canvas(finalDesignRef.current, { backgroundColor: null }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('jarokhe-photobooth.pdf');
    });
  };

  return (
    <div className="photobooth-step-container final-design-container">
      <div className="final-design-wrapper" ref={finalDesignRef}>
        <div className="photostrip">
          {capturedImages.map((img, index) => (
            <div key={index} className="photostrip-cell">
              <img src={img} alt={`Final ${index}`} className={`photostrip-img style-filter-${style.toLowerCase()}`} />
            </div>
          ))}
          <div className="photostrip-footer">
            <p className="final-text" style={{ fontFamily: font }}>{text}</p>
            <div className="final-addons">{addons.join(' ')}</div>
          </div>
        </div>
      </div>

      <div className="sharing-options">
        <h2 className="step-title">Design Made</h2>
        <p className="step-subtitle">Drag to rearrange (feature coming soon!)</p>
        <button className="btn btn-primary" onClick={handleDownloadImage}>Download as Image</button>
        <button className="btn btn-primary" onClick={handleDownloadPdf}>Download as PDF</button>
        <button className="btn btn-secondary" onClick={onBack}>&larr; Start Over</button>
      </div>
    </div>
  );
}

export default DesignMade;
