import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Signup from './Signup';
import UserSignup from './UserSignup';
import ShelterSignup from './ShelterSignup';
import UserProfile from './UserProfile';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/usersignup" element={<UserSignup />} />
      <Route exact path="/sheltersignup" element={<ShelterSignup />} />
      <Route exact path="/userprofile" element={<UserProfile />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
