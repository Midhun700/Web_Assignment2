import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { auth, db } from '../firebase'; // Firebase config
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const ReviewPage = () => {
  const { id } = useParams(); // Movie ID from URL
  const [movie, setMovie] = useState('');
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [user, setUser] = useState(null); // To store the current user
  const [rating, setRating] = useState(0); // To store the rating

  // Fetch current user
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  useEffect(() => {
    // Example movie list, consider fetching from a database if needed
    const movieList = [
      { id: 1, title: 'Inception' },
      { id: 2, title: 'The Matrix' },
      { id: 3, title: 'Interstellar' }
    ];

    const selectedMovie = movieList.find(m => m.id === parseInt(id));

    if (selectedMovie) {
      setMovie(selectedMovie.title);
    } else {
      setMovie('Movie not found');
    }

    // Load reviews from Firestore
    const fetchReviews = async () => {
      const q = query(collection(db, 'reviews'), where('movieId', '==', id));
      const querySnapshot = await getDocs(q);
      const loadedReviews = querySnapshot.docs.map(doc => doc.data());
      setReviews(loadedReviews);
    };

    fetchReviews();
  }, [id]);

  const handleAddReview = async () => {
    if (newReview.trim() && user && rating > 0) {
      try {
        // Add review to Firestore
        await addDoc(collection(db, 'reviews'), {
          movieId: id,
          review: newReview,
          userEmail: user.email,
          rating: rating, // Save the rating as well
          timestamp: new Date()
        });

        // Update the reviews list locally
        setReviews(prev => [...prev, { review: newReview, userEmail: user.email, rating: rating }]);
        setNewReview('');
        setRating(0); // Reset the rating
      } catch (error) {
        console.error('Error adding review:', error);
      }
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '10px',
    },
    textarea: {
      width: '100%',
      maxWidth: '500px',
      height: '100px',
      margin: '10px 0',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
    },
    button: {
      width: '150px',
      padding: '10px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      marginTop: '10px',
    },
    reviewsList: {
      listStyleType: 'none',
      padding: '0',
      marginTop: '20px',
      width: '100%',
      textAlign: 'center',
    },
    reviewItem: {
      backgroundColor: '#f9f9f9',
      padding: '10px',
      marginBottom: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px',
    },
    ratingLabel: {
      marginRight: '10px',
    },
    ratingSelect: {
      marginBottom: '10px',
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{movie}</h2>
      
      {/* Review Input Area */}
      {user ? (
        <>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Add your review"
            style={styles.textarea}
          />
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <label style={styles.ratingLabel}>Rating:</label>
            <select
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              style={styles.ratingSelect}
            >
              <option value={0}>Select Rating</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <button onClick={handleAddReview} style={styles.button}>Submit Review</button>
        </>
      ) : (
        <p>Please log in to submit a review.</p>
      )}

      {/* User Reviews Section */}
      <h3 style={styles.heading}>User Reviews</h3>
      {reviews.length > 0 ? (
        <ul style={styles.reviewsList}>
          {reviews.map((r, index) => (
            <li key={index} style={styles.reviewItem}>
              <strong>{r.userEmail}:</strong> {r.review} <br />
              <strong>Rating:</strong> {r.rating} / 5
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewPage;
