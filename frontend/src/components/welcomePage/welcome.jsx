import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "../../styles/welcome.css";
import logo from "../../assets/img/logo.png";
import bgvi from "../../assets/img/bgvi.mp4";
import twitter from "../../assets/img/twitter.png";
import telegram from "../../assets/img/telegram.png";
import iconlogin from "../../assets/img/login.svg";
import Footer from "../productListPage/footer";

export default function Welcome() {
  const [navOpen, setNavOpen] = useState(false); // New state for navigation menu

  return (
    <>
      <div className="hero">
        <video autoPlay loop muted playsInline className="back-video">
          <source src={bgvi} type="video/mp4" />
        </video>
        <nav className="navbarr">
          <a href="/">
            <img className="logo" src={logo} />
            <span style={{ fontSize: "20px", color: "white" }}>VR Store</span>
          </a>

          {/* Button for opening and closing the navigation menu on mobile */}
          <FontAwesomeIcon
            icon={faBars}
            fade
            size="xl"
            className="nav-toggle"
            onClick={() => setNavOpen(!navOpen)}
            style={{ color: "#f55142" }}
          />

          {/* Navigation links, with 'open' class added when the navigation menu is open */}
          <ul className={`links ${navOpen ? "open" : ""}`}>
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
            <li>
              <a style={{ marginRight: "15px" }} href="/login">
                <img src={iconlogin} style={{ width: "18px" }} />
                Login
              </a>
              <a href="/register">
                <img src={iconlogin} style={{ width: "18px" }} />
                Register
              </a>
            </li>
          </ul>
        </nav>
        <div className="content">
          <h1>Welcome to VR world store</h1>
          <a href="/products">Explore our products &#x27F6;</a>
        </div>
        <div className="social-icons">
          <a href="https://twitter.com/yassinedorgaa" target="_blank">
            <img src={twitter} />
          </a>
          <a href="https://t.me/YassineDG" target="_blank">
            <img src={telegram} />
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
