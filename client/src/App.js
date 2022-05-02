import React from "react";
import {Routes, Route} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Header from "./components/nav/Header";
import RegisterComplete from './pages/auth/RegisterComplete';


const App = () => {
  return (  
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/register/complete" element={<RegisterComplete/>} />
      </Routes>
    </>
  );
}
  
export default App;