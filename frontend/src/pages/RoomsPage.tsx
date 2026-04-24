import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRooms } from "../services/roomService";
import type { Room } from "../types/room";
import CreateRoomForm from "../components/CreateRoomForm";

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRooms() {
      const data = await getRooms();
      console.log("🏠 Rooms fetched:", data);
      setRooms(data);
    }
    fetchRooms();
  }, []);

  // Called by CreateRoomForm when a room is created
  function handleRoomCreated(newRoom: Room) {
    setRooms([...rooms, newRoom]);
    setShowForm(false);
  }

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-8">
      <div className="w-full max-w-md mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">My Rooms</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm font-medium"
          >
            {showForm ? "Cancel" : "Create Room"}
          </button>
        </div>

        {showForm && (
          <CreateRoomForm onRoomCreated={handleRoomCreated} />
        )}

        {rooms.map((room) => (
          <div
            key={room.id}
            onClick={() => navigate(`/rooms/${room.id}`)}
            className="p-4 mb-3 bg-white rounded-lg shadow cursor-pointer hover:bg-orange-50"
          >
            <p className="font-medium">{room.name}</p>
          </div>
        ))}

        {rooms.length === 0 && !showForm && (
          <p className="text-gray-400">No rooms yet.</p>
        )}

      </div>
    </div>
  );
}