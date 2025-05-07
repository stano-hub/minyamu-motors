import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './stylres/DeleteProduct.css';

const DeleteProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleDelete = async () => {
    if (password !== 'admin123') {
      setIsPasswordValid(false);
      return;
    }

    setIsPasswordValid(true);
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        setSuccessMessage('Product deleted successfully.');
        setTimeout(() => navigate('/Cars'), 2000);
      }, 1500);
    } catch (err) {
      setError('An unexpected error occurred.');
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="container mt-5">
        <h2>Product not found</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>
        &larr; Go Back
      </button>

      <div className="product-detail-card shadow-lg p-4">
        <div className="product-detail-row">
          <div className="product-image">
            <img
              src={`https://stanohub.pythonanywhere.com/static/images/${product.product_photo}`}
              alt={product.product_name}
            />
          </div>
          <div className="product-info">
            <h2>{product.product_name}</h2>
            <p className="text-muted">{product.product_description}</p>
            <h4 className="text-warning">{product.product_cost}</h4>

            <p>To delete this product, enter the admin password:</p>

            <input
              type="password"
              className="form-control mt-3"
              placeholder="Enter Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {!isPasswordValid && (
              <div className="alert alert-danger mt-3">
                Incorrect password. Please try again.
              </div>
            )}

            <button
              className="btn btn-danger mt-3"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Confirm Deletion'}
            </button>

            {successMessage && (
              <div className="alert alert-success mt-3">{successMessage}</div>
            )}

            {error && (
              <div className="alert alert-danger mt-3">{error}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;