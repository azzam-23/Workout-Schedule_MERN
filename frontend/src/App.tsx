import { BrowserRouter, Route, Routes } from "react-router"
import HomePage from "./pages/home"
import LoginPage from "./pages/login"
import Navbar from "./components/Navbar"
import RegisterPage from "./pages/RegisterPage"

function App() {
 

  return (
    <>
    <Navbar/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
