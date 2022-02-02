import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
import "./Login.css";
import Button from "./components/Button";
import { Link } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [navigate, setNavigate] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'},
      credentials: 'include',
      body: JSON.stringify({ 
        email,
        password,
      })
    });

    const content = await response.json();
    console.log(content);
    setNavigate(true);
  }

  if (navigate) {
    return <Navigate to="/"/>
  }

  return (
    <div className="App">
      <form className='form'>
        <div className='user'>
            <label>User: 
            <input className='user-label' type='text' required onChange={e => setEmail(e.target.value)}></input></label>
        </div>
        <div className='password'>
            <label>Password: 
            <input className='password-label' type='text' required onChange={e => setPassword(e.target.value)}></input></label>
        </div>
      <button onClick={handleSubmit}>Submit</button>
    </form>
    </div>
  );
};

export default Login;