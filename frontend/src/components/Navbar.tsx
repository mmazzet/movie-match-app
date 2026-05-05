import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export function Navbar() {
  const { handleLogout } = useAuth()

  return (
    <nav className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between px-6 py-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-white/10 text-white gap-4">
      
      <div className="flex items-center justify-between">
        <span className="font-black text-xl tracking-tight">🎬 MovieMatch</span>
        <button 
          onClick={handleLogout} 
          className="md:hidden px-3 py-1 rounded text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 text-sm font-semibold"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        <Link 
          to="/trending" 
          className="text-white/70 hover:text-white font-semibold transition-colors duration-300"
        >
          Trending
        </Link>
        <Link 
          to="/discover" 
          className="text-white/70 hover:text-white font-semibold transition-colors duration-300"
        >
          Discover
        </Link>
        <Link 
          to="/my-movies" 
          className="text-white/70 hover:text-white font-semibold transition-colors duration-300"
        >
          My Movies
        </Link>
        <Link 
          to="/rooms" 
          className="text-white/70 hover:text-white font-semibold transition-colors duration-300"
        >
          Rooms
        </Link>
      </div>

      <button 
        onClick={handleLogout} 
        className="hidden md:block px-4 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition-all duration-300 text-sm"
      >
        Logout
      </button>

    </nav>
  )
}
