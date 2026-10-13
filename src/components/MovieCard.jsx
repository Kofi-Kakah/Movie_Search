import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// TMDB search/trending results only include genre IDs, so map them to names here
const GENRES = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"

function MovieCard({ movie }) {
  const year = movie.release_date?.split("-")[0]
  const rating = movie.vote_average
  const genres = (movie.genre_ids ?? [])
    .map((id) => GENRES[id])
    .filter(Boolean)
    .slice(0, 3)

  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-2/3 w-full bg-muted overflow-hidden">
        {movie.poster_path ? (
          <img
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            loading="lazy"
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-4 text-center text-sm text-muted-foreground">
            No poster available
          </div>
        )}

        {rating > 0 && (
          <Badge className="absolute top-3 right-3 bg-black/80 text-yellow-400 font-bold backdrop-blur-xs">
            ★ {rating.toFixed(1)}
          </Badge>
        )}
      </div>

      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg font-bold line-clamp-1" title={movie.title}>
            {movie.title}
          </CardTitle>
          {year && (
            <span className="text-sm text-muted-foreground font-medium shrink-0">
              {year}
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0 pb-3 grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {movie.overview || "No description available."}
        </p>
      </CardContent>

      {genres.length > 0 && (
        <CardFooter className="p-4 pt-0 gap-1.5 flex-wrap">
          {genres.map((name) => (
            <Badge key={name} variant="secondary" className="text-xs">
              {name}
            </Badge>
          ))}
        </CardFooter>
      )}
    </Card>
  )
}

export default MovieCard