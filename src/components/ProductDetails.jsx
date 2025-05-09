import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import './stylres/ProductDetail.css';
import { FaArrowLeft, FaCreditCard, FaPhone, FaTrash, FaLock } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';

const ProductDetail = () => {
  const { isDarkMode } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedAdminStatus = localStorage.getItem('isAdmin');
    if (storedAdminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const requestAdminAccess = () => {
    const password = prompt('Enter admin password:');
    if (password === 'MinyamuMotorsStaff@123') {
      localStorage.setItem('isAdmin', 'true');
      setIsAdmin(true);
    } else {
      setError('Incorrect password');
      setTimeout(() => setError(''), 3000);
    }
  };

  if (!product) {
    return (
      <div className={`product-not-found ${isDarkMode ? 'dark-mode' : ''}`}>
        <h2>Product Not Found</h2>
        <button 
          className="back-home-btn"
          onClick={() => navigate('/')}
        >
          <FaArrowLeft /> Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className={`product-detail-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="product-detail-wrapper">
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft /> Go Back
        </button>

        <div className="product-detail-card">
          <div className="product-image-container">
            <img 
              src={`https://stanohub.pythonanywhere.com/static/images/${product.product_photo}`} 
              alt={product.product_name}
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = '/images/placeholder.png'
              }}
            />
          </div>
          
          <div className="product-info">
            <h1 className="product-title">{product.product_name}</h1>
            <p className="product-description">{product.product_description}</p>
            <div className="product-price">{product.product_cost}</div>

            <div className="button-group">
{/*               <button
                className="payment-button"
                onClick={() => navigate('/MakePayments', { state: { product } })}
              >
                <FaCreditCard /> Proceed to Payment
              </button> */}

              <a 
                href="tel:+254745170595" 
                className="call-button"
              >
                <FaPhone /> Enquire by Call
              </a>

              <a
                href="https://wa.me/254745170595"
                className="whatsapp-button"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp /> Enquire on WhatsApp
              </a>

              {!isAdmin && (
                <button
                  className="admin-button"
                  onClick={requestAdminAccess}
                >
                  <FaLock /> Admin Access
                </button>
              )}

              {isAdmin && (
                <button
                  className="delete-button"
                  onClick={() => navigate('/delete-product', { state: { product } })}
                >
                  <FaTrash /> Delete Product
                </button>
              )}
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
