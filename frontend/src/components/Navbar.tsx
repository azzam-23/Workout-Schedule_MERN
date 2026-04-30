import { useState,useEffect, useRef } from "react";
import "../style/navbar.css";
import { useAuth } from "../context/Auth/AuthContext";


const Navbar = () => {
const {username, token} = useAuth();

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement |null>(null);

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
 
  console.log("from navbar:", username, token);
  return (
    <header className="navbar">
      <h1>🏋️ Workout Tracker</h1>

      <div className="profile" ref={menuRef}>
        <img
          src="https://th.bing.com/th/id/OIP.XQ-com-ULw7aaf_U3BcQ3AAAAA?w=164&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          alt="profile"
          className="profile-img"
          onClick={() => setOpen(prev => !prev)}
        />

        {open && (
          <div className="dropdown">
            <h3>Azzam</h3>
            <button>Sign out</button>
          </div>
        )}
      </div>
    </header>
  );
};
export default Navbar;