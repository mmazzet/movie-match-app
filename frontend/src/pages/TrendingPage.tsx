import { getTrendingMovies } from '../services/movieService'
import MovieListPage from './MovieListPage'

export default function TrendingPage() {
  return (
    <MovieListPage
      title="Trending Movies"
      fetchMovies={getTrendingMovies}
    />
  )
}