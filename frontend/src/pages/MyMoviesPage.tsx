import { useEffect, useState } from 'react'
import { getLikedMovies, unlikeMovie } from '../services/likesService'
import type { Movie } from '../types/movie'

export default function MyMoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const handleUnlike = async (tmdb_id: number) => {
    await unlikeMovie(tmdb_id)
    setMovies((prev) => prev.filter((m) => m.tmdb_id !== tmdb_id))
  }

  useEffect(() => {
    getLikedMovies().then((data) => {
      console.log('Liked movies:', data)
      setMovies(data)
    })
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Movies</h1>
      <p className="mb-6 text-gray-400">{movies.length} movies liked</p>
      <div className="flex flex-col gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg"
          >
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                alt={movie.title}
                className="rounded"
              />
            )}
            <div>
              <h2 className="font-bold">{movie.title}</h2>
              <p className="text-gray-400 text-sm">{movie.release_date}</p>
              <button
                onClick={() => handleUnlike(movie.tmdb_id)}
                className="mt-2 px-4 py-1 rounded text-white text-sm bg-red-500"
              >
                Unlike
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
