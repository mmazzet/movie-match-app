import api from './api'
import type { WatchedRequest, Movie } from '../types/movie'

export const markWatched = async (movie: WatchedRequest): Promise<void> => {
  await api.post('/watched', movie)
}

export const unmarkWatched = async (tmdb_id: number): Promise<void> => {
  await api.delete(`/watched/${tmdb_id}`)
}

export const getWatchedMovies = async (): Promise<Movie[]> => {
  const response = await api.get('/watched')
  return response.data
}
