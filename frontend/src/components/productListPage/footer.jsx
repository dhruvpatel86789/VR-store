import React from "react";
import "../../styles/footer.css";
import logo from "../../assets/img/logo.png";

export default function Footer() {
  return (
    <div className="footer">
      
      <h4>About Us</h4>
      <p>
        VR World Store is the go-to destination for
        <a
          href="/products"
          style={{ textDecoration: "underline", color: "#be4d25",fontWeight: "bold" }}
        >
          high-quality virtual reality equipment and accessories.
        </a>
        <br />
        We aim to provide an immersive, futuristic experience to our customers
        with our range of products.
        <br />
        Contact us at 
        <a
          href="mailto:Yassindorgaa@gmail.com"
          style={{ textDecoration: "underline", color: "#be4d25",fontWeight: "bold" }}
        >
           info@vrworldstore.com
        </a>
        for any queries or call us at
        <a
          href="tel:+21653676549"
          style={{ textDecoration: "underline", color: "#be4d25",fontWeight: "bold" }}
        >
          +21653676549
        </a>
        .
        <br />
        You can also visit our store at 123 VR Lane, Tech City, Tunisie.
      </p>
      <a href="/"><img src={logo} /></a>
      <p>
        "© 2023 VR World Store. All rights reserved. | Website designed and
        developed by Yassine Dorgâa."
      </p>
    </div>
  );
}
