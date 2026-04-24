import type { RoomMovie } from "../types/room";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

interface Props {
  movie: RoomMovie;
}

export default function RoomMovieCard({ movie }: Props) {
  return (
    <div className="p-4 mb-2 bg-white rounded-lg shadow flex gap-4 items-center">
      {movie.poster_path ? (
        <img
          src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="w-16 h-24 object-cover rounded"
        />
      ) : (
        <div className="w-16 h-24 bg-gray-200 rounded flex items-center justify-center">
          <p className="text-xs text-gray-500">No poster</p>
        </div>
      )}
      <p className="font-medium">{movie.title}</p>
    </div>
  );
}