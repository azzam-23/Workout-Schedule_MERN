import { useState, useEffect, useRef } from "react";
import "../style/navbar.css";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import AddExercise from "./AddExercise";

const Navbar = () => {
  const { username, isAuthenticated, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const [addExerciseOpen, setAddExerciseOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleAddDay = () => {
    setAddExerciseOpen(true);
  };

  return (
    <>
      <header className="navbar">
        <h1>🏋️ Workout Tracker</h1>
       
        <div className="navbar-actions">
          {isAuthenticated ? (
            <button className="add-day-button" onClick={handleAddDay}>
              + Add Day
            </button>
            
          ) : (
            <button
              className="navbar-login-button"
              onClick={
                location.pathname === "/register" ? handleLogin : handleRegister
              }
            >
              {location.pathname === "/register" ? "Login" : "Register"}
            </button>
          )}
        </div>

        {isAuthenticated && (
          <div className="profile" ref={menuRef}>
            <img
              className="profile-img"
              src="https://api.dicebear.com/9.x/thumbs/svg?seed=Profile"
              alt="Profile"
              onClick={() => setOpen(!open)}
            />

            {open && (
              <div className="dropdown-menu">
                <h3>{username}</h3>

                <button className="sign-out-button" onClick={handleLogout}>
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}
        
      </header>
      
      <>
       <AddExercise
          isOpen={addExerciseOpen}
          onClose={() => setAddExerciseOpen(false)}
        />
      </>
    
    </>
  );
};

export default Navbar;
