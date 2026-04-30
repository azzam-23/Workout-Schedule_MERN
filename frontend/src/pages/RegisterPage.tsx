import {  useRef, useState } from "react";
import "../style/register.css"
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";

const RegisterPage = () => {
   const [error,setErorr] = useState("");
const nameRef = useRef<HTMLInputElement>(null);
const emailRef = useRef<HTMLInputElement>(null);
const passwordRef = useRef<HTMLInputElement>(null);

const {login} = useAuth();

const onsubmit = async() => {
  const name = nameRef.current?.value;
  const email = emailRef.current?.value;
  const password = passwordRef.current?.value;

  if(!name || !email || !password){
    return;
  }
  console.log(name,email,password);

  

const response = await fetch(`${BASE_URL}/user/register`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name, email, password }),
})

if(!response.ok)
{  setErorr("Failed to register. Please try again.");

}
const token = await response.json();
if(!token){
  setErorr("incorrect token.");
  return
}
login(email, token);

}
return (
  <div>
    
    <div className="register-form" >
    <h1>Register New Account</h1>
    <div className="input-form" >
      <input ref={nameRef} className="input-section" type="text" placeholder=" Name"/>
      <input ref={emailRef} className="input-section" type="text" placeholder=" Email"/>
      <input ref={passwordRef} type="password" className="input-section"  placeholder=" password"/>
      <button onClick={onsubmit} className="register-button">Register</button>
      {error && <p className="error-message">{error}</p>}
    </div>
    </div>
    
  </div>
)
}

export default RegisterPage;