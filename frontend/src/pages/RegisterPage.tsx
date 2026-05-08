import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../services/authService'
import { getErrorMessage } from '../services/api'
import logger from '../services/logger'

function RegisterPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await register({ email, password })
      logger.info('Registration successful')
      navigate('/login')
    } catch (error) {
      logger.error('Registration failed', error)
      setError(getErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 overflow-hidden">
      {/* Radial gradient overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.1), transparent 50%)',
        }}
      ></div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.05), transparent 50%)',
        }}
      ></div>

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center px-6 md:px-8 py-4 md:py-6">
        <div
          className="text-xl md:text-2xl font-black text-white tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate('/')}
        >
          🎬 MovieMatch
        </div>
        <button
          className="text-white hover:opacity-80 transition-opacity duration-300 font-semibold text-sm md:text-base"
          onClick={() => navigate('/')}
        >
          ← Back
        </button>
      </nav>

      {/* Register Content */}
      <div className="relative z-5 flex flex-col justify-center items-center min-h-[calc(100vh-100px)] px-4 md:px-8 py-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
              Create Account
            </h1>
            <p className="text-white/60 text-base md:text-lg">
              Sign up to start finding movies with your friends.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Error Message */}
            {error && (
              <div
                className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium"
                role="alert"
              >
                {error}
              </div>
            )}

            {/* Form Wrapper */}
            <div className="flex flex-col gap-6">
              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-white/70 text-xs font-semibold uppercase tracking-wide"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="px-4 py-3 rounded-lg bg-white/8 border border-white/15 text-white placeholder-white/40 font-medium outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-white/70 text-xs font-semibold uppercase tracking-wide"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="px-4 py-3 rounded-lg bg-white/8 border border-white/15 text-white placeholder-white/40 font-medium outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-lg bg-red-500 text-white font-bold text-base hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 mt-2"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </div>

            {/* Footer */}
            <div className="text-center mt-6">
              <span className="text-white/60 text-sm">
                Already have an account?{' '}
                <button
                  type="button"
                  className="text-red-500 font-semibold hover:text-red-400 transition-colors underline"
                  onClick={() => navigate('/login')}
                >
                  Sign in here
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
