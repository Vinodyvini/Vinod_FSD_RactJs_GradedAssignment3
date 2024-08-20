import data from '../assets/data/data.json'; 

export const fetchMovies = () => {
    try {
        // Use the imported JSON data directly
        return {
            comingSoon: data['movies-coming'] || [],
            inTheaters: data['movies-in-theaters'] || [],
            topRatedIndia: data['top-rated-india'] || [],
            topRatedMovies: data['top-rated-movies'] || []
        };
    } catch (error) {
        console.error('Error loading movies:', error);
        return { comingSoon: [], inTheaters: [], topRatedIndia: [], topRatedMovies: [] };
    }
};