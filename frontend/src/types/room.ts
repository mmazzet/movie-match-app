// Simpler movie type used inside room details
export interface RoomMovie {
  tmdb_id: number;
  title: string;
  poster_path: string | null;
}

// A single room in the list (matches backend RoomResponse)
export interface Room {
  id: number;
  name: string;
  created_by: number;
}

// The detail view of a room (matches backend RoomDetailResponse)
export interface RoomDetail {
  room_id: number;
  room_name: string;
  current_user_email: string;
  friend_email: string;
  your_movies: RoomMovie[];
  friend_movies: RoomMovie[];
  matches: RoomMovie[];
}

// What we send to create a room
export interface CreateRoomRequest {
  room_name: string;
  friend_email: string;
}