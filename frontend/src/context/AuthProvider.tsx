import { useState } from 'react'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const isLoading = false
  const [token, setToken] = useState<string | null>(() => {
    console.log('initialising token from localStorage')
    return localStorage.getItem('token')
  })

  const handleLogin = (newToken: string) => {
    console.log('saving token:', newToken)
    setToken(newToken)
    localStorage.setItem('token', newToken)
  }

  const handleLogout = () => {
    console.log('logging out, clearing token')
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
