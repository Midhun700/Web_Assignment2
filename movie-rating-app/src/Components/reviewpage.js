import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ReviewPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState('');
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    const movieList = [
      { id: 1, title: 'Inception' },
      { id: 2, title: 'The Matrix' },
      { id: 3, title: 'Interstellar' }
    ];
    const selectedMovie = movieList.find(m => m.id === parseInt(id));
    setMovie(selectedMovie.title);

    const movieReviews = JSON.parse(localStorage.getItem(`reviews-${id}`)) || [];
    setReviews(movieReviews);
  }, [id]);

  const handleAddReview = () => {
    const updatedReviews = [...reviews, { review: newReview }];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${id}`, JSON.stringify(updatedReviews));
    setNewReview('');
  };

  return (
    <div className="review-page">
      <h2>{movie}</h2>
      <h3>User Reviews</h3>
      <ul>
        {reviews.map((r, index) => (
          <li key={index}>{r.review}</li>
        ))}
      </ul>
      <textarea
        value={newReview}
        onChange={(e) => setNewReview(e.target.value)}
        placeholder="Add your review"
      />
      <button onClick={handleAddReview}>Submit Review</button>
    </div>
  );
};

export default ReviewPage;