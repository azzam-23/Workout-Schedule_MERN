import { useRef, useState } from "react";
import "../style/register.css";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [error, setErorr] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const { login } = useAuth();
  const onsubmit = async () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!name || !email || !password) {
      setErorr("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErorr(data.message || "Registration failed");
        return;
      }

      console.log(data);

      login(data.name, data.token);

      navigate("/login", {
        state: {
          message: "Registration successful 🎉 Please log in",
        },
      });
    } catch (err) {
      console.log(err);
      setErorr("Server error");
    }
  };
  return (
    <div>
      <div className="register-form">
        <h1 className=".page-title">Register New account</h1>

        <div className="input-form">
          <input
            ref={nameRef}
            className="input-section"
            type="text"
            placeholder=" Name"
          />
          <input
            ref={emailRef}
            className="input-section"
            type="text"
            placeholder=" Email"
          />
          <input
            ref={passwordRef}
            type="password"
            className="input-section"
            placeholder=" password"
          />
          <button onClick={onsubmit} className="register-button">
            Register
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
