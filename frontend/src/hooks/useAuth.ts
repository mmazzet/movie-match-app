import { useState } from 'react'

function useAuth() {
  const [token, setToken] = useState<string | null>(() => {
    console.log('initialising token from localStorage')
    return localStorage.getItem('token')
  })

  const handleLogin = (newToken: string) => {
    console.log('saving token:', newToken)
    setToken(newToken)
    localStorage.setItem('token', newToken)
  }

  console.log('current token:', token)

  return { token, handleLogin }
}

export default useAuth