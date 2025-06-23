import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignPage from "./pages/SignPage";
import Header from "./components/Header";

function App() {

  return (
    <>
    <Header/>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signin" element={<SignPage/>}/>
    </Routes>
  </BrowserRouter>
    </>
  )
}

export default App
