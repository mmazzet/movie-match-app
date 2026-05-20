import type { RoomMovie } from '../types/room'

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

interface Props {
  movie: RoomMovie
}

export default function RoomMovieCard({ movie }: Props) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:border-white/20 hover:bg-white/8 transition-all duration-300 overflow-hidden group">
      {movie.poster_path ? (
        <img
          src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="w-full aspect-2/3 object-cover group-hover:shadow-lg transition-all duration-300"
        />
      ) : (
        <div className="w-full aspect-2/3 bg-linear-to-br from-slate-700 to-slate-800 flex items-center justify-center">
          <p className="text-xs text-white/50">-</p>
        </div>
      )}
      <p className="font-semibold text-white text-sm p-2">{movie.title}</p>
    </div>
  )
}
