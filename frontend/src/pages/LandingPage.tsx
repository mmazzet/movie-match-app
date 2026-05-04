import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import logger from '../services/logger'
import styles from './LandingPage.module.css'

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
    <div className={styles.heroContainer}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.navbarLogo}>🎬 MovieMatch</div>
        <div className={styles.navbarButtons}>
          <button 
            className={styles.btnSignIn}
            onClick={() => navigate('/login')}
          >
            Sign In
          </button>
          <button 
            className={styles.btnSignUp}
            onClick={() => navigate('/register')}
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Find movies you both want to watch
          <br />
          <span className={styles.heroTitleHighlight}>together</span>
        </h1>

        <p className={styles.heroSubtitle}>
          Search, like your favorite movies, and instantly see which ones
          you and your friends both want to watch. No more endless debate.
        </p>

        <div className={styles.heroCta}>
          <button
            className={styles.btnPrimaryHero}
            onClick={() => navigate('/register')}
          >
            Get Started
          </button>
          <button
            className={styles.btnSecondaryHero}
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
