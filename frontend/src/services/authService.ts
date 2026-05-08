import api from './api'
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
} from '../types/auth'

export const register = async (
  credentials: RegisterCredentials
): Promise<User> => {
  const response = await api.post<User>('/auth/register', credentials)
  return response.data
}

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const formData = new URLSearchParams()
  formData.append('username', credentials.email)
  formData.append('password', credentials.password)
  const response = await api.post<AuthResponse>('/auth/login', formData)
  return response.data
}
