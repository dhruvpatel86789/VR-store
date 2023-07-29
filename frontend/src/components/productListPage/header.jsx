import React from "react";
import { useState, useContext } from "react";
import { UilShoppingCart } from "@iconscout/react-unicons";
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../../assets/img/logo.png";
import "../../styles/header.css";
import iconlogin from "../../assets/img/login.svg";
import bgimg from "../../assets/img/AdobeStock_321047153.jpeg";
import sun from "../../assets/img/sun.png";
import moon from "../../assets/img/moon.png";
import { DarkModeContext } from "../../context";
import CardGroup from "react-bootstrap/CardGroup";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ShoppingCart from "./shoppingCart";
import { clearCart } from "../../store/features/productSlice";

export default function Header() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [darkMode, setDarkMode] = useContext(DarkModeContext);

  const navigate = useNavigate();
  const isUserLoggedIn = !!Cookies.get("token");

  const logout = () => {
    // Remove the cookies
    Cookies.remove("token");
    Cookies.remove("isAdmin");

    // Redirect to login page
    navigate("/login");
  };

  // Get the cart state from redux
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Calculate the total quantity of items in the cart
  const totalQuantity = cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate the total cost of items in the cart
  const totalCost = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <header>
      <img className="bgh" src={bgimg} />
      <nav className="nav-h">
      <Navbar.Brand> <a href="/"> <img className="logo" src={logo} /></a><span style={{fontSize: '20px', color: 'white'}}>VR Store</span></Navbar.Brand>
        <ul className="primary-navigation">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/why-choose-us">Why Choose Us?</a>
          </li>
          <li>
            <a href="/contact-us">Contact US</a>
          </li>
          {/* <li>
            <a style={{ marginRight: "15px" }} href="/login">
              <img src={iconlogin} style={{ width: "18px" }} />
              Login
            </a>
            <a href="/register">
              <img src={iconlogin} style={{ width: "18px" }} />
              register
            </a>
          </li> */}
          <li>
            {isUserLoggedIn ? (
              <a href="#login" onClick={logout}>
                <img src={iconlogin} style={{ width: "18px" }} />
                Log out
              </a>
            ) : (
              <a href="/login" onClick={() => navigate("/login")}>
                <img src={iconlogin} style={{ width: "18px" }} />
                Log in
              </a>
            )}
          </li>
          <li>
            <a href="#">
              <UilShoppingCart onClick={handleShow} />
            </a>
            <span className="count">{totalQuantity}</span>
          </li>
          <li>
            <div onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? (
                <img src={moon} className="darkicon" />
              ) : (
                <img src={sun} className="darkicon" />
              )}
            </div>
          </li>
        </ul>
      </nav>
      <Offcanvas show={show} onHide={handleClose} placement={"end"}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>SHOPPING CART</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <CardGroup>
            <ShoppingCart />
          </CardGroup>
          <CardGroup className="total">
            <div className="clear">
              <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
            </div>
            <div className="subtotal">Subtotal :</div>
            <div className="ttc">
              <strong>{totalCost} $</strong>
            </div>
          </CardGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
}
