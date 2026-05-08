import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useError } from '../hooks/useError'

export function ErrorBanner() {
  const { errorMessage, setErrorMessage } = useError()
  const location = useLocation()

  // Clear the error every time the user navigates to a new page
  useEffect(() => {
    setErrorMessage(null)
  }, [location.pathname, setErrorMessage])

  if (!errorMessage) return null

  return (
    <div
      style={{
        background: 'red',
        color: 'white',
        padding: '10px',
        textAlign: 'center',
      }}
    >
      {errorMessage}
      <button
        onClick={() => setErrorMessage(null)}
        style={{ marginLeft: '10px' }}
      >
        X
      </button>
    </div>
  )
}
