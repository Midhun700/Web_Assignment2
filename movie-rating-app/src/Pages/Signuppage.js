import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase'; // Import Firestore db
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore functions

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle signup form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Use Firebase authentication to create a new user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save the user's data in Firestore 'users' collection
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        uid: user.uid
      });

      // On successful signup, navigate to the login page
      alert('Signup successful! Please login.');
      navigate('/login');  // Redirect to the login page after signup
    } catch (err) {
      setError('Failed to sign up. Please try again.');
      console.error(err);
    }
  };

  return (
    <div style={pageStyle}>
      <div style={formContainerStyle}>
        <h1 style={headingStyle}>Sign Up</h1>
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputContainerStyle}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div style={inputContainerStyle}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          {/* Display error message if signup fails */}
          {error && <p style={errorStyle}>{error}</p>}

          <button type="submit" style={buttonStyle}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

// Styles (same as the LoginPage.js)
const pageStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f0f0f0',
};

const formContainerStyle = {
  backgroundColor: '#fff',
  padding: '40px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '400px',
  textAlign: 'center',
};

const headingStyle = {
  marginBottom: '20px',
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
};

const buttonStyle = {
  padding: '10px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  fontSize: '16px',
  cursor: 'pointer',
};

const errorStyle = {
  color: 'red',
  marginBottom: '15px',
};

export default SignupPage;
