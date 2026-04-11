import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import logger from '../services/logger'


function LandingPage() {
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/health')
      .then(() => {
        logger.info('Backend health check passed')
      })
      .catch((error) => {
        logger.error('Backend health check failed', error)
      })
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-medium text-center mb-4">
          Welcome to MovieMatch
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Discover movies you'll love!
        </p>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate('/login')}
            className="w-full py-3 bg-blue-500 text-white rounded-md text-sm font-medium"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="w-full py-3 bg-green-500 text-white rounded-md text-sm font-medium"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
