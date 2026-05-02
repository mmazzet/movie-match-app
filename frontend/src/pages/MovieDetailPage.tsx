import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieDetails } from '../services/movieService'
import type { MovieDetail } from '../types/movie'
import logger from '../services/logger'

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

export default function MovieDetailPage() {
  // Get the tmdb_id from the URL: /movies/:tmdb_id
  const { tmdb_id } = useParams()

  const [movie, setMovie] = useState<MovieDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(Number(tmdb_id))
        setMovie(data)
      } catch (error) {
        logger.error('Failed to fetch movie details', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovie()
  }, [tmdb_id])

  if (isLoading) {
    return <p className="p-4">Loading...</p>
  }

  if (!movie) {
    return <p className="p-4">Movie not found.</p>
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* On mobile: stack vertically. On larger screens: side by side */}
      <div className="flex flex-col sm:flex-row gap-6">
        {movie.poster_path ? (
          <img
            src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-full sm:w-48 rounded"
          />
        ) : (
          <div className="w-full sm:w-48 h-72 bg-gray-200 flex items-center justify-center rounded">
            <p>No poster</p>
          </div>
        )}

        <div>
          <h1 className="text-2xl font-bold">{movie.title}</h1>
          <p className="text-gray-500">Release date: {movie.release_date}</p>
          <p className="text-gray-500">Runtime: {movie.runtime} min</p>
          <p className="text-yellow-500 font-semibold">
            ⭐ {movie.vote_average?.toFixed(1)}
          </p>
          <p className="text-gray-500">
            Genres: {(movie.genres ?? []).join(', ')}
          </p>
          <p className="text-gray-500">
            Country: {movie.origin_country.join(', ')}
          </p>
          {movie.director && (
            <p className="mt-2">🎬 Director: {movie.director}</p>
          )}
        </div>
      </div>

      {/* Synopsis */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Synopsis</h2>
        <p className="text-gray-700">{movie.overview}</p>
      </div>

      {/* Cast */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Cast</h2>
        <ul>
          {(movie.cast ?? []).map((member, index) => (
            <li key={index} className="text-gray-700">
              {member.name}
              {member.character && (
                <span className="italic"> as {member.character}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Trailer */}
      {movie.trailer && movie.trailer.site === 'YouTube' && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Trailer</h2>
          {/* 16:9 ratio container */}
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${movie.trailer.key}`}
              title={movie.trailer.name}
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  )
}
