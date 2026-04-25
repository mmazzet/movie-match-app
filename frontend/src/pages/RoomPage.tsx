import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRoomDetails } from '../services/roomService'
import type { RoomDetail } from '../types/room'
import RoomMovieCard from '../components/RoomMovieCard'
import logger from '../services/logger'

export default function RoomPage() {
  const { room_id } = useParams()
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
    return <p className="text-white p-8">Loading...</p>
  }

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-8">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-white mb-8">{room.room_name}</h1>

        {/* Your Movies */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-orange-500 mb-3">
            Your Movies
          </h2>
          {room.your_movies.map((movie) => (
            <RoomMovieCard key={movie.tmdb_id} movie={movie} />
          ))}
          {room.your_movies.length === 0 && (
            <p className="text-gray-400">No movies yet.</p>
          )}
        </section>

        {/* Friend Movies */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-orange-500 mb-3">
            {room.friend_email}'s Movies
          </h2>
          {room.friend_movies.map((movie) => (
            <RoomMovieCard key={movie.tmdb_id} movie={movie} />
          ))}
          {room.friend_movies.length === 0 && (
            <p className="text-gray-400">No movies yet.</p>
          )}
        </section>

        {/* Matches */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-orange-500 mb-3">
            {room.matches.length === 0
              ? 'No matches yet'
              : room.matches.length === 1
                ? 'Woohha 1 Match 🎉'
                : `Woohha ${room.matches.length} Matches 🎉`}
          </h2>
          {room.matches.map((movie) => (
            <RoomMovieCard key={movie.tmdb_id} movie={movie} />
          ))}
        </section>
      </div>
    </div>
  )
}
