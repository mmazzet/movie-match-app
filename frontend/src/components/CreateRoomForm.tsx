import { useState } from 'react'
import { createRoom } from '../services/roomService'
import type { Room } from '../types/room'
import { getErrorMessage } from '../services/api'
import logger from '../services/logger'

interface Props {
  onRoomCreated: (newRoom: Room) => void
}

export default function CreateRoomForm({ onRoomCreated }: Props) {
  const [roomName, setRoomName] = useState('')
  const [friendEmail, setFriendEmail] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit() {
    // Validate room name is not empty
    if (roomName.trim() === '') {
      setError('Please enter a room name')
      return // Stop here, don't submit
    }

    // Validate friend email is not empty
    if (friendEmail.trim() === '') {
      setError("Please enter a friend's email")
      return
    }

    // Clear any previous error
    setError('')

    // Try to create the room, catch any errors
    try {
      logger.info('🏠 Creating room:', { roomName, friendEmail })
      const newRoom = await createRoom({
        room_name: roomName,
        friend_email: friendEmail,
      })
      logger.info('✅ Room created:', newRoom)

      onRoomCreated(newRoom)
      setRoomName('')
      setFriendEmail('')
    } catch (err) {
      // Show the error to the user
      logger.error('❌ Error creating room:', err)
      setError(getErrorMessage(err))
    }
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-8">
      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-red-400 text-sm mb-4 font-medium">
          {error}
        </div>
      )}
      <div className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-semibold text-white/80 mb-2 uppercase tracking-wide">
            Room Name
          </label>
          <input
            type="text"
            placeholder="Friday Movie Night"
            className="w-full p-3 bg-white/8 border border-white/15 rounded-md text-white text-sm outline-none placeholder-white/40 font-medium
                       focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-white/80 mb-2 uppercase tracking-wide">
            Friend Email
          </label>
          <input
            type="email"
            placeholder="friend@example.com"
            className="w-full p-3 bg-white/8 border border-white/15 rounded-md text-white text-sm outline-none placeholder-white/40 font-medium
                       focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
            value={friendEmail}
            onChange={(e) => setFriendEmail(e.target.value)}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-red-500 text-white rounded-md text-sm font-semibold hover:bg-red-600 transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Create Room
        </button>
      </div>
    </div>
  )
}
