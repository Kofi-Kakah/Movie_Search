import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"


function MovieCard({ movie }) {
  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
        <div className="relative aspect-2/3 w-full bg-muted">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}
             className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
            <Badge className="absolute top-3 right-3 bg-black/80 text-yellow-400 font-bold backdrop-blur-xs">
                {movie.rating.toFixed(1)}
            </Badge>
        </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg font-bold line-clamp-1">{movie.title}</CardTitle>
            <span className="text-sm text-muted-foreground font-medium shrink-0">{movie.release_date?.split("-")[0]}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 pb-3 grow">
            <p className="text-sm text-muted-foreground line-clamp-3">{movie.overview}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 gap-1.5 flex-wrap">
            {movie.genre.map((g) => (
                <Badge key={g} variant="secondary" className="text-xs">
                    {g}
                </Badge>
            ))}
      </CardFooter>
    </Card>
  )
}

export default MovieCard