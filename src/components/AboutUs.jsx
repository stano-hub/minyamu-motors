import React from 'react';
import './stylres/AboutUs.css'; // Ensure you have a CSS file for styling
import Sidebar from './Sidebar';
import Footer from './Footer';

const AboutUs = () => {
  return (
    <div className="aboutus-container">
        <Sidebar/>
      <h1>About Us</h1>
      <p>
        Welcome to <strong>Minyamu Motors</strong>, your trusted partner in quality and reliable vehicles. 
        We are committed to providing exceptional service, competitive prices, and a seamless car-buying experience.
      </p>
      <p>
        With a strong presence in Nairobi, Kenya, Minyamu Motors takes pride in its wide range of vehicles that 
        fit your lifestyle and budget.
      </p>
      <p>
        Have questions or want to know more? <br />
        <a href="https://maps.app.goo.gl/G1V4Eyt93xPDZDDc8" target="_blank" rel="noopener noreferrer">Visit our location</a> 
        or call us at <a href="tel:+254745170595">+254 745 170595</a>.
      </p>
      <Footer />
    </div>
  );
};

export default AboutUs;
