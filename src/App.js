import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { FaUserCircle } from 'react-icons/fa';

// Lazy load components
const SignIn = lazy(() => import('./components/SignIn'));
const SignUp = lazy(() => import('./components/SignUp'));
const Home = lazy(() => import('./components/Home'));
const AddProducts = lazy(() => import('./components/AddProducts'));
const MakePayments = lazy(() => import('./components/MakePayments'));
const AboutUs = lazy(() => import('./components/AboutUs'));
const Cars = lazy(() => import('./components/Cars'));
const ProductDetails = lazy(() => import('./components/ProductDetails'));
const FAQ = lazy(() => import('./components/FAQ'));
const DeleteProducts = lazy(() => import('./components/DeleteProducts'));
const ChatBot = lazy(() => import('./components/ChatBot'));
const Profile = lazy(() => import('./components/Profile'));

const AuthContext = React.createContext();

function App() {
  const [showChat, setShowChat] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleChat = () => setShowChat(prev => !prev);
  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.style.backgroundColor = '#000000';
      document.documentElement.style.setProperty('--primary-bg', '#000000');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.style.backgroundColor = '#ffffff';
      document.documentElement.style.setProperty('--primary-bg', '#ffffff');
    }
  }, [isDarkMode]);

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/SignIn" replace />;
    }
    return children;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogin, handleLogout, isDarkMode }}>
      <Router>
        <div className="App">
          <header className="App-header">
            <div className="header-content">
              <img src="/images/logo.png" alt="Minyamu Motors Logo" className="App-logo" />
              <h1 className="App-title">Minyamu Motors Car App</h1>
            </div>
            <div className="header-links">
              <Link to="/FAQ" className="faq-link">?</Link>
              {isAuthenticated ? (
                <button onClick={handleLogout} className="profile-button">
                  <FaUserCircle className="profile-icon" />
                </button>
              ) : (
                <Link to="/SignIn" className="profile-button">
                  <FaUserCircle className="profile-icon" />
                </Link>
              )}
              <label className="dark-mode-toggle">
                <input 
                  type="checkbox" 
                  checked={isDarkMode} 
                  onChange={toggleDarkMode}
                  aria-label="Toggle dark mode"
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </header>

          <button className="chat-launcher" onClick={toggleChat}>
            {showChat ? '✕ Close Chat' : '💬 Ask Lily'}
          </button>
          
          {showChat && (
            <div className="chatbot-container">
              <Suspense fallback={<div>Loading...</div>}>
                <ChatBot onClose={toggleChat} />
              </Suspense>
            </div>
          )}

          <main>
            <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/SignIn" element={<SignIn onLogin={handleLogin} />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/AboutUs" element={<AboutUs />} />
                <Route path="/Cars" element={<Cars />} />
                <Route path="/FAQ" element={<FAQ />} />
                <Route path="/product-detail" element={<ProductDetails />} />
                <Route path="/AddProducts" element={<AddProducts />} />
                <Route path="/delete-product" element={<DeleteProducts />} />
               
                <Route
                  path="/profile"
                       element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
          }
        />
                {/* Protected routes */}
                <Route path="/MakePayments" element={
                  
                    <MakePayments />
                  
                } />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
export { AuthContext };