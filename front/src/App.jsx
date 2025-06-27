import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignPage from "./pages/SignPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DashboardPage from "./pages/DashboardPage";
import { AuthProvider } from "./context/AuthContext";

function App() {

  return (
    <>
  <BrowserRouter>
  <AuthProvider>
        <Header/>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signin" element={<SignPage/>}/>
      <Route path="/dashboard/:id" element={<DashboardPage/>}/>


      <Route path="/courses" element={<CoursesPage/>} />
          <Route path="/courses/:id" element={<CourseDetailPage/>} />
          <Route path="/add-course" element={<AddCoursePage/>} />
    </Routes>
      <Footer/>

    </AuthProvider>
  </BrowserRouter>
    </>
  )
}

export default App
