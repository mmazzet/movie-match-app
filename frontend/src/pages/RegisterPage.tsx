import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../services/authService'
import { getErrorMessage } from '../services/api'
import logger from '../services/logger'
import styles from './RegisterPage.module.css'

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
    <div className={styles.registerContainer}>
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

      {/* Register Content */}
      <div className={styles.registerContent}>
        <div className={styles.registerCard}>
          {/* Header */}
          <div className={styles.registerHeader}>
            <h1 className={styles.registerTitle}>Create Account</h1>
            <p className={styles.registerSubtitle}>
              Sign up to start finding movies with your friends.
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
                className={styles.btnSubmitRegister}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </div>

            {/* Footer */}
            <div className={styles.registerFooter}>
              <span className={styles.footerText}>
                Already have an account?{' '}
                <button
                  type="button"
                  className={styles.footerLink}
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
