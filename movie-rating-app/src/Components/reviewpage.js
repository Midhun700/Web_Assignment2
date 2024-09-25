import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { auth, db } from '../firebase'; // Firebase config
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { FaStar } from 'react-icons/fa';
import Navbar from './Navbar'; // Import the Navbar component

const ReviewPage = () => {
  const { id } = useParams(); // Movie ID from URL
  const [movie, setMovie] = useState('');
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [user, setUser] = useState(null); // To store the current user
  const [rating, setRating] = useState(null); // To store the rating
  const [hoverRating, setHoverRating] = useState(null); // To handle hover effect on stars

  // Fetch current user
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  useEffect(() => {
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
        await addDoc(collection(db, 'reviews'), {
          movieId: id,
          review: newReview,
          userEmail: user.email,
          rating: rating,
          timestamp: new Date(),
        });

        setReviews(prev => [...prev, { review: newReview, userEmail: user.email, rating: rating }]);
        setNewReview('');
        setRating(null);
      } catch (error) {
        console.error('Error adding review:', error);
      }
    }
  };

  const styles = {
    page: {
      backgroundColor: '#000',
      minHeight: '100vh',
      color: '#fff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '600px',
      width: '100%',
      backgroundColor: '#111',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '10px',
      color: '#fff',
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
      backgroundColor: '#333',
      color: '#fff',
    },
    button: {
      width: '150px',
      padding: '10px',
      backgroundColor: '#f1c40f',
      color: '#000',
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
      backgroundColor: '#444',
      padding: '10px',
      marginBottom: '10px',
      border: '1px solid #666',
      borderRadius: '4px',
      fontSize: '16px',
      color: '#fff',
    },
    starRating: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '10px',
    },
    star: {
      cursor: 'pointer',
      transition: 'color 200ms',
    },
    ratingLabel: {
      color: '#fff',
    },
    reviewStars: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '5px',
    },
  };

  const renderStars = (rating) => (
    <div style={styles.reviewStars}>
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <FaStar
            key={index}
            size={20}
            color={currentRating <= rating ? '#f1c40f' : '#ccc'}
          />
        );
      })}
    </div>
  );

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      <div style={styles.page}>
        <div style={styles.container}>
          <h2 style={styles.heading}>{movie}</h2>

          {user ? (
            <>
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Add your review"
                style={styles.textarea}
              />
              <div style={styles.starRating}>
                {[...Array(5)].map((star, index) => {
                  const currentRating = index + 1;
                  return (
                    <FaStar
                      key={index}
                      size={30}
                      style={styles.star}
                      color={currentRating <= (hoverRating || rating) ? '#f1c40f' : '#ccc'}
                      onClick={() => setRating(currentRating)}
                      onMouseEnter={() => setHoverRating(currentRating)}
                      onMouseLeave={() => setHoverRating(null)}
                    />
                  );
                })}
              </div>
              <button onClick={handleAddReview} style={styles.button}>Submit Review</button>
            </>
          ) : (
            <p>Please log in to submit a review.</p>
          )}

          <h3 style={styles.heading}>User Reviews</h3>
          {reviews.length > 0 ? (
            <ul style={styles.reviewsList}>
              {reviews.map((r, index) => (
                <li key={index} style={styles.reviewItem}>
                  <strong>{r.userEmail}:</strong> {r.review}
                  {renderStars(r.rating)}
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
