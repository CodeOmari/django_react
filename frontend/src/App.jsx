import react from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"

// Clears the access and refresh tokens
function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />
}


// Clear the localStorage of any access tokens
function RegisterAndLogout() {
  localStorage.clear();
  return <Navigate to="/register" />
}


export default function App() {
  return (
    <BrowseRouter>

      <Routes>

        <Route path="/" element={
          <ProtectedRoute>
            < Home />
          </ProtectedRoute>  
        } />
        <Route path="/login" element={ <Login />}/>
        <Route path="/logout" element={ <Logout />}/>
        <Route path="/register" element={ <RegisterAndLogout />}/>
        <Route path="*" element={ <NotFound />}/>
        
      </Routes>

    </BrowseRouter>
  )
}