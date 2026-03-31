import { useState, useEffect } from "react"
import { AuthContext } from "./AuthContext"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState<string | null>(() => {
    console.log("initialising token from localStorage")
    return localStorage.getItem("token")
  })

  const handleLogin = (newToken: string) => {
    console.log("saving token:", newToken)
    setToken(newToken)
    localStorage.setItem("token", newToken)
  }

  const handleLogout = () => {
    console.log("logging out, clearing token")
    setToken(null)
    localStorage.removeItem("token")
  }

  useEffect(() => {
    console.log("checking auth on app load...")
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      setToken(storedToken)
    }
    setIsLoading(false)
    console.log("auth check complete, isLoading: false")
  }, [])
  console.log("AuthProvider token:", token)

  return (
    <AuthContext.Provider value={{ token, handleLogin, handleLogout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}