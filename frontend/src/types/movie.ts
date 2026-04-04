export interface Movie {
  id: number;
  tmdb_id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  overview: string;
}

export interface LikeRequest {
  tmdb_id: number;
  title: string;
  poster_path: string | null;
  release_date: string | null;
  overview: string;
}