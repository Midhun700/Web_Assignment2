// src/Components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const styles = {
    navbar: {
      backgroundColor: '#333', // Dark background for navbar
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#fff',
    },
    title: {
      color: '#fff',
      fontSize: '24px',
      fontWeight: 'bold',
    },
    navLinks: {
      display: 'flex',
      alignItems: 'center',
    },
    link: {
      color: '#fff', // White text for links
      textDecoration: 'none',
      margin: '0 15px',
      fontSize: '18px',
    }
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.title}>Movie Review App</div> {/* Title on the left */}
      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/movielist" style={styles.link}>Movie List</Link>
      </div>
    </nav>
  );
};

export default Navbar;
