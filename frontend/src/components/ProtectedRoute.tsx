import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { Navbar } from './Navbar'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token, isLoading } = useAuth()

  if (isLoading) {
    console.log('ProtectedRoute: still loading auth...')
    return <div>Loading...</div>
  }

  if (!token) {
    console.log('ProtectedRoute: no token, redirecting to /login')
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
