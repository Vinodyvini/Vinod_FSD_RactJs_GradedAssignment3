import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Movielist from './components/MovieList';
import FavoriteList from './components/FavoriteList';
import Navbar from './components/Navbar';
import { fetchMovies } from './services/movieService';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MovieDetail from './components/MovieDetail';

const App = () => {
    const [comingSoon, setComingSoon] = useState([]);
    const [inTheaters, setInTheaters] = useState([]);
    const [topRatedIndia, setTopRatedIndia] = useState([]);
    const [topRatedMovies, settopRatedMovies] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const loadMovies = async () => {
            const { comingSoon, inTheaters, topRatedIndia, topRatedMovies } = await fetchMovies();
            setComingSoon(comingSoon);
            setInTheaters(inTheaters);
            setTopRatedIndia(topRatedIndia);
            settopRatedMovies(topRatedMovies);
        };
        loadMovies();

        // Load favorites from localStorage
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    const addToFavorites = (movie) => {
        if (!favorites.some(favMovie => favMovie.id === movie.id)) {
            const updatedFavorites = [...favorites, movie];
            setFavorites(updatedFavorites);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            toast.success(`${movie.title} added to favorites successfully!`);
        } else {
            toast.error(`${movie.title} already exists in favorites!`);
        }
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const filteredComingSoon = comingSoon.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredInTheaters = inTheaters.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredTopRatedIndia = topRatedIndia.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredTopRatedMovies = topRatedMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Router>
            <Navbar onSearch={handleSearch} />
            <Routes>
                <Route
                    path="/"
                    element={<Movielist movies={filteredInTheaters} onAddToFavorites={addToFavorites} />}
                />
                <Route path="/movie/:id" element={<MovieDetail onAddToFavorites={addToFavorites} />} />
                <Route
                    path="/favorites"
                    element={<FavoriteList favorites={favorites} searchTerm={searchTerm} setFavorites={setFavorites} />}
                />
                <Route
                    path="/Top-rated-Indian"
                    element={<Movielist movies={filteredTopRatedIndia} onAddToFavorites={addToFavorites} />}
                />
                <Route
                    path="/Coming-soon"
                    element={<Movielist movies={filteredComingSoon} onAddToFavorites={addToFavorites} />}
                />
                <Route
                    path="/Top-rated-Movies"
                    element={<Movielist movies={filteredTopRatedMovies} onAddToFavorites={addToFavorites} />}
                />
            </Routes>
            <ToastContainer />
        </Router>
    );
};

export default App;