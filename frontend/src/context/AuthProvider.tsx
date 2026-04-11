import { useState } from 'react'
import { AuthContext } from './AuthContext'
import logger from '../services/logger'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const isLoading = false
  const [token, setToken] = useState<string | null>(() => {
    logger.info('Initialising token from localStorage')
    return localStorage.getItem('token')
  })

  const handleLogin = (newToken: string) => {
    logger.info('User logged in, token saved')
    setToken(newToken)
    localStorage.setItem('token', newToken)
  }

  const handleLogout = () => {
    logger.info('User logged out, token cleared')
    setToken(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider
      value={{ token, handleLogin, handleLogout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}
