import React, { useEffect, useState } from 'react';
import './stylres/CarIntroAnimation.css';

const CarIntroAnimation = () => {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 2000); // 2 second animation

    return () => clearTimeout(timer);
  }, []);

  if (!showAnimation) return null;

  return (
    <div className="intro-animation-overlay">
      {/* Logo Display */}
      <div className="logo-display">
        <img 
          src={`${process.env.PUBLIC_URL}/images/logo.png`} 
          alt="Minyamu Motors Logo" 
          className="brand-logo"
        />
        <p className="brand-tagline">Revolutionizing Rides, Elevating Experience</p>
      </div>
      
      {/* Car Animation */}
      <div className="road">
        <div className="css-car"></div>
        <div className="road-line"></div>
      </div>
    </div>
  );
};

export default CarIntroAnimation;