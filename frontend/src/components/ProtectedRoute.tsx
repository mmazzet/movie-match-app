import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { Navbar } from './Navbar'
import { useEffect } from 'react';

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiry = payload.exp * 1000;
    console.log("Token expires at:", new Date(expiry).toLocaleString());
    return Date.now() > expiry;
  } catch {
    return true;
  }
}

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token, isLoading, handleLogout } = useAuth()

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      console.log('ProtectedRoute: token expired, logging out')
      handleLogout()
    }
  }, [token, handleLogout])

  if (isLoading) {
    console.log('ProtectedRoute: still loading auth...')
    return <div>Loading...</div>
  }

  if (!token || isTokenExpired(token)) {
    console.log('ProtectedRoute: token missing or expired, redirecting to /login')
    return <Navigate to="/login" replace />
  }

  console.log('ProtectedRoute: token found, rendering page')
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
