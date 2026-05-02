export interface Movie {
  id: number
  tmdb_id: number
  title: string
  poster_path: string | null
  release_date: string
  overview: string
}

export interface LikeRequest {
  tmdb_id: number
  title: string
  poster_path: string | null
  release_date: string | null
  overview: string
}

export interface PaginatedMoviesResponse {
  page: number
  total_pages: number
  movies: Movie[]
}

export interface SearchParams {
  query?: string
  genre?: number
  year_from?: number
  year_to?: number
  country?: string
  language?: string
  min_rating?: number
  sort_by?: string
  page?: number
}

export interface CastMember {
  name: string
  character: string
  profile_path: string | null
}

export interface VideoResult {
  name: string // added — video title
  key: string
  type: string
  site: string
}

export interface MovieDetail {
  tmdb_id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string | null
  runtime: number | null
  vote_average: number | null
  genres: string[]
  origin_country: string[]
  cast: CastMember[]
  director: string | null
  trailer: VideoResult | null
}
