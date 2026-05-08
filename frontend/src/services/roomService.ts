/* 
createRoom() — POST /rooms
getRooms() — GET /rooms
getRoomDetails() — GET /rooms/{room_id} 
*/

import api from './api'
import type { Room, RoomDetail, CreateRoomRequest } from '../types/room'

// Fetch all rooms the current user belongs to
export async function getRooms(): Promise<Room[]> {
  const response = await api.get('/rooms')
  return response.data
}

// Fetch details for a specific room
export async function getRoomDetails(roomId: number): Promise<RoomDetail> {
  const response = await api.get(`/rooms/${roomId}`)
  return response.data
}

// Create a new room with a friend
export async function createRoom(data: CreateRoomRequest): Promise<Room> {
  const response = await api.post('/rooms', data)
  return response.data
}
