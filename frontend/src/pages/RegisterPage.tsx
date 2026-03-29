import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../services/authService'

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
      const user = await register({ email, password })
      console.log('Registration successful!', user)
      navigate('/login')
    } catch {
      setError('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Create an account</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            placeholder="email@example.com" 
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>
    </div>
  )
}

export default RegisterPage

