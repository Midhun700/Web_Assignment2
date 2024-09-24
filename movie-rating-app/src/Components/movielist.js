import React from 'react';
import { Link } from 'react-router-dom';

// Sample movie data with title, poster, description, and cast
const movies = [
  {
    id: 1,
    title: "Inception",
    poster: "/Thumbnails/inception.jpg", // Replace with actual poster URL
    description: "A mind-bending thriller by Christopher Nolan.",
    cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page"
  },
  {
    id: 2,
    title: "The Dark Knight",
    poster: "/Thumbnails/thedarkknight.jpg", // Replace with actual poster URL
    description: "The Dark Knight battles crime in Gotham City.",
    cast: "Christian Bale, Heath Ledger, Aaron Eckhart"
  },
  {
    id: 3,
    title: "Interstellar",
    poster: "/Thumbnails/interstellar.jpg", // Replace with actual poster URL
    description: "A journey beyond the stars in search of a new home for humanity.",
    cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain"
  }
];

const MovieList = () => {
  return (
    <div className="movie-list">
      <h1>Movie List</h1>
      <ul style={{ padding: 0 }}>
        {movies.map((movie) => (
          <li key={movie.id} style={{ listStyle: 'none', marginBottom: '20px' }}>
            <div className="movie-card" style={cardStyle}>
              {/* Poster on the left */}
              <img
                src={movie.poster}
                alt={`${movie.title} poster`}
                style={posterStyle}
              />

              {/* Movie details */}
              <div style={detailsStyle}>
                <h2>{movie.title}</h2>
                <p><strong>Description:</strong> {movie.description}</p>
                <p><strong>Cast:</strong> {movie.cast}</p>

                {/* Link to the review page */}
                <Link to={`/movies/${movie.id}/review`} style={linkStyle}>
                  Go to Reviews
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Styling for the card, poster, and details
const cardStyle = {
  display: 'flex',
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '10px',
  backgroundColor: '#f9f9f9'
};

const posterStyle = {
  width: '150px',
  height: '225px',
  marginRight: '20px',
  borderRadius: '8px'
};

const detailsStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
};

const linkStyle = {
  marginTop: '10px',
  color: '#007bff',
  textDecoration: 'none'
};

export default MovieList;