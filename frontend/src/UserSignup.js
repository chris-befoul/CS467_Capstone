import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
import "./UserSignup.css";

const UserSignup = () => {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip_code, setZip_code] = useState("");
  const [email_preference, setEmail_preference] = useState(false);
  const [navigate, setNavigate] = useState(false);

  const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch('http://localhost:8080/api/register', {
          method: 'POST',
          headers: {'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'},
          body: JSON.stringify({ 
            first_name,
            last_name,
            email,
            password,
            phone,
            city,
            state,
            zip_code,
            email_preference
          })
      });
      const content = await response.json();
      console.log(content);
      setNavigate(true);
  }
  if (navigate) {
    return <Navigate to="/login"/>
  }

  return (
    <form>
    <div className="form-group">
        <div>
        <label className="form-section-header">User Information</label>
        </div>
        <div className="form-field-group">
        <label>
            First Name:
            <input type="text" required onChange={e => setFirst_name(e.target.value)}></input>
        </label>
        <label>
            Last Name:
            <input type="text" required onChange={e => setLast_name(e.target.value)}></input>
        </label>
        </div>
        <div className="form-field-group">
        <label>
            City/Town:
            <input type="text" required onChange={e => setCity(e.target.value)}></input>
        </label>
        <label>
            Phone Number:
            <input type="phone" required onChange={e => setPhone(e.target.value)}></input>
        </label>
        </div>
        <div className="form-field-group">
        <label>
            Zip Code:
            <input type="text" required onChange={e => setZip_code(e.target.value)}></input>
        </label>
        <label>
            State:
            <input type="text" required onChange={e => setState(e.target.value)}></input>
        </label>
        </div>
    </div>
    <div className="form-group">
        <div>
        <label className="form-section-header">Account Information</label>
        </div>
        <div className="form-field-group">
        <label>
            Email:
            <input type="text" required onChange={e => setEmail(e.target.value)}></input>
        </label>
        </div>
        <div className="form-field-group">
        <label>
            Password:
            <input type="text" required onChange={e => setPassword(e.target.value)}></input>
        </label>
        </div>
    </div>
    <div className="form-group">
        <div>
        <label className="form-section-header">Email Preference</label>
        </div>
        <div className="form-field-group">
        <label>Enable email notifications for newly added profiles: </label>
        <input type="checkbox" required onChange={e => setEmail_preference(e.target.value)}></input>
        </div>
    </div>
    <button onClick={handleSubmit}>Submit</button>
    </form>
  );
};

export default UserSignup;
