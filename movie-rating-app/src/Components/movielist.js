import React from 'react';
import { Link } from 'react-router-dom';

// Sample movie data with title, poster, description, and cast
const movies = [
  {
    id: 1,
    title: "Inception",
    poster: "/Thumbnails/inception.jpg", // Replace with actual poster URL
    description: "A mind-bending thriller by Christopher Nolan.",
    cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
    averageRating: 8.8 // Placeholder average rating
  },
  {
    id: 2,
    title: "The Dark Knight",
    poster: "/Thumbnails/thedarkknight.jpg", // Replace with actual poster URL
    description: "The Dark Knight battles crime in Gotham City.",
    cast: "Christian Bale, Heath Ledger, Aaron Eckhart",
    averageRating: 9.0 // Placeholder average rating
  },
  {
    id: 3,
    title: "Interstellar",
    poster: "/Thumbnails/interstellar.jpg", // Replace with actual poster URL
    description: "A journey beyond the stars in search of a new home for humanity.",
    cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
    averageRating: 8.6 // Placeholder average rating
  }
];

const MovieList = () => {
  return (
    <div className="movie-list" style={movieListStyle}>
      {/* Navigation bar */}
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
                {/* Poster on the left */}
                <img
                  src={movie.poster}
                  alt={`${movie.title} poster`}
                  style={posterStyle}
                />

                {/* Movie details */}
                <div style={detailsStyle}>
                  <h2 style={{ color: 'white' }}>
                    {movie.title}
                    <span style={{ color: 'yellow', fontSize: '20px', marginLeft: '10px' }}>
                      ★ {movie.averageRating}
                    </span>
                  </h2>
                  <p style={{ color: 'white' }}><strong>Description:</strong> {movie.description}</p>
                  <p style={{ color: 'white' }}><strong>Cast:</strong> {movie.cast}</p>

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
    </div>
  );
};

// Styling for the card, poster, and details
const movieListStyle = {
  backgroundColor: '#1c1c1c',
  minHeight: '100vh',
};

// Navigation bar styles
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
  border: '2px solid yellow', // Updated border to yellow
  borderRadius: '8px',
  padding: '10px',
  backgroundColor: 'black', // Black background for the card
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
  color: 'white', // White text for all details
};

const linkStyle = {
  display: 'inline-block',
  backgroundColor: 'yellow', // Yellow background for the link
  color: 'black', // Black text for contrast
  padding: '10px 15px', // Padding to give the box a button feel
  borderRadius: '5px', // Rounded corners
  textDecoration: 'none', // Remove underline
  fontWeight: 'bold',
  marginTop: '10px',
  textAlign: 'center', // Center the text within the box
  width: '100%', // Ensure the box takes up the full width of the container
  transition: 'background-color 0.3s ease', // Smooth hover transition
};

// Smooth hover transition
linkStyle[':hover'] = {
  backgroundColor: '#ffd700', // Darker yellow on hover
};

export default MovieList;
