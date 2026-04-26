import { useEffect, useState } from 'react'
import type { Movie } from '../types/movie'
import { getPopularMovies } from '../services/movieService'
import MovieCard from '../components/MovieCard'
import { getLikedMovies } from '../services/likesService'
import logger from '../services/logger'
import Pagination from '../components/Pagination'

export default function DiscoverPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    Promise.all([getPopularMovies(page), getLikedMovies()])
      .then(([paginated, liked]) => {
        logger.info('Discover page loaded', {
          page,
          movies: paginated.movies.length,
        })
        setMovies(paginated.movies) // movies are now inside paginated.movies
        setTotalPages(paginated.total_pages)
        setLikedIds(new Set(liked.map((m) => m.tmdb_id)))
      })
      .catch((error) => {
        logger.error('Failed to load discover page data', error)
        setError('Failed to load movies. Please try again.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [page])

  function handlePageChange(newPage: number) {
    setPage(newPage)
  }

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Discover Movies</h1>
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.tmdb_id}
            movie={movie}
            isLiked={likedIds.has(movie.tmdb_id)}
          />
        ))}
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
