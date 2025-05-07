import React from 'react';
import { FaFacebookSquare, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import './stylres/Footer.css'; // Ensure you have a CSS file for styling

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">

        <div className="footer-section">
          <h5>Contact Us</h5>
          <p>
            <FaPhoneAlt className="footer-icon" />
            <a href="tel:+254745170595" className="footer-link">+254 745 170595</a>
          </p>
        </div>

        <div className="footer-section">
          <h5>Follow Us</h5>
          <p>
            <FaFacebookSquare className="footer-icon" />
            <a 
              href="https://www.facebook.com/p/Minyamu-Motors-Limited-100077936731327/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-link"
            >
              Facebook Page
            </a>
          </p>
        </div>

        <div className="footer-section">
          <h5>Address</h5>
          <p>
            <FaMapMarkerAlt className="footer-icon" />
            Nairobi, Kenya<br />
            <a 
              href="https://maps.app.goo.gl/G1V4Eyt93xPDZDDc8" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-link"
            >
              View on Google Maps
            </a>
          </p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Minyamu Motors Limited. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
