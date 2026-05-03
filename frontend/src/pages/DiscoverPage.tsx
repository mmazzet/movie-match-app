import { getPopularMovies } from '../services/movieService'
import MovieListPage from './MovieListPage'

export default function DiscoverPage() {
  return (
    <MovieListPage
      title="Discover Movies"
      fetchMovies={getPopularMovies}
    />
  )
}
