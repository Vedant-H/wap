import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import SignPage from "./pages/SignPage";

function App() {

  return (
    <>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/signin" element={<SignPage/>}/>
    </Routes>
  </BrowserRouter>
    </>
  )
}

export default App
