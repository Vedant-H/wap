import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>} />
    </Routes>
  </BrowserRouter>
    </>
  )
}

export default App
