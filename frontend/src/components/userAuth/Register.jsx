import React, { useState, useContext } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from "../../context";
import { toast } from "react-toastify";
import Header from "../productListPage/header";
import Footer from "../productListPage/footer";

export default function Register() {
  const [darkMode] = useContext(DarkModeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        email,
        password
      });
      
      // Save the token to local storage
      localStorage.setItem('token', response.data.token);
      
      // Redirect user to the product list page
      navigate('/login');
      toast.success("Registration successful!", {
        position: toast.POSITION.TOP_CENTER
      });
    } catch (error) {
      toast.error("Registration failed. Please check your details and try again.", {
        position: toast.POSITION.TOP_CENTER
      });
      console.error(error);
    }
  };

  return (
    <div style={{backgroundColor: darkMode ? "#000" : "#fff"}}>
      <Header />
      <div className="main">
        <p className="sign" align="center">
          Register
        </p>
        <form className="form1" onSubmit={registerUser}>
          <input className="un " type="text" align="center" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input
            className="pass"
            type="password"
            align="center"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="submitLog" type="submit" align="center">
            Register
          </button>
        </form>
        <div className="d-flex justify-content-center pt-3">
          <a href="/login">Click here to sign in</a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
