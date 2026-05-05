import type { RoomMovie } from "../types/room";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

interface Props {
  movie: RoomMovie;
}

export default function RoomMovieCard({ movie }: Props) {
  return (
    <div className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:border-white/20 hover:bg-white/8 transition-all duration-300 flex gap-4 items-start group">
      {movie.poster_path ? (
        <img
          src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="w-12 aspect-[2/3] object-cover flex-shrink-0 rounded-md group-hover:shadow-lg group-hover:shadow-red-500/20 transition-all duration-300"
        />
      ) : (
        <div className="w-12 aspect-[2/3] bg-gradient-to-br from-slate-700 to-slate-800 rounded-md flex items-center justify-center flex-shrink-0">
          <p className="text-xs text-white/50">-</p>
        </div>
      )}
      <p className="font-semibold text-white flex-grow">{movie.title}</p>
    </div>
  );
}