import { createContext } from 'react'
import type { ErrorContextType } from './ErrorContextType'

export const ErrorContext = createContext<ErrorContextType | undefined>(
  undefined
)
