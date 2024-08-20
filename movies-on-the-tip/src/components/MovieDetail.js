import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import data from '../assets/data/data.json'; // Adjust the path as needed

const MovieDetail = ({ onAddToFavorites }) => {
    const { id } = useParams(); // Get the movie ID from the URL
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        // Combine all movies from the various arrays
        const movies = [
            ...data["movies-coming"],
            ...data["movies-in-theaters"],
            ...data["top-rated-india"],
            ...data["top-rated-movies"]
        ];

        // Find the movie that matches the ID from the URL
        const movieDetail = movies.find(movie => movie.id === id);
        setMovie(movieDetail);
    }, [id]);

    if (!movie) return <div>Loading...</div>;

    return (
        <div className="movie-detail-page">
            <img className="movie-detail-poster" src={movie.posterurl} alt={movie.title} />
            <div>
                <h1>{movie.title}</h1>
                <div className="movie-info">
                    <div><span className="label">Year:</span></div>
                    <div><span className="value">{movie.year}</span></div>
                    <div><span className="label">Genres:</span></div>
                    <div><span className="value">{movie.genres.join(', ')}</span></div>
                    <div><span className="label">Duration:</span></div>
                    <div><span className="value">{movie.duration}</span></div>
                    <div><span className="label">Content Rating:</span></div>
                    <div><span className="value">{movie.contentRating}</span></div>
                    <div><span className="label">Release Date:</span></div>
                    <div><span className="value">{movie.releaseDate}</span></div>
                    <div><span className="label">Average Rating:</span></div>
                    <div><span className="value">{movie.averageRating}</span></div>
                    <div><span className="label">Actors:</span></div>
                    <div><span className="value">{movie.actors.join(', ')}</span></div>
                    <div><span className="label">Story Line:</span></div>
                    <div><span className="value">{movie.storyline}</span></div>
                </div>
                <button onClick={() => onAddToFavorites(movie)} >Add to Favorites</button>
            </div>
        </div>
    );
};

export default MovieDetail;