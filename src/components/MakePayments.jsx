import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './stylres/MakePayments.css';

const MakePayments = () => {
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { product } = useLocation().state || {};
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading('Processing payment...');
    setError('');
    setMessage('');

    try {
      const data = new FormData();
      data.append('phone', phoneNumber);
      data.append('amount', product.product_cost);

      const response = await axios.post(
        'https://stanohub.pythonanywhere.com/api/mpesa_payment',
        data
      );

      setLoading('');
      setMessage(response.data.message);
    } catch (err) {
      setLoading('');
      setError(err.message || 'Something went wrong');
    }
  };

  if (!product) {
    return (
      <div className="container text-center mt-5">
        <h2>No product selected for payment.</h2>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2 className="payment-title">Lipa na M-Pesa</h2>

        <form onSubmit={submit}>
          <p><strong>Product:</strong> {product.product_name}</p>
          <p><strong>Cost:</strong> KES {product.product_cost}</p>

          {loading && <p className="text-info">{loading}</p>}
          {error && <p className="text-danger">{error}</p>}
          {message && <p className="text-success">{message}</p>}

          <input
            type="tel"
            className="form-control mb-3"
            placeholder="Enter phone e.g. 2547XXXXXXXX"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <button type="submit" className="btn btn-calm w-100 mb-3">
            Make Payment
          </button>
        </form>

        <button className="btn btn-outline-secondary w-100" onClick={() => navigate('/')}>
          Back to Home Page
        </button>
      </div>
    </div>
  );
};

export default MakePayments;
