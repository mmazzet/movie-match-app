import { useState, useEffect } from 'react'
import { SlowConnectionContext } from './SlowConnectionContext'
import { registerSlowConnectionHandler } from '../services/api'

export function SlowConnectionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSlowConnection, setIsSlowConnection] = useState(false)

  // Connect api.ts to this state
  useEffect(() => {
    registerSlowConnectionHandler(setIsSlowConnection)
  }, [])

  return (
    <SlowConnectionContext.Provider
      value={{ isSlowConnection, setIsSlowConnection }}
    >
      {children}
    </SlowConnectionContext.Provider>
  )
}
