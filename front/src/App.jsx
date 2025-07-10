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
import AddCourse from "./pages/AddCourse";
import CourseList from "./components/CourseList";
import AdminPage from "./pages/AdminPage";

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

      <Route path="/course" element={<AddCourse/>}/>
      <Route path="/getCourses" element={<CourseList/>}/>
       <Route path="/admin" element={<AdminPage/>}/>

    </Routes>
      <Footer/>

    </AuthProvider>
  </BrowserRouter>
    </>
  )
}

export default App
