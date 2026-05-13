import { useState } from 'react'
import type { Movie } from '../types/movie'
import { likeMovie, unlikeMovie } from '../services/likesService'
import { Link } from 'react-router-dom'
import logger from '../services/logger'

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

interface MovieCardProps {
  movie: Movie
  isLiked: boolean
}

export default function MovieCard({ movie, isLiked }: MovieCardProps) {
  const [liked, setLiked] = useState(isLiked)

  const handleLike = async () => {
    try {
      if (liked) {
        await unlikeMovie(movie.tmdb_id)
        setLiked(false)
        logger.info('Movie unliked', movie.tmdb_id)
      } else {
        await likeMovie(movie)
        setLiked(true)
        logger.info('Movie liked', movie.tmdb_id)
      }
    } catch (error) {
      logger.error('Failed to update like status', error)
    }
  }
  return (
    <div className="group rounded-lg overflow-hidden bg-slate-800/50 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 flex flex-col">
      <Link
        to={`/movies/${movie.tmdb_id}`}
        className="relative w-full overflow-hidden"
      >
        {movie.poster_path ? (
          <img
            src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full aspect-[2/3] bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
            <p className="text-white/50">No poster</p>
          </div>
        )}
      </Link>
      <div className="p-3 flex flex-col flex-grow">
        <p className="font-bold text-white text-sm line-clamp-2 mb-1">
          {movie.title}
        </p>
        <p className="text-xs text-white/50 mb-3">{movie.release_date}</p>
        <button
          onClick={handleLike}
          className={`mt-auto px-3 py-2 rounded-md font-semibold text-sm transition-all duration-300 transform hover:-translate-y-0.5 ${
            liked
              ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/30'
              : 'bg-white/10 text-white border border-white/20 hover:bg-white/15 hover:border-white/30'
          }`}
        >
          {liked ? '❤ Liked' : '🤍 Like'}
        </button>
      </div>
    </div>
  )
}
