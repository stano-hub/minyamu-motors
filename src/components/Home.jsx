import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { AuthContext } from "../App";
import './stylres/Home.css';
import Carousel from "./Carousel";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import CarIntroAnimation from "./CarIntroAnimation";

const Home = () => {
  const { isDarkMode } = useContext(AuthContext);
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userGreeting, setUserGreeting] = useState("");
  const [userProfilePic, setUserProfilePic] = useState("");  // 👈 New state for profile picture

  const navigate = useNavigate();

  // 👇 Extract and personalize greeting, also get the profile picture
  useEffect(() => {
    const username = sessionStorage.getItem("userName");
    const email = sessionStorage.getItem("userEmail");
    const profilePic = sessionStorage.getItem("userProfilePic");  // 👈 Get the profile picture URL

    if (username) {
      setUserGreeting(`Welcome back, ${username.split(" ")[0]}!`);
    } else if (email) {
      setUserGreeting(`Welcome back, ${email.split("@")[0]}!`);
    } else {
      setUserGreeting("");
    }

    if (profilePic) {
      setUserProfilePic(profilePic);  // 👈 Set the profile picture
    } else {
      setUserProfilePic("/images/placeholder.png");  // 👈 Fallback to a placeholder image if no profile pic
    }
  }, []);

  useEffect(() => {
    const get_products = async () => {
      setLoading('Please wait as we load the products...');
      try {
        const response = await axios.get('https://stanohub.pythonanywhere.com/api/get_products_details');
        const sortedProducts = response.data.sort((a, b) =>
          new Date(b.created_at) - new Date(a.created_at)
        );
        const recentProducts = sortedProducts.slice(0, 6);
        setProducts(recentProducts);
        setFilteredProducts(recentProducts);
        setLoading('');
      } catch (error) {
        setLoading('');
        setError(error.message);
      }
    };
    get_products();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = products.filter((product) =>
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.product_description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, products]);

  const img_url = 'https://stanohub.pythonanywhere.com/static/images/';

  return (
    <div className={`home-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <Sidebar />
      <CarIntroAnimation />
      <Carousel />

      <div className="content-wrapper">
        {/* 👇 Greeting with profile picture */}
        {userGreeting && (
          <div className="greeting-box">
            <div className="greeting-header">
              {/* Profile Image */}
              <img
                src={userProfilePic}
                alt="User Profile"
                className="profile-pic"
              />
              <h2>{userGreeting}</h2>
            </div>
          </div>
        )}

        <h1 className="main-title">Recently Added Vehicles</h1>

        <div className="search-container">
          <div className="input-group search-box">
            <span className="input-group-text search-icon">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search recent vehicles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {loading && (
          <div className="loading-container">
            <div className="loading-bar"></div>
            <div className="loading-text">{loading}</div>
          </div>
        )}

        {error && (
          <div className="error-container">
            <div className="error-message">{error}</div>
          </div>
        )}

        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <div key={index} className="product-card-wrapper">
              <div className="product-card">
                <div className="image-container">
                  <img
                    src={img_url + product.product_photo}
                    alt={product.product_name}
                    className="product-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/placeholder.png';
                    }}
                  />
                </div>
                <div className="card-body">
                  <h3 className="product-title">{product.product_name}</h3>
                  <p className="product-description">
                    {product.product_description.slice(0, 100)}...
                  </p>
                  <div className="product-price">KES {product.product_cost}</div>

                  <div className="button-group">
                    <button
                      className="btn details-btn"
                      onClick={() => navigate('/product-detail', { state: { product } })}
                    >
                      View Details
                    </button>

                    <button
                      className="btn purchase-btn"
                      onClick={() => navigate('/MakePayments', { state: { product } })}
                    >
                      Purchase
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && !loading && !error && (
          <div className="no-products">
            <p>No recent vehicles available</p>
          </div>
        )}

        <div className="view-all-container">
          <button
            className="btn view-all-btn"
            onClick={() => navigate('/Cars')}
          >
            View All Vehicles
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
