import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
import "./Login.css";
import Button from "./components/Button";
import { Link } from "react-router-dom";

const Admin = (props) => {

  const setName = props.setName;
  const setType = props.setType;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [navigate, setNavigate] = useState(false);
  const fetchURL = 'http://localhost:8080';
  // const fetchURL = 'https://cs467-sandbox.ue.r.appspot.com';
  // const fetchURL = 'https://capstone-animal-adoption-app.wl.r.appspot.com';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(fetchURL + '/api/login', {
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
    if (content.message === 'User not found!') {
      alert('User not found!');
      return;
    }
    if (content.message === 'Invalid password!'){
      alert('Invalid password!')
      return;
    }
    if(content.user.type === 'Admin') {
      setNavigate(true);
    }
    else {
      (content.user.first_name === undefined) ? alert("Unauthorized, sorry " + content.user.shelter_name + " you are not an Admin.") : alert("Unauthorized, sorry " + content.user.first_name + ' ' + content.user.last_name + " you are not an Admin.")
      await fetch(fetchURL + '/api/logout', {method: 'POST', credentials: 'include'}).then(res => res.json());
      return;
    }
    setType(content.user.type);
    setName(content.user.first_name + ' ' + content.user.last_name);
  }

  if (navigate) {
    return <Navigate to="/adminView" />
  }

  return (
    <div className="App">
      <form className='form'>
        <div className='user'>
            <label>Admin: 
            <input className='user-label' type='text' required onChange={e => setEmail(e.target.value)}></input></label>
        </div>
        <div className='password'>
            <label>Password: 
            <input className='password-label' type='password' required onChange={e => setPassword(e.target.value)}></input></label>
        </div>
      <button onClick={handleSubmit}>Submit</button>
    </form>
    </div>
  );
};

export default Admin;