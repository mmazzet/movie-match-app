import { useEffect, useState } from 'react'
import type { Movie } from '../types/movie'
import { getPopularMovies } from '../services/movieService'
import MovieCard from "../components/MovieCard";

export default function DiscoverPage() {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    getPopularMovies().then((data) => {
      console.log(data)
      setMovies(data)
    })
  }, [])

  return (
    <div>
      <h1>Discover Movies</h1>
      <div>
        {movies.map((movie) => (
          <MovieCard key={movie.tmdb_id} movie={movie} />
        ))}
      </div>
    </div>
  );
}