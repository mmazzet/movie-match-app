import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRooms } from '../services/roomService'
import type { Room } from '../types/room'
import CreateRoomForm from '../components/CreateRoomForm'
import logger from '../services/logger'

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchRooms() {
      const data = await getRooms()
      logger.info('🏠 Rooms fetched:', data)
      setRooms(data)
    }
    fetchRooms()
  }, [])

  // Called by CreateRoomForm when a room is created
  function handleRoomCreated(newRoom: Room) {
    setRooms([...rooms, newRoom])
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="px-4 py-8 md:px-6 max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            My Rooms
          </h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            {showForm ? '✕ Cancel' : '+ Create Room'}
          </button>
        </div>

        {showForm && <CreateRoomForm onRoomCreated={handleRoomCreated} />}

        <div className="space-y-4">
          {rooms.map((room) => (
            <div
              key={room.id}
              onClick={() => navigate(`/rooms/${room.id}`)}
              className="p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg cursor-pointer hover:border-white/20 hover:bg-white/8 transition-all duration-300 group"
            >
              <p className="font-bold text-white text-lg group-hover:text-red-400 transition-colors">
                {room.name}
              </p>
            </div>
          ))}
        </div>

        {rooms.length === 0 && !showForm && (
          <p className="text-white/60 text-center py-8">
            No rooms yet. Create one to get started!
          </p>
        )}
      </div>
    </div>
  )
}
