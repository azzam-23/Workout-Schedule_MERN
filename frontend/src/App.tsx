import { BrowserRouter, Route, Routes } from "react-router"
import HomePage from "./pages/home"
import LoginPage from "./pages/loginPage"
import Navbar from "./components/Navbar"
import RegisterPage from "./pages/RegisterPage"
import AuthProvider from "./context/Auth/AuthProvider"
import ProtectedRoute from "./components/ProtectedRoute"
import ScheduleProvider from "./context/WorkoutSecudule/SchduleProvider"

function App() {
 

  return (
    <AuthProvider>
      <ScheduleProvider>
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
      </ScheduleProvider>
    </AuthProvider>
  );
}

export default App
