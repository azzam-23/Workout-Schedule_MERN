import { BrowserRouter, Route, Routes } from "react-router"
import HomePage from "./pages/home"
import LoginPage from "./pages/login"
import Navbar from "./components/Navbar"
import RegisterPage from "./pages/RegisterPage"
import AuthProvider from "./context/Auth/AuthProvider"

function App() {
 

  return (
    <AuthProvider>
    <Navbar/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
