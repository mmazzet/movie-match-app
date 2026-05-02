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
    <div className="rounded overflow-hidden shadow">
      <Link to={`/movies/${movie.tmdb_id}`}>
        {movie.poster_path ? (
          <img
            src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-full"
          />
        ) : (
          <div className="bg-gray-200 h-48 flex items-center justify-center">
            <p>No poster</p>
          </div>
        )}
      </Link>
      <div className="p-2">
        <p className="font-semibold">{movie.title}</p>
        <p className="text-sm text-gray-500">{movie.release_date}</p>
        <button
          onClick={handleLike}
          className={`mt-2 px-4 py-1 rounded text-white text-sm ${liked ? 'bg-red-500' : 'bg-blue-500'}`}
        >
          {liked ? 'Unlike' : 'Like'}
        </button>
      </div>
    </div>
  )
}
