import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MovieList = () => {
  const [movies, setMovies] = useState([
    { id: 1, title: 'Inception' },
    { id: 2, title: 'The Matrix' },
    { id: 3, title: 'Interstellar' }
  ]);

  return (
    <div className="movie-list">
      <h2>Movie List</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;