import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaFilter, FaUndo } from "react-icons/fa";
import { AuthContext } from "../App";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import './stylres/Cars.css';

const Cars = () => {
  const { isDarkMode, isAuthenticated } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  // Define your vehicle categories
  const vehicleCategories = [
    "All",
    // "SUV",
    // "Sedan",
    // "Saloon",
    // "Hatchback",
    // "Truck",
    // "Van",
    // "Sports",
    // "Electric"
  ];

  const img_url = 'https://stanohub.pythonanywhere.com/static/images/';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://stanohub.pythonanywhere.com/api/get_products_details");
        setProducts(response.data);
        setFilteredProducts(response.data);
        setError("");
      } catch (err) {
        setError("Failed to load vehicles");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.product_description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.product_cost >= priceRange[0] && 
                          product.product_cost <= priceRange[1];
      const matchesCategory = selectedCategory === "All" || 
                            product.vehicle_type === selectedCategory;
      
      return matchesSearch && matchesPrice && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [searchQuery, priceRange, products, selectedCategory]);

  const handlePriceChange = (e, index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = parseInt(e.target.value) || 0;
    setPriceRange(newPriceRange);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 10000000]);
    setSelectedCategory("All");
    setShowFilters(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(price).replace('KES', 'KES ');
  };

  const areFiltersActive = () => {
    return searchQuery !== "" || 
           priceRange[0] !== 0 || 
           priceRange[1] !== 10000000 || 
           selectedCategory !== "All";
  };

  return (
    <div className={`cars-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="main-content">
        <Sidebar />
        
        <div className="cars-content">
          <h1 className="cars-title">All Vehicles</h1>
          
          {/* Category Filter */}
          <div className="category-filter">
            {vehicleCategories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="filter-controls">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="filter-buttons">
              <button 
                className="filter-toggle"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
              
              <button 
                className={`reset-btn ${!areFiltersActive() ? 'disabled' : ''}`}
                onClick={resetFilters}
                disabled={!areFiltersActive()}
              >
                <FaUndo /> Reset
              </button>
            </div>
            
            {showFilters && (
              <div className="price-filter">
                <h4>Price Range (KES)</h4>
                <div className="range-inputs">
                  <input
                    type="number"
                    placeholder="Min price"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(e, 0)}
                    min="0"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max price"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(e, 1)}
                    min={priceRange[0]}
                  />
                </div>
              </div>
            )}
          </div>

          {loading && (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading vehicles...</p>
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="vehicles-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="vehicle-card">
                <div className="vehicle-image">
                  <img
                    src={`${img_url}${product.product_photo}`}
                    alt={product.product_name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/placeholder.png';
                    }}
                  />
                </div>
                <div className="vehicle-details">
                  <h3>{product.product_name}</h3>
                  <p className="vehicle-type">{product.vehicle_type}</p>
                  <p className="description">
                    {product.product_description.length > 100
                      ? `${product.product_description.substring(0, 100)}...`
                      : product.product_description}
                  </p>
                  <div className="price">{formatPrice(product.product_cost)}</div>
                  <div className="vehicle-actions">
                    <button
                      className="details-btn"
                      onClick={() => navigate('/product-detail', { state: { product } })}
                    >
                      Details
                    </button>
                    {isAuthenticated && (
                      <button
                        className="purchase-btn"
                        onClick={() => navigate('/MakePayments', { state: { product } })}
                      >
                        Purchase
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && !loading && (
            <div className="no-results">
              No vehicles match your search criteria
              <button className="reset-all-btn" onClick={resetFilters}>
                Reset all filters
              </button>
            </div>
          )}

          <div className="content-spacer"></div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cars;
