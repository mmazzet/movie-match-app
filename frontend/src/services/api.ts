import axios from 'axios'
import logger from './logger'

type ValidationError = {
  field: string
  message: string
}

let setGlobalError: ((message: string | null) => void) | null = null

export function registerErrorHandler(
  handler: (message: string | null) => void
) {
  setGlobalError = handler
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      !error.config?.url?.includes('/auth/login') // skip login route
    ) {
      logger.warn('Token expired or invalid — redirecting to login')
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    if (error.response?.status === 503) {
      logger.warn('Service unavailable — DB might be down')
      if (setGlobalError) {
        setGlobalError(
          'The server is currently unavailable. Please try again later.'
        )
      }
    }
    return Promise.reject(error)
  }
)

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data

    // Case 1: custom exception (string)
    if (typeof data?.error === 'string') {
      return data.error
    }

    // Case 2: validation errors (array)
    if (Array.isArray(data?.errors)) {
      const errors = data.errors as ValidationError[]
      return errors
        .map((e) => e.message.replace('Value error, ', ''))
        .join('\n')
    }
  }

  return 'Something went wrong. Please try again.'
}

export default api
