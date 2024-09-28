import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase'; // Firebase config
import { collection, query, where, getDocs } from 'firebase/firestore';

// Sample movie data with title, poster, description, and cast
const movies = [
  {
    id: 1,
    title: "Inception",
    poster: "/Thumbnails/inception.jpg", 
    description: "A mind-bending thriller by Christopher Nolan.",
    cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
  },
  {
    id: 2,
    title: "The Dark Knight",
    poster: "/Thumbnails/thedarkknight.jpg", 
    description: "The Dark Knight battles crime in Gotham City.",
    cast: "Christian Bale, Heath Ledger, Aaron Eckhart",
  },
  {
    id: 3,
    title: "Interstellar",
    poster: "/Thumbnails/interstellar.jpg", 
    description: "A journey beyond the stars in search of a new home for humanity.",
    cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
  }
];

const MovieList = () => {
  const [averageRatings, setAverageRatings] = useState({});

  useEffect(() => {
    // Fetch average ratings for all movies
    const fetchRatings = async () => {
      const ratings = {};
      
      for (const movie of movies) {
        const q = query(collection(db, 'reviews'), where('movieId', '==', String(movie.id)));
        const querySnapshot = await getDocs(q);
        const reviews = querySnapshot.docs.map(doc => doc.data());

        // Calculate average rating and multiply by 2 to convert to 10-point scale
        if (reviews.length > 0) {
          const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
          ratings[movie.id] = ((totalRating / reviews.length) * 2).toFixed(1); // Convert to 10-point scale
        } else {
          ratings[movie.id] = 0; // No reviews, so set to 0
        }
      }

      setAverageRatings(ratings);
    };

    fetchRatings();
  }, []);

  return (
    <div className="movie-list" style={movieListStyle}>
      <nav style={navBarStyle}>
        <h1 style={logoStyle}>Movie Rating App</h1>
        <div style={navLinkContainerStyle}>
          <Link to="/" style={navLinkStyle}>Home</Link>
        </div>
      </nav>

      <div className='content'>
        <h1 style={{ color: 'white', paddingLeft: 30 }}>Movie List</h1>
        <ul style={{ padding: 30 }}>
          {movies.map((movie) => (
            <li key={movie.id} style={{ listStyle: 'none', marginBottom: '20px' }}>
              <div className="movie-card" style={cardStyle}>
                <img
                  src={movie.poster}
                  alt={`${movie.title} poster`}
                  style={posterStyle}
                />

                <div style={detailsStyle}>
                  <h2 style={{ color: 'white' }}>
                    {movie.title}
                    <span style={{ color: 'yellow', fontSize: '20px', marginLeft: '10px' }}>
                      ★ {averageRatings[movie.id] || 'N/A'}
                    </span>
                  </h2>
                  <p style={{ color: 'white' }}><strong>Description:</strong> {movie.description}</p>
                  <p style={{ color: 'white' }}><strong>Cast:</strong> {movie.cast}</p>

                  <Link to={`/movies/${movie.id}/review`} style={linkStyle}>
                    Go to Reviews
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Styling for the card, poster, and details
const movieListStyle = {
  backgroundColor: '#1c1c1c',
  minHeight: '100vh',
};

const navBarStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 0',
  backgroundColor: '#444',
  color: '#fff',
  boxSizing: 'border-box',
};

const logoStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginLeft: '20px',
};

const navLinkContainerStyle = {
  display: 'flex',
  gap: '15px',
  marginRight: '20px',
};

const navLinkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '18px',
};

const cardStyle = {
  display: 'flex',
  border: '2px solid yellow',
  borderRadius: '8px',
  padding: '10px',
  backgroundColor: 'black',
};

const posterStyle = {
  width: '150px',
  height: '225px',
  marginRight: '20px',
  borderRadius: '8px',
};

const detailsStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  color: 'white',
};

const linkStyle = {
  display: 'inline-block',
  backgroundColor: 'yellow',
  color: 'black',
  padding: '10px 15px',
  borderRadius: '5px',
  textDecoration: 'none',
  fontWeight: 'bold',
  marginTop: '10px',
  textAlign: 'center',
  width: '100%',
  transition: 'background-color 0.3s ease',
};

linkStyle[':hover'] = {
  backgroundColor: '#ffd700',
};

export default MovieList;
