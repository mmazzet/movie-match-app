import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import logger from '../services/logger'

export function PublicRoute({ children }: { children: React.ReactNode }) {
  const { token, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (token) {
    logger.info('PublicRoute: authenticated user redirected to trending')
    return <Navigate to="/trending" replace />
  }

  return <>{children}</>
}
