import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from '../App';
import './stylres/AddProducts.css';

const ADMIN_PASSWORD = "admin123"; // Set your local admin password here

const AddProducts = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useContext(AuthContext);
  const [isAdminVerified, setIsAdminVerified] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const verifyAdmin = (e) => {
    e.preventDefault();
    setLoading("Verifying...");
    setError("");

    // Simple timeout to simulate verification delay
    setTimeout(() => {
      if (adminPassword === ADMIN_PASSWORD) {
        setIsAdminVerified(true);
        setLoading("");
      } else {
        setError("Invalid admin password");
        setLoading("");
      }
    }, 500);
  };

  if (!isAdminVerified) {
    return (
      <div className={`add-products-container ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="password-verification-card">
          <div className="card-header">
            <h3>Admin Verification Required</h3>
          </div>
          <div className="card-body">
            <form onSubmit={verifyAdmin}>
              {error && <div className="alert alert-danger">{error}</div>}
              {loading && <div className="alert alert-info">{loading}</div>}

              <div className="form-group">
                <label>Enter Admin Password</label>
                <input
                  type="password"
                  className={`form-control ${isDarkMode ? 'dark-input' : ''}`}
                  placeholder="Password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <button type="submit" className="btn btn-primary submit-btn">
                Verify
              </button>

              <button 
                type="button" 
                className="btn btn-link mt-3"
                onClick={() => navigate('/')}
              >
                Back to Home
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return <ProductForm isDarkMode={isDarkMode} navigate={navigate} />;
};

const ProductForm = ({ isDarkMode, navigate }) => {
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState(null);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading("Uploading product...");
    setError("");
    setSuccess("");

    try {
      const data = new FormData();
      data.append('product_name', product_name);
      data.append("product_description", product_description);
      data.append("product_cost", product_cost);
      data.append("product_photo", product_photo);

      const response = await axios.post("https://stanohub.pythonanywhere.com/api/add_product", data);

      setLoading("");
      setSuccess(response.data.Message);
      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto(null);
    } catch (error) {
      setLoading("");
      setError(error.response?.data?.Message || error.message);
    }
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  return (
    <div className={`add-products-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="product-card">
        <div className="product-card-header">
          <h3>Upload a Product</h3>
        </div>
        <div className="product-card-body">
          <nav className="nav-link">
            <button 
              onClick={() => navigate('/')} 
              className={`btn ${isDarkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}
            >
              View All Products
            </button>
          </nav>

          <form onSubmit={submit}>
            {loading && <div className={`alert ${isDarkMode ? 'alert-dark' : 'alert-info'}`}>{loading}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                className={`form-control ${isDarkMode ? 'dark-input' : ''}`}
                placeholder="Enter product name"
                value={product_name}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Product Description</label>
              <textarea
                className={`form-control ${isDarkMode ? 'dark-input' : ''}`}
                placeholder="Enter product description"
                value={product_description}
                onChange={(e) => setProductDescription(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Product Price</label>
              <input
                type="text"
                className={`form-control ${isDarkMode ? 'dark-input' : ''}`}
                placeholder="Enter product price"
                value={product_cost}
                onChange={(e) => setProductCost(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Product Image</label>
              <input
                type="file"
                className={`form-control ${isDarkMode ? 'dark-input' : ''}`}
                accept="image/*"
                onChange={(e) => setProductPhoto(e.target.files[0])}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary submit-btn">
              Upload Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;