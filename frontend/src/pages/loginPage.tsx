import { useRef, useState } from "react";
import "../style/login.css";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
const LoginPage = () => {
  
  const [error, setErorr] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message || "";
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const onsubmit = async () => {
    setLoading(true);

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setErorr("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErorr(data.message || "Invalid email or password");
        return;
      }

      const token = data.token || data;

      login(data.name, token);

      navigate("/");
    } catch (err) {
      console.log(err);
      setErorr("Server error");
    }
  };
  return (
    <div className="login-form">
      <div className="input-form">
        {successMessage && <p className="success-message">{successMessage}</p>}
        <h1>Login</h1>

        <input
          ref={emailRef}
          className="input-section"
          type="text"
          placeholder="Email"
        />

        <input
          ref={passwordRef}
          className="input-section"
          type="password"
          placeholder="Password"
        />

        <button onClick={onsubmit} className="login-button">
          Login
        </button>
        {loading && <p className="loading-message">Loading in...</p>}

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
