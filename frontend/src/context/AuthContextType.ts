export type AuthContextType = {
  token: string | null
  handleLogin: (token: string) => void
  handleLogout: () => void
}