import { Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

export function PublicRoute({ children }: { children: React.ReactNode }) {
  const { token, isLoading } = useAuth()

  if (isLoading) {
    console.log("PublicRoute: still loading auth...")
    return <div>Loading...</div>
  }

  if (token) {
    console.log("PublicRoute: token found, redirecting to /discover")
    return <Navigate to="/discover" replace />
  }

  console.log("PublicRoute: no token, rendering page")
  return <>{children}</>
}