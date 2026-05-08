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
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <p className="text-white/60 text-lg">Loading...</p>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <p className="text-white/60 text-lg">Movie not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* On mobile: stack vertically. On larger screens: side by side */}
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          {movie.poster_path ? (
            <div className="w-full md:w-56 flex-shrink-0">
              <img
                src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="w-full aspect-[2/3] object-cover rounded-lg shadow-2xl shadow-red-500/20"
              />
            </div>
          ) : (
            <div className="w-full md:w-56 aspect-[2/3] bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center rounded-lg flex-shrink-0">
              <p className="text-white/50">No poster</p>
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
              {movie.title}
            </h1>
            <p className="text-white/70 mb-2">📅 {movie.release_date}</p>
            <p className="text-white/70 mb-2">⏱️ {movie.runtime} min</p>
            <p className="text-yellow-400 font-bold text-xl mb-4">
              ⭐ {movie.vote_average?.toFixed(1)}/10
            </p>
            <p className="text-white/70 mb-2">
              🎭 {(movie.genres ?? []).join(', ')}
            </p>
            <p className="text-white/70 mb-3">
              🌍 {movie.origin_country.join(', ')}
            </p>
            {movie.director && (
              <p className="text-white/70">
                🎬 Director:{' '}
                <span className="font-semibold text-white">
                  {movie.director}
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Synopsis */}
        <div className="mb-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Synopsis</h2>
          <p className="text-white/80 leading-relaxed">{movie.overview}</p>
        </div>

        {/* Cast */}
        {(movie.cast ?? []).length > 0 && (
          <div className="mb-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Cast</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(movie.cast ?? []).map((member, index) => (
                <li key={index} className="text-white/80">
                  <span className="font-semibold text-white">
                    {member.name}
                  </span>
                  {member.character && (
                    <span className="text-white/60">
                      {' '}
                      as {member.character}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Trailer */}
        {movie.trailer && movie.trailer.site === 'YouTube' && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Trailer</h2>
            {/* 16:9 ratio container */}
            <div
              className="relative w-full"
              style={{ paddingBottom: '56.25%' }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${movie.trailer.key}`}
                title={movie.trailer.name}
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
