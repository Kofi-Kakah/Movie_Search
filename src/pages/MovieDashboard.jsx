import { useState, useEffect } from "react"
import MovieCard from "../components/MovieCard.jsx"


const API_KEY = import.meta.env.VITE_MOVIE_DATABASE_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"

export default function MovieDashboard() {
    const [inputValue, setInputValue] = useState("")   // what the user is typing
    const [searchTerm, setSearchTerm] = useState("")   // what we actually search for
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Search-as-you-type: wait 500ms after the user stops typing
    useEffect(() => {
        const timer = setTimeout(() => setSearchTerm(inputValue.trim()), 500)
        return () => clearTimeout(timer)
    }, [inputValue])

    // Fetch trending movies, or search results when there's a search term
    useEffect(() => {
        const controller = new AbortController()

        async function fetchMovies() {
            setLoading(true)
            setError(null)

            try {
                const params = new URLSearchParams({ api_key: API_KEY })
                let endpoint = "/trending/movie/week"

                if (searchTerm) {
                    endpoint = "/search/movie"
                    params.set("query", searchTerm)
                }

                const response = await fetch(`${BASE_URL}${endpoint}?${params}`, {
                    signal: controller.signal,
                })

                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error("Invalid API key. Check VITE_MOVIE_DATABASE_API_KEY in your .env file.")
                    }
                    throw new Error(`Request failed (status ${response.status})`)
                }

                const data = await response.json()
                setMovies(data.results ?? [])
            } catch (err) {
                if (err.name === "AbortError") return // a newer search replaced this one
                console.error(`Error fetching movies${searchTerm ? ` for "${searchTerm}"` : ""}:`, err)
                setError(err.message || "Something went wrong")
                setMovies([])
            } finally {
                if (!controller.signal.aborted) setLoading(false)
            }
        }

        fetchMovies()
        return () => controller.abort()
    }, [searchTerm])

    const handleSubmit = (e) => {
        e.preventDefault()
        setSearchTerm(inputValue.trim()) // search immediately, skip the debounce wait
    }

    const handleClear = () => {
        setInputValue("")
        setSearchTerm("")
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            <header className="border-b pb-4 space-y-4">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">
                        {searchTerm ? `Results for "${searchTerm}"` : "Trending Movies"}
                    </h1>
                    <p>
                        {searchTerm
                            ? "Movies matching your search"
                            : "Explore recently updated and top-rated media titles"}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex gap-2">
                    <label htmlFor="movie-search" className="sr-only">Search movies</label>
                    <div className="relative flex-1">
                        <input
                            id="movie-search"
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Search for a movie, e.g. Inception"
                            className="w-full rounded-lg border px-4 py-2 pr-10 focus:outline-none focus:ring-2 text-white"
                        />
                        {inputValue && (
                            <button
                                type="button"
                                onClick={handleClear}
                                aria-label="Clear search"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="rounded-lg border px-5 py-2 font-medium  text-white  "
                    >
                        Search
                    </button>
                </form>
            </header>

            <div aria-live="polite">
                {loading && (
                    <p className="text-center text-lg text-muted-foreground animate-pulse">
                        {searchTerm ? "Searching..." : "Loading movie catalog..."}
                    </p>
                )}

                {error && !loading && (
                    <p className="text-center font-semibold text-destructive">Error: {error} - Check Network</p>
                )}

                {!loading && !error && movies.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}

                {!loading && !error && movies.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">
                            {searchTerm
                                ? `No movies found for "${searchTerm}". Try a different title.`
                                : "No media files discovered matching criteria"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}