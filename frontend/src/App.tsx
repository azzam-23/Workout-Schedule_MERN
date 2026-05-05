import { BrowserRouter, Route, Routes } from "react-router"
import HomePage from "./pages/home"
import LoginPage from "./pages/loginPage"
import Navbar from "./components/Navbar"
import RegisterPage from "./pages/RegisterPage"
import AuthProvider from "./context/Auth/AuthProvider"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
 

  return (
    <AuthProvider>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route element={<ProtectedRoute/>}>
          <Route path="/" element={<HomePage/>}/>
        </Route>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
       <Route path="/login" element={<LoginPage/>}/>
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
