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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Discover Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.tmdb_id} movie={movie} />
        ))}
      </div>
    </div>
  );
}