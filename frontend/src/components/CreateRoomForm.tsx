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
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Room Name</label>
          <input
            type="text"
            placeholder="Friday Movie Night"
            className="w-full p-3 border rounded-md text-sm outline-none"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Friend Email</label>
          <input
            type="email"
            placeholder="friend@example.com"
            className="w-full p-3 border rounded-md text-sm outline-none"
            value={friendEmail}
            onChange={(e) => setFriendEmail(e.target.value)}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-orange-500 text-white rounded-md text-sm font-medium"
        >
          Create
        </button>
      </div>
    </div>
  )
}
