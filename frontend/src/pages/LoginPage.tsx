import { useState } from 'react'
import { login } from '../services/authService'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { getErrorMessage } from '../services/api'
import logger from '../services/logger'
import styles from './LoginPage.module.css'

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
    <div className={styles.loginContainer}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div 
          className={styles.navbarLogo}
          onClick={() => navigate('/')}
        >
          🎬 MovieMatch
        </div>
        <button 
          className={styles.navbarBack}
          onClick={() => navigate('/')}
        >
          ← Back
        </button>
      </nav>

      {/* Login Content */}
      <div className={styles.loginContent}>
        <div className={styles.loginCard}>
          {/* Header */}
          <div className={styles.loginHeader}>
            <h1 className={styles.loginTitle}>Sign In</h1>
            <p className={styles.loginSubtitle}>
              Welcome back! Sign in to see your movie matches.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Error Message */}
            {error && (
              <div className={styles.errorMessage} role="alert">
                {error}
              </div>
            )}

            {/* Form Wrapper */}
            <div className={styles.formWrapper}>
              {/* Email Field */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className={styles.formInput}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Field */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className={styles.formInput}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={loading} 
                className={styles.btnSubmitLogin}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>

            {/* Footer */}
            <div className={styles.loginFooter}>
              <span className={styles.footerText}>
                Don't have an account?{' '}
                <button
                  type="button"
                  className={styles.footerLink}
                  onClick={() => navigate('/register')}
                >
                  Sign up here
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
