import React from "react";
   import ReactDOM from "react-dom";
   import { BrowserRouter, Route, Routes } from "react-router-dom";

   import CreatePetFormPage from "./createPet";

    const rootElement = document.getElementById("root");
    ReactDOM.render(
      <BrowserRouter>
        <Routes>
          <Route path="/pets/createPetProfile" element={<CreatePetFormPage />} />
        </Routes>
      </BrowserRouter>,
      rootElement
    );