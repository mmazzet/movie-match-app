import { useEffect, useState } from 'react'
import type { Movie } from '../types/movie'
import { getPopularMovies } from '../services/movieService'
import MovieCard from "../components/MovieCard";
import { getLikedMovies } from '../services/likesService';


export default function DiscoverPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([getPopularMovies(), getLikedMovies()])
      .then(([movies, liked]) => {
        setMovies(movies)
        setLikedIds(new Set(liked.map((m) => m.tmdb_id)))
      })
      .catch(() => {
        setError('Failed to load movies. Please try again.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Discover Movies</h1>
        <p className="text-gray-500">Loading movies...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Discover Movies</h1>
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Discover Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.tmdb_id} movie={movie} isLiked={likedIds.has(movie.tmdb_id)} />
        ))}
      </div>
    </div>
  );
}