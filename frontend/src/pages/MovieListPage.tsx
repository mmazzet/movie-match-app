import { useState, useEffect } from 'react'
import type { Movie, PaginatedMoviesResponse, SearchParams } from '../types/movie'
import { getLikedMovies } from '../services/likesService'
import { searchMovies } from '../services/movieService'
import MovieCard from '../components/MovieCard'
import Pagination from '../components/Pagination'
import SearchFilters from '../components/SearchFilters'
import logger from '../services/logger'

interface Props {
  title: string
  fetchMovies: (page: number) => Promise<PaginatedMoviesResponse>
}

export default function MovieListPage({ title, fetchMovies }: Props) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null)

  useEffect(() => {
    // If user has searched, use searchMovies, otherwise use the passed-in fetchMovies
    const moviesPromise = searchParams
      ? searchMovies({ ...searchParams, page })
      : fetchMovies(page)

    Promise.all([moviesPromise, getLikedMovies()])
      .then(([paginated, liked]) => {
        logger.info('Movie list page loaded', { page, movies: paginated.movies.length })
        setMovies(paginated.movies)
        setTotalPages(paginated.total_pages)
        setLikedIds(new Set(liked.map((m) => m.tmdb_id)))
      })
      .catch((err) => {
        logger.error('Failed to load movies', err)
        setError('Failed to load movies. Please try again.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [page, searchParams, fetchMovies])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  function handlePageChange(newPage: number) {
    setPage(newPage)
  }

  function handleSearch(params: SearchParams) {
    setPage(1)
    setSearchParams(params)
  }

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">{title}</h1>
        <p className="text-gray-500">Loading movies...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">{title}</h1>
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <SearchFilters onSearch={handleSearch} />
      <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.tmdb_id}
            movie={movie}
            isLiked={likedIds.has(movie.tmdb_id)}
          />
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  )
}