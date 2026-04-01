import type { Movie } from "../types/movie";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div>
      {movie.poster_path ? (
        <img
          src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          width={200}
        />
      ) : (
        <p>No poster available</p>
      )}
      <p>{movie.title}</p>
      <p>{movie.release_date}</p>
    </div>
  );
}