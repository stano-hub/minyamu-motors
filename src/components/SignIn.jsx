import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"; //For backend API access

import './stylres/Sign.css';  // Import the custom CSS
import Sidebar from './Sidebar';

const SignIn = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading("Please wait as we upload your data");

    try {
      const data = new FormData();
      data.append("email", email);
      data.append("password", password);

      const response = await axios.post("https://stanohub.pythonanywhere.com/api/signin", data);
      setLoading("");
      setSuccess(response.data.Message);

      if (response.data.user) {
        navigate("/");
      } else {
        setError(response.data.message);
      }

    } catch (error) {
      setLoading("");
      setError(error.message);
    }
  }

  return (
    <div className='row justify-content-center back'>
      <Sidebar />
      <div className='col-md-6 glowing-card'>
        <h2 className='title'>Sign In</h2>
        <p className='status1'>{loading}</p>
        <p className='status2'>{success}</p>
        <p className='status3'>{error}</p>

        <div className="signup">
          <form action="" className='signup-form' onSubmit={submit}>
            <input
              type="email"
              placeholder="Enter your email"
              className='form-control'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <br />
            <input
              type="password"
              placeholder="Enter your password"
              className='form-control'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br /><br />
            <button type="submit" className="text-white btn btn-primary" id='in'>Sign In</button>
            <br />
            <p>Don't have an account ?<br /> Please</p><Link to="/signup">Sign Up</Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn;
