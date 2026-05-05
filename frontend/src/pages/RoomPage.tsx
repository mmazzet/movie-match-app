import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getRoomDetails } from '../services/roomService'
import type { RoomDetail } from '../types/room'
import RoomMovieCard from '../components/RoomMovieCard'
import logger from '../services/logger'

export default function RoomPage() {
  const { room_id } = useParams()
  const navigate = useNavigate()
  const [room, setRoom] = useState<RoomDetail | null>(null)

  useEffect(() => {
    async function fetchRoom() {
      const data = await getRoomDetails(Number(room_id))
      logger.info('🏠 Room details fetched:', data)
      setRoom(data)
    }
    fetchRoom()
  }, [room_id])

  if (!room) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center"><p className="text-white/60 text-lg">Loading...</p></div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="px-4 py-8 md:px-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => navigate('/rooms')}
            className="px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/15 hover:border-white/30 transition-all duration-300 text-sm flex-shrink-0"
          >
            ← Back to Rooms
          </button>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">{room.room_name}</h1>
        </div>

        {/* Matches - Featured at top */}
        {room.matches.length > 0 && (
          <section className="mb-12 p-6 bg-gradient-to-r from-red-500/10 to-red-500/5 border border-red-500/20 rounded-lg">
            <h2 className="text-2xl font-black text-red-400 mb-6">
              {room.matches.length === 1
                ? '🎉 1 Match Found!'
                : `🎉 ${room.matches.length} Matches Found!`}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {room.matches.map((movie) => (
                <RoomMovieCard key={movie.tmdb_id} movie={movie} />
              ))}
            </div>
          </section>
        )}

        {/* Your Movies */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-6">Your Movies</h2>
          {room.your_movies.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {room.your_movies.map((movie) => (
                <RoomMovieCard key={movie.tmdb_id} movie={movie} />
              ))}
            </div>
          ) : (
            <p className="text-white/60 py-8">No movies yet.</p>
          )}
        </section>

        {/* Friend Movies */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-6">
            {room.friend_email}'s Movies
          </h2>
          {room.friend_movies.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {room.friend_movies.map((movie) => (
                <RoomMovieCard key={movie.tmdb_id} movie={movie} />
              ))}
            </div>
          ) : (
            <p className="text-white/60 py-8">No movies yet.</p>
          )}
        </section>
      </div>
    </div>
  )
}
