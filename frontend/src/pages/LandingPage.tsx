import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

function LandingPage() {
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/health')
  }, [])

  return (
    <div className="h-screen flex bg-gray-bg1">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
          Welcome to MovieMatch
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Discover movies you'll love!
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 rounded text-white text-sm bg-blue-500"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="px-6 py-2 rounded text-white text-sm bg-green-500"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
