import { useState, useEffect } from "react"
import MovieCard from "../components/MovieCard.jsx"


const API_KEY = import.meta.env.VITE_MOVIE_DATABASE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export default function MovieDashboard ()  {
    const [movies, setmovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [serach, setSearch] = useState("")
    const [error, setError] = useState(null) 

    useEffect(() => {
        async
    })

    return (
        <div>
            <h1 className="text-blue-900 text-2xl hover:text-blue-500">Movie Dashboard</h1>
        </div>
    )
}