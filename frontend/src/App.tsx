import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import DiscoverPage from './pages/DiscoverPage'
import { AuthProvider } from './context/AuthProvider'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PublicRoute } from './components/PublicRoute'
import LandingPage from './pages/LandingPage'
import MyMoviesPage from './pages/MyMoviesPage'
import RoomsPage from './pages/RoomsPage'
import RoomPage from './pages/RoomPage'
import { ErrorBanner } from './components/ErrorBanner'
import { ErrorProvider } from './context/ErrorProvider'
import MovieDetailPage from './pages/MovieDetailPage'
import { SlowConnectionProvider } from './context/SlowConnectionProvider'
import { SlowConnectionBanner } from './components/SlowConnectionBanner'
import TrendingPage from './pages/TrendingPage'

function App() {
  return (
    <ErrorProvider>
      <SlowConnectionProvider>
        <AuthProvider>
          <BrowserRouter>
            <ErrorBanner />
            <SlowConnectionBanner />
            <Routes>
              <Route
                path="/"
                element={
                  <PublicRoute>
                    <LandingPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <RegisterPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/discover"
                element={
                  <ProtectedRoute>
                    <DiscoverPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/trending"
                element={
                  <ProtectedRoute>
                    <TrendingPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-movies"
                element={
                  <ProtectedRoute>
                    <MyMoviesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/rooms"
                element={
                  <ProtectedRoute>
                    <RoomsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/movies/:tmdb_id"
                element={
                  <ProtectedRoute>
                    <MovieDetailPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/rooms/:room_id"
                element={
                  <ProtectedRoute>
                    <RoomPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </SlowConnectionProvider>
    </ErrorProvider>
  )
}

export default App
