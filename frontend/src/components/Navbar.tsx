import { useState,useEffect, useRef } from "react";
import "../style/navbar.css";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
const {username, isAuthenticated, logout} = useAuth();

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement |null>(null);
 const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (e : MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
 

  const handelLogin = () => {
    navigate("/login");
  };
  const handelLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <h1>🏋️ Workout Tracker</h1>

      <div className="profile" ref={menuRef}>
        {isAuthenticated ? <>
        <img
          src="https://th.bing.com/th/id/OIP.XQ-com-ULw7aaf_U3BcQ3AAAAA?w=164&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          alt="profile"
          className="profile-img"
          onClick={() => setOpen(prev => !prev)}
        />
        <span className="tooltip">Profile</span>
        {open && (
          <div className="dropdown-menu">
            <h3>{username}</h3>
            <button className="sign-out-button" onClick={handelLogout}>
              Sign out
            </button>
          </div>
        )}
        </> :<button className="navbar-login-button" onClick={handelLogin}>Login</button>}
        
      </div>
    </header>
  );
};
export default Navbar;