import { useState } from 'react'
import type { Movie } from '../types/movie'
import { markWatched, unmarkWatched } from '../services/watchedService'
import logger from '../services/logger'

interface WatchedButtonProps {
  movie: Movie
  isWatched: boolean
}

export default function WatchedButton({
  movie,
  isWatched,
}: WatchedButtonProps) {
  const [watched, setWatched] = useState(isWatched)

  const handleWatched = async (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    try {
      if (watched) {
        await unmarkWatched(movie.tmdb_id)
        setWatched(false)
        logger.info('Movie unmarked as watched', movie.tmdb_id)
      } else {
        await markWatched(movie)
        setWatched(true)
        logger.info('Movie marked as watched', movie.tmdb_id)
      }
    } catch (error) {
      logger.error('Failed to update watched status', error)
    }
  }
  return (
    <button
      onClick={(e) => handleWatched(e)}
      title={watched ? 'Mark as unwatched' : 'Mark as watched'}
      className={`absolute top-2 right-2 text-lg rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 ${
        watched
          ? 'bg-blue-500/80 text-white'
          : 'bg-black/40 text-white/50 hover:text-white hover:bg-black/60'
      }`}
    >
      {watched ? '👁️' : '👁️'}
    </button>
  )
}
