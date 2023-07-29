import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { DarkModeContext } from "../../context";
import { toast } from "react-toastify";
import Header from "../productListPage/header";
import Footer from "../productListPage/footer";
import "../../styles/login.css";
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/features/authSlice';

export default function Login() {
  const [darkMode] = useContext(DarkModeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // useNavigate is a hook from react-router-dom for programmatic navigation
  const navigate = useNavigate();
  
  // useDispatch is a hook from react-redux for dispatching actions
  const dispatch = useDispatch();

  // This useEffect checks if there is a token in Cookies and navigates the user based on their role
  useEffect(() => {
    const token = Cookies.get("token");
    const isAdmin = Cookies.get("isAdmin") === "true"; // Cookies are stored as strings

    // If token exists, navigate based on the user role
    if (token) {
      if (isAdmin) {
        navigate("/dashboard");
      } else {
        navigate("/products");
      }
    }
  }, [navigate]);

  // loginUser is an async function that sends a POST request to the login API
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      // Save the token and isAdmin flag to cookies
      Cookies.set("token", response.data.token, { expires: 30 });
      Cookies.set("isAdmin", response.data.isAdmin, { expires: 30 });

      // Dispatch the setToken action to update the Redux state
      dispatch(setToken({ token: response.data.token, isAdmin: response.data.isAdmin }));

      // Redirect user to the different pages based on the isAdmin flag
      if (response.data.isAdmin) {
        navigate("/dashboard");
      } else {
        navigate("/products");
      }
      toast.success("Successfully logged in!", {
        position: toast.POSITION.TOP_CENTER
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to log in. Please check your email or password.", {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };

  return (
    <div style={{ backgroundColor: darkMode ? "#000" : "#fff" }}>
      <Header />
      <div className="main">
        <p className="sign" align="center">
          Login
        </p>
        <form className="form1" onSubmit={loginUser}>
          <input
            className="un "
            type="email"
            align="center"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="pass"
            type="password"
            align="center"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="submitLog" type="submit" align="center">
            Login
          </button>
        </form>
        <div className="d-flex justify-content-center pt-3">
          <a href="/register">Click here to sign up</a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
