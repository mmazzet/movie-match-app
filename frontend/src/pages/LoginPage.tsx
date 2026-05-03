import { useState } from 'react'
import { login } from '../services/authService'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { getErrorMessage } from '../services/api'
import logger from '../services/logger'

function LoginPage() {
  const navigate = useNavigate()
  const { handleLogin } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await login({ email, password })
      handleLogin(response.access_token)
      logger.info('Login successful')
      navigate('/trending')
    } catch (error) {
      logger.error('Login failed', error)
      setError(getErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: 'linear-gradient(135deg, #0f1117 0%, #1a1f2e 100%)',
      }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-8"
        style={{
          background: '#1a1f2e',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        }}
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{
              background: 'rgba(251,191,36,0.15)',
              border: '1px solid rgba(251,191,36,0.3)',
            }}
          >
            🎬
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-white mb-1">
          Login
        </h1>
        <p className="text-center text-sm mb-8" style={{ color: '#6b7280' }}>
          Welcome back
        </p>

        {error && (
          <p
            className="text-sm mb-4 px-3 py-2 rounded-lg"
            style={{
              color: '#f87171',
              background: 'rgba(248,113,113,0.1)',
              border: '1px solid rgba(248,113,113,0.2)',
            }}
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: '#9ca3af' }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              className="w-full p-3 rounded-lg text-sm outline-none transition-all"
              style={{
                background: '#0f1117',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: '#9ca3af' }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 rounded-lg text-sm outline-none transition-all"
              style={{
                background: '#0f1117',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-50"
            style={{ background: '#fbbf24', color: '#0f1117' }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
