import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { User, Mail, Phone, Edit2, Check, X } from "lucide-react";
import './stylres/Profile.css'; // Import the custom CSS

const ProfileComponent = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const [editedProfile, setEditedProfile] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [userGreeting, setUserGreeting] = useState("");
  const [userProfilePic, setUserProfilePic] = useState(""); // Profile picture state

  const navigate = useNavigate();

  // Fetch profile data and greeting
  useEffect(() => {
    const userEmail = sessionStorage.getItem('userEmail');
    const userProfile = sessionStorage.getItem('userProfilePic'); // Get profile picture

    if (userEmail) {
      // Create a greeting message
      const username = sessionStorage.getItem('userName');
      setUserGreeting(`Welcome back, ${username || userEmail.split("@")[0]}!`);

      if (userProfile) {
        setUserProfilePic(userProfile); // Set the profile picture
      } else {
        setUserProfilePic("/images/placeholder.png"); // Fallback if no profile picture
      }
    } else {
      navigate("/SignIn");
    }

    // Fetch profile data from API
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`https://stanohub.pythonanywhere.com/api/profile?email=${userEmail}`);
        if (response.data) {
          setProfile(response.data);
          setEditedProfile(response.data);
        }
      } catch (err) {
        setError("Failed to load profile. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleEdit = () => {
    setIsEditing(true);
    setSuccess("");
    setError("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile({ ...profile });
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!editedProfile.username.trim()) {
      setError("Username cannot be empty");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(editedProfile.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("email", editedProfile.email);
      data.append("username", editedProfile.username);
      data.append("phone", editedProfile.phone);

      const response = await axios.post("https://stanohub.pythonanywhere.com/api/profile/update", data);

      if (response.data && response.data.message) {
        setProfile({ ...editedProfile });
        setSuccess(response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Profile Greeting and Picture */}
        <div className="greeting-box">
          <div className="greeting-header">
            <img
              src={userProfilePic}
              alt="User Profile"
              className="profile-pic"
            />
            <h2>{userGreeting}</h2>
          </div>
        </div>

        <h2>My Profile</h2>

        {/* Status Messages */}
        <p className="status1">{isLoading && "Please wait as we process your request..."}</p>
        <p className="status2">{error}</p>
        <p className="status3">{success}</p>

        {/* Profile Info */}
        {isEditing ? (
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={editedProfile.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={editedProfile.email}
                disabled
              />
              <small>Email cannot be changed</small>
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="number"
                name="phone"
                value={editedProfile.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="action-buttons">
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
              <button type="button" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        ) : (
          <div className="profile-details">
            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>

            <button onClick={handleEdit}>Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileComponent;
