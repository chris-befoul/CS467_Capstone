import React from "react";
   import ReactDOM from "react-dom";
   import { BrowserRouter, Route, Routes } from "react-router-dom";

   import CreatePetFormPage from "./createPet";

    const rootElement = document.getElementById("root");
    ReactDOM.render(
      <BrowserRouter>
        <Routes>
          <Route path="/createPetProfile" component={CreatePetFormPage} />
        </Routes>
      </BrowserRouter>,
      rootElement
    );