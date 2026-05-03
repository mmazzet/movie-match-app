import api from './api'
import type {
  MovieDetail,
  PaginatedMoviesResponse,
  SearchParams,
} from '../types/movie'

export const getPopularMovies = async (
  page: number = 1
): Promise<PaginatedMoviesResponse> => {
  const response = await api.get('/movies/popular', { params: { page } })
  return response.data
}

export const searchMovies = async (
  params: SearchParams
): Promise<PaginatedMoviesResponse> => {
  const response = await api.get('/movies/search', { params })
  return response.data
}

export const getMovieDetails = async (tmdbId: number): Promise<MovieDetail> => {
  const response = await api.get(`/movies/${tmdbId}`)
  return response.data
}

export const getTrendingMovies = async (
  page: number = 1
): Promise<PaginatedMoviesResponse> => {
  const response = await api.get('/movies/trending', { params: { page } })
  return response.data
}
