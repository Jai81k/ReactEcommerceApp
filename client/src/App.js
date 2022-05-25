import React, { useEffect } from "react";
import {Routes, Route, useNavigate} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {useDispatch} from 'react-redux';

import {auth} from './_firebase';
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Header from "./components/nav/Header";
import RegisterComplete from './pages/auth/RegisterComplete';
import ForgotPassword from './pages/auth/ForgotPassword';


const App = () => {
  // Check the user state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get status from Firebase
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          // Already Logged in
          const idTokenResult = await user.getIdTokenResult();
          //console.log('User: ', user);

          // Dispatch this information to "Redux" userReducer's state.
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              email: user.email,
              token: idTokenResult.token
            }
          });

          // Redirect to Home Page
          navigate('/');
        } else {
          // Redirect to Login Page
          navigate('/login');
        }
    });

  }, []);

  return (  
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/register/complete" element={<RegisterComplete/>} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}
  
export default App;
