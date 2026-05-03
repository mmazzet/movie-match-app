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
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: 'linear-gradient(135deg, #0f1117 0%, #1a1f2e 100%)',
      }}
    >
      {/* Subtle background grain/texture effect */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      ></div>

      <div className="relative w-full max-w-md text-center">
        {/* Logo / Icon */}
        <div className="mb-6 flex justify-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
            style={{
              background: 'rgba(251,191,36,0.15)',
              border: '1px solid rgba(251,191,36,0.3)',
            }}
          >
            🎬
          </div>
        </div>

        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
          MovieMatch
        </h1>
        <p className="text-lg mb-2" style={{ color: '#fbbf24' }}>
          Find movies you both want to watch.
        </p>
        <p className="text-sm mb-10" style={{ color: '#6b7280' }}>
          Build your list. Share a room. Discover your matches.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate('/login')}
            className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ background: '#fbbf24', color: '#0f1117' }}
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="w-full py-3 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{
              background: 'rgba(255,255,255,0.07)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
