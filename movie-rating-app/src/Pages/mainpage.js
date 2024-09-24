import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <div className="main-page">
      <h1>Welcome to Movie Rating App</h1>
      <p>Rate movies, read reviews, and add your own reviews!</p>
      <nav>
        <Link to="/signup">Sign Up</Link> | <Link to="/login">Login</Link> | <Link to="/movies">Movie List</Link>
      </nav>
    </div>
  );
};

export default MainPage;