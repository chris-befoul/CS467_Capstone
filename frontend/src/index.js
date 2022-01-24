import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import Signup from './Signup';
import UserSignup from './UserSignup';
import reportWebVitals from './reportWebVitals';

import CreatePetFormPage from "./createPet";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/pets/createPetProfile" element={<CreatePetFormPage />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/usersignup" element={<UserSignup />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
