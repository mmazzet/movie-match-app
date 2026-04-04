import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export function Navbar() {
  const { handleLogout } = useAuth()

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
      <span className="font-bold text-lg">MovieMatch</span>
      <div className="flex gap-6">
        <Link to="/discover" className="hover:text-gray-300">
          Discover
        </Link>
        <Link to="/my-movies" className="hover:text-gray-300">
          My Movies
        </Link>
        <Link to="/rooms" className="hover:text-gray-300">
          Rooms
        </Link>
      </div>
      <button onClick={handleLogout} className="hover:text-gray-300">
        Logout
      </button>
    </nav>
  )
}
