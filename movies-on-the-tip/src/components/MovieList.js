import React from 'react';
import { Link } from 'react-router-dom';

const Movielist = ({ movies, onAddToFavorites }) => {
    if (movies.length === 0) {
        return <p>No movies available.</p>;
    }

    return (
        <div className="movie-list">
            {movies.map((movie) => (
                <div key={movie.id} className="movie-card">
                    <Link to={`/movie/${movie.id}`}>
                        <img src={movie.posterurl} alt={movie.title} className="movie-poster" />
                    </Link>
                    <h3 className="movie-detail">{movie.title}</h3>
                    <button onClick={() => onAddToFavorites(movie)}>Add to Favorites</button>
                </div>
            ))}
        </div>
    );
};

export default Movielist;