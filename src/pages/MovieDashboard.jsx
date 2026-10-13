import { useState, useEffect } from "react"
import MovieCard from "../components/MovieCard.jsx"


const API_KEY = import.meta.env.VITE_MOVIE_DATABASE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export default function MovieDashboard ()  {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null) 

    useEffect(() => {
        async function fetchMovies(query) {
               try {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
        const data = await response.json();
        setMovies(data.results);
    } catch (err) {
        console.error(`Error searching movies for query "${query}":`, err);
        setError(err.message || "Something went wrong")
        return [];
    } finally {
        setLoading(false)
    }
        }

        fetchMovies()
    },[])

    if(loading) {
        return(
            <div className="container mx-auto p-6 text-center">
                <p className="text-lg text-muted-foreground animate-pulse">Loading movie catalog...</p>
            </div>
        )
    }

    if(error) {
        return(
            <div className="container mx-auto p-6 text-center text-destructive">
                <p className="font-semibold">Error: {error}</p>
            </div>
        )
    }

    return (
        <div>
            <h1 className="text-blue-900 text-2xl hover:text-blue-500">Movie Dashboard</h1>
        </div>
    )
}