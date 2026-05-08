import { useContext } from 'react'
import { SlowConnectionContext } from '../context/SlowConnectionContext'

export function useSlowConnection() {
  const context = useContext(SlowConnectionContext)
  if (!context) {
    throw new Error(
      'useSlowConnection must be used inside SlowConnectionProvider'
    )
  }
  return context
}
