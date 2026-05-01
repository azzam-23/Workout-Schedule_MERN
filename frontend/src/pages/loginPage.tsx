import {  useRef, useState } from "react";
import "../style/login.css"
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
   const [error,setErorr] = useState("");
const emailRef = useRef<HTMLInputElement>(null);
const passwordRef = useRef<HTMLInputElement>(null);
const navigate = useNavigate();

const {login} = useAuth();

const onsubmit = async() => {

  const email = emailRef.current?.value;
  const password = passwordRef.current?.value;

  if( !email || !password){
    return;
  }
  console.log(email,password);

  

const response = await fetch(`${BASE_URL}/user/login`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email, password }),
})

if(!response.ok)
{  setErorr("Failed to login. Please try again.");

}
const token = await response.json();
if(!token){
  setErorr("incorrect token.");
  return
}
login(email, token);
navigate("/");

}
return (
  <div>
    
    <div className="login-form" >
    <h1>Login</h1>
    <div className="input-form" >
      <input ref={emailRef} className="input-section" type="text" placeholder=" Email"/>
      <input ref={passwordRef} type="password" className="input-section"  placeholder=" password"/>
      <button onClick={onsubmit} className="login-button">Login</button>
      {error && <p className="error-message">{error}</p>}
    </div>
    </div>
    
  </div>
)
}

export default LoginPage;