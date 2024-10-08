import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  // Check if the user is logged in by checking the presence of 'loggedInUser' in localStorage
  const isLoggedIn = localStorage.getItem('loggedInUser');

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/');
    alert('You have logged out successfully.');
  };

  return (
    <div style={pageStyle}>
      {/* Navigation bar */}
      <nav style={navBarStyle}>
        <h1 style={logoStyle}>Movie Rating App</h1>
        <div style={navLinkContainerStyle}>
          {!isLoggedIn && (
            <>
              <Link to="/signup" style={navLinkStyle}>Sign Up</Link>
              <Link to="/login" style={navLinkStyle}>Login</Link>
            </>
          )}

          {isLoggedIn && (
            <>
              <Link to="/movies" style={navLinkStyle}>Movie List</Link>
              <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
            </>
          )}
        </div>
      </nav>

      {/* Main content */}
      <div style={mainContentStyle}>
        <h2 style={mainHeadingStyle}>Welcome to Movie Rating App</h2>
        <p style={mainDescriptionStyle}>Rate movies, read reviews, and add your own reviews!</p>

        {isLoggedIn && (
          <Link to="/movies">
            <button style={movieListButtonStyle}>Go to Movie List</button>
          </Link>
        )}
      </div>
    </div>
  );
};

// Styles
const pageStyle = {
  backgroundColor: '#000', // Changed background color to black
  minHeight: '100vh',
};

const navBarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#333',
  color: '#fff',
};

const logoStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
};

const navLinkContainerStyle = {
  display: 'flex',
  gap: '15px',
};

const navLinkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '18px',
};

const logoutButtonStyle = {
  color: '#fff',
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '18px',
  cursor: 'pointer',
};

const mainContentStyle = {
  textAlign: 'center',
  padding: '50px 20px',
};

const mainHeadingStyle = {
  fontSize: '36px',
  fontWeight: 'bold',
  marginBottom: '20px',
  color: '#fff', // Changed heading color to white
};

const mainDescriptionStyle = {
  fontSize: '20px',
  color: '#fff', // Changed description color to white
  marginBottom: '30px',
};

const movieListButtonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#FFD700', // Changed button color to yellow (hex code for gold)
  color: '#000', // Set the text color to black for better contrast
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '20px',
};

export default MainPage;
