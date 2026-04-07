import { useState } from 'react'
import { login } from '../services/authService'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { getErrorMessage } from '../services/api'

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
      navigate('/discover')
    } catch (error) {
      setError(getErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex bg-gray-bg1">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
          Login
        </h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center items-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`bg-green py-2 px-4 text-sm bg-orange-500 rounded border border-green focus:outline-none focus:border-green-dark`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
