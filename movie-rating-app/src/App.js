import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Pages/mainpage.js';
import SignupPage from './Pages/Signuppage.js';
import LoginPage from './Pages/Loginpage.js';
import MovieList from './Components/movielist.js';
import ReviewPage from './Components/reviewpage.js';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/movies/:id" element={<ReviewPage />} />
      </Routes>
    </Router>
  );
};

export default App;