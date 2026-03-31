import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import DiscoverPage from "./pages/DiscoverPage"
import { AuthProvider } from "./context/AuthProvider"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { PublicRoute } from "./components/PublicRoute"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/discover" element={<ProtectedRoute><DiscoverPage /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App