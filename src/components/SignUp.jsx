import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import './stylres/SignUp.css'; // Import the custom CSS
import Sidebar from './Sidebar';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize navigate here

  const submit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(""); // Reset error state before submitting

    // Basic email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    // Basic phone validation (optional)
    const phoneRegex = /^[0-9]{10}$/; // Example: validates 10-digit phone numbers
    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("username", username);
      data.append("email", email);
      data.append("phone", phone);
      data.append("password", password);

      const response = await axios.post("https://stanohub.pythonanywhere.com/api/signup", data);
      
      setLoading(false);
      setSuccess(response.data.Success);

      if (response.data.status === "success") {
        navigate("/"); // Use navigate to redirect
      } else {
        setError(response.data.message || "Something went wrong, please try again.");
      }
    } catch (err) {
      setLoading(false);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="row justify-content-center mt-4 back">
      <Sidebar/>
      <div className="col-md-6 glowing-card">
        <h2 className="title">Sign Up</h2>
        <div className="signup">
          <form action="" className="signup-form" onSubmit={submit}>
            <br />
            <p className="status1">{loading && "Please wait as we upload your data..."}</p>
            <p className="status2">{error}</p>
            <p className="status3">{success}</p>

            <input
              type="text"
              placeholder="Enter Username"
              className="form-control"
              id="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            /><br />

            <input
              type="email"
              placeholder="Enter email"
              className="form-control"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /><br />

            <input
              type="number"
              placeholder="Enter Phone"
              className="form-control"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            /><br />

            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /><br />

            <button type="submit" className="btn btn-primary p-3 button" id="in" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>

            <p>Already have an account?</p>
            <Link className="btn btn-secondary" to="/SignIn">Sign In</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
