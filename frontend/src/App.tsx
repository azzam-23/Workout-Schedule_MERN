import { BrowserRouter, Route, Routes } from "react-router"
import HomePage from "./pages/home"
import LoginPage from "./pages/login"
import Navbar from "./components/Navbar"

function App() {
 

  return (
    <>
    <Navbar/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
