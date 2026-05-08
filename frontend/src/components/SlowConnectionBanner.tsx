import { useSlowConnection } from '../hooks/useSlowConnection'

export function SlowConnectionBanner() {
  const { isSlowConnection } = useSlowConnection()

  if (!isSlowConnection) {
    return null
  }

  return (
    <div className="w-full bg-blue-50 border-b border-blue-200 px-4 py-3">
      <div className="flex items-center justify-center gap-2 text-blue-700 text-sm">
        {/* Spinner */}
        <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
        <span>Connecting to server, please wait 50s...</span>
      </div>
    </div>
  )
}
