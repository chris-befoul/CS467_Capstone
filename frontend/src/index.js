import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Signup from './Signup';
import UserSignup from './UserSignup';
import Login from './Login';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/usersignup" element={<UserSignup />} />
      <Route exact path="/login" element={<Login />}/>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
