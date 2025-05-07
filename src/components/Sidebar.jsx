import React, { useState } from 'react';
import './stylres/Sidebar.css'; // Ensure you have a CSS file for styling
import { Link } from 'react-router-dom'; // Using Link for client-side navigation
import Footer from './Footer'; // Make sure you have a Footer component
import ChatBot from './ChatBot';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {/* Hamburger Menu */}
            <button
                className={`hamburger-menu ${isOpen ? 'active' : ''}`}  // Toggling the active class
                onClick={toggleSidebar}
            >
                ☰
            </button>

            {/* Sidebar */}
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/Cars">All Cars</Link></li>
                    <li><Link to="/AboutUs">About Us</Link></li>
                   
                    <li><Link to="/AboutUs">Contact Us</Link></li>
                    <li><Link to="/AddProducts">Add Products</Link></li>
                    
                </ul>

                <p className="p-4">&copy; {new Date().getFullYear()} Minyamu Motors Limited. All rights reserved.</p>
            </div>

           
            
        </div>
    );
}

export default Sidebar;
