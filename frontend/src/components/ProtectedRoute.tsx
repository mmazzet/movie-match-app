import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { Navbar } from './Navbar'
import { useEffect } from 'react'
import logger from '../services/logger'
import { jwtDecode } from 'jwt-decode'

function isTokenExpired(token: string): boolean {
  try {
    const payload = jwtDecode(token)
    const expiry = (payload.exp ?? 0) * 1000
    logger.info('Token expiry check', new Date(expiry).toLocaleString())
    return Date.now() > expiry
  } catch {
    logger.warn('Could not parse token — treating as expired')
    return true
  }
}

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token, isLoading, handleLogout } = useAuth()

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      logger.warn('ProtectedRoute: token expired, logging out')
      handleLogout()
    }
  }, [token, handleLogout])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!token || isTokenExpired(token)) {
    logger.warn(
      'ProtectedRoute: token missing or expired, redirecting to login'
    )
    return <Navigate to="/login" replace />
  }

  logger.info('ProtectedRoute: access granted')
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
