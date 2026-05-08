import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import logger from '../services/logger'

function LandingPage() {
  const navigate = useNavigate()

  useEffect(() => {
    api
      .get('/health')
      .then(() => {
        logger.info('Backend health check passed')
      })
      .catch((error) => {
        logger.error('Backend health check failed', error)
      })
  }, [])

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 overflow-hidden">
      {/* Radial gradient overlays */}
      <div
        className="absolute inset-0 bg-radial-red opacity-20 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.1), transparent 50%)',
        }}
      ></div>
      <div
        className="absolute inset-0 bg-radial-blue opacity-20 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.05), transparent 50%)',
        }}
      ></div>

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center px-6 md:px-8 py-4 md:py-6">
        <div className="text-xl md:text-2xl font-black text-white tracking-tight">
          🎬 MovieMatch
        </div>
        <div className="flex gap-3 md:gap-4 items-center">
          <button
            className="text-white hover:opacity-80 transition-opacity duration-300 font-semibold text-sm md:text-base"
            onClick={() => navigate('/login')}
          >
            Sign In
          </button>
          <button
            className="bg-white text-black rounded-lg font-bold px-4 md:px-6 py-2 md:py-2.5 hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-0.5 text-sm md:text-base"
            onClick={() => navigate('/register')}
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-5 flex flex-col justify-center items-center min-h-[calc(100vh-100px)] px-4 md:px-8 py-8 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 md:mb-8 tracking-tight leading-tight max-w-4xl">
          Find movies you both want to watch
          <br />
          <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            together
          </span>
        </h1>

        <p className="text-lg md:text-xl text-white/70 mb-8 md:mb-12 leading-relaxed max-w-2xl">
          Search, like your favorite movies, and instantly see which ones you
          and your friends both want to watch. No more endless debate.
        </p>

        <div className="flex flex-col gap-4 w-full max-w-md">
          <button
            className="px-8 py-4 rounded-lg bg-red-500 text-white font-bold text-lg hover:bg-red-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-red-500/30"
            onClick={() => navigate('/register')}
          >
            Get Started
          </button>
          <button
            className="px-8 py-4 rounded-lg bg-white/10 border border-white/30 text-white font-bold text-lg hover:bg-white/15 hover:border-white/50 transition-all duration-300 transform hover:-translate-y-1"
            onClick={() => navigate('/login')}
          >
            I already have an account
          </button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
