const isDevelopment = import.meta.env.DEV

const logger = {
  // Use for general info: page loads, actions taken
  info: (message: string, data?: unknown) => {
    if (isDevelopment) {
      console.log(`[INFO] ${message}`, data ?? '')
    }
    // TODO: send to New Relic / Sentry in production
  },

  // Use for errors: API failures, unexpected states
  error: (message: string, error?: unknown) => {
    console.error(`[ERROR] ${message}`, error ?? '')
    // TODO: send to New Relic / Sentry always (dev + prod)
  },

  // Use for warnings: something unexpected but not broken
  warn: (message: string, data?: unknown) => {
    if (isDevelopment) {
      console.warn(`[WARN] ${message}`, data ?? '')
    }
  },
}

export default logger
