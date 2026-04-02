import type { Movie } from "../types/movie";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="rounded overflow-hidden shadow">
      {movie.poster_path ? (
        <img
          src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="w-full"
        />
      ) : (
        <div className="bg-gray-200 h-48 flex items-center justify-center">
          <p>No poster</p>
        </div>
      )}
      <div className="p-2">
        <p className="font-semibold">{movie.title}</p>
        <p className="text-sm text-gray-500">{movie.release_date}</p>
      </div>
    </div>
  );
}