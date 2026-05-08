import { useEffect, useState } from 'react'
import { ErrorContext } from './ErrorContext'
import { registerErrorHandler } from '../services/api'

export function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Register setErrorMessage so api.ts can call it directly
  useEffect(() => {
    registerErrorHandler(setErrorMessage)
  }, [])

  return (
    <ErrorContext.Provider value={{ errorMessage, setErrorMessage }}>
      {children}
    </ErrorContext.Provider>
  )
}
