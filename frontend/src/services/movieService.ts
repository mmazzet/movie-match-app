import api from './api'
import type { PaginatedMoviesResponse, SearchParams } from '../types/movie'

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
