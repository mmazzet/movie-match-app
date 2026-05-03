import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export function Navbar() {
  const { handleLogout } = useAuth()

  return (
    <nav className="flex flex-col md:flex-row md:items-center md:justify-between px-6 py-4 bg-gray-900 text-white gap-4">
      
      <div className="flex items-center justify-between">
        <span className="font-bold text-lg">MovieMatch</span>
        <button onClick={handleLogout} className="md:hidden hover:text-gray-300">
          Logout
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <Link to="/trending" className="hover:text-gray-300">
          Trending
        </Link>
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

      <button onClick={handleLogout} className="hidden md:block hover:text-gray-300">
        Logout
      </button>

    </nav>
  )
}
