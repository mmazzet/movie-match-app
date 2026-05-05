import { useEffect, useState } from 'react'
import { getLikedMovies, unlikeMovie } from '../services/likesService'
import type { Movie } from '../types/movie'
import logger from '../services/logger'

export default function MyMoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const handleUnlike = async (tmdb_id: number) => {
    try {
      await unlikeMovie(tmdb_id)
      setMovies((prev) => prev.filter((m) => m.tmdb_id !== tmdb_id))
      logger.info('Movie unliked', tmdb_id)
    } catch  (error){
      logger.error('Failed to unlike movie', error)
    }
  }

 useEffect(() => {
    getLikedMovies()
      .then((data) => {
        logger.info('Liked movies loaded', data.length)
        setMovies(data)
      })
      .catch((error) => {
        logger.error('Failed to load liked movies', error)
        setError('Failed to load your movies. Please try again.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-8 md:px-6">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">My Movies</h1>
        <p className="text-white/60">Loading your movies...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-8 md:px-6">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-8 tracking-tight">My Movies</h1>
        <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-4 text-red-400">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="px-4 py-8 md:px-6 max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">My Movies</h1>
        <p className="mb-10 text-white/60 font-semibold">{movies.length} movies liked</p>
        <div className="space-y-8">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-white/20 transition-all duration-300 hover:bg-white/8 group`}
            >
              {movie.poster_path && (
                <div className="w-full md:w-56 flex-shrink-0">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full aspect-[2/3] object-cover rounded-lg group-hover:shadow-2xl group-hover:shadow-red-500/30 transition-all duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="font-black text-2xl md:text-3xl text-white mb-3">{movie.title}</h2>
                  <p className="text-white/70 mb-4 leading-relaxed">{movie.overview || 'No description available.'}</p>
                  <div className="flex flex-wrap gap-4">
                    <div>
                      <p className="text-white/60 text-sm">Release Date</p>
                      <p className="text-white font-semibold">{movie.release_date}</p>
                    </div>
                    {movie.vote_average && (
                      <div>
                        <p className="text-white/60 text-sm">Rating</p>
                        <p className="text-yellow-400 font-semibold">⭐ {movie.vote_average.toFixed(1)}/10</p>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleUnlike(movie.tmdb_id)}
                  className="mt-6 px-6 py-3 rounded-lg text-white text-sm bg-red-500 font-semibold 
                           hover:bg-red-600 transition-all duration-300 transform hover:-translate-y-0.5 w-full md:w-auto"
                >
                  ✕ Remove from My Movies
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
