import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset the error message

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log('User Data:', userData);

        // On successful login, save user info and navigate to the main page
        localStorage.setItem('loggedInUser', JSON.stringify(userData));
        navigate('/');
      } else {
        console.log('No such document in Firestore!');
      }
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
      console.error(err);
    }
  };

  return (
    <div style={pageStyle}>
      {/* Navigation bar */}
      <nav style={navBarStyle}>
        <h1 style={logoStyle}>Movie Rating App</h1>
        <div style={navLinkContainerStyle}>
          <Link to="/" style={navLinkStyle}>Home</Link>
          <Link to="/signup" style={navLinkStyle}>Sign Up</Link>
        </div>
      </nav>

      <div style={formContainerStyle}>
        <h1 style={headingStyle}>Login</h1>
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputContainerStyle}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div style={inputContainerStyle}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          {/* Display error message if login fails */}
          {error && <p style={errorStyle}>{error}</p>}

          <button type="submit" style={buttonStyle}>Login</button>
        </form>
      </div>
    </div>
  );
};

// Styles
const pageStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: 'black', // Page background set to black
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

const formContainerStyle = {
  backgroundColor: 'black', // Form container background set to black
  padding: '40px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '400px',
  textAlign: 'center',
  margin: 'auto',
  border: '2px solid yellow', // Yellow border
};

const headingStyle = {
  marginBottom: '20px',
  color: 'white', // Heading text color set to white
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const inputContainerStyle = {
  marginBottom: '15px',
  textAlign: 'left',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  marginTop: '5px',
  fontSize: '16px',
  backgroundColor: '#333', // Input background set to dark gray
  color: 'white', // Input text color set to white
};

const labelStyle = {
  color: 'white', // Label text color set to white
};
const buttonStyle = {
  padding: '10px 20px', // Adjusted padding for medium size
  backgroundColor: 'yellow', // Button background set to yellow
  color: 'black', // Button text color set to black
  border: 'none',
  borderRadius: '4px',
  fontSize: '16px',
  cursor: 'pointer',
  alignSelf: 'center', // Align the button to the center of the form
};


const errorStyle = {
  color: 'red',
  marginBottom: '15px',
};

export default LoginPage;
