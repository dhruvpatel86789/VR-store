import React, { useContext } from "react";
import { DarkModeContext } from "../../context";
import Header from "../productListPage/header";
import Footer from "../productListPage/footer";
import "../../styles/WhyChooseUs.css";
import aboutPIC from "../../assets/img/aboutus.jpeg";
import pic from "../../assets/img/aboutus2.jpeg";


export default function WhyChooseUs() {
  const [darkMode] = useContext(DarkModeContext);
  return (
    <>
      <Header />
      <section className="about-us" style={{ backgroundColor: darkMode ? "#000" : "#fff" }}>
        <div className="row">
          <h1 style={{ color: darkMode ? "#fff" : "#000" }}>Why Choose VR World Store?</h1>
          <div className="about-col">
            <h2>1. Exclusive Range of VR Equipment</h2>
            <p style={{ color: darkMode ? "#fff" : "#000" }}>
              At VR World Store, we offer an exclusive range of virtual reality
              equipment to suit every VR enthusiast's needs, be it gaming,
              educational, or corporate applications.
            </p>
            <h2>2. Quality Assured</h2>
            <p style={{ color: darkMode ? "#fff" : "#000" }}>
              Every product in our store has undergone rigorous quality control
              checks to ensure you get nothing but the best. Our team is
              dedicated to providing high-quality, durable VR equipment that
              will stand the test of time.
            </p>
            <h2>3. Competitive Pricing</h2>
            <p style={{ color: darkMode ? "#fff" : "#000" }}>
              We believe in making the immersive VR experience accessible to
              everyone. Therefore, we ensure our products are priced
              competitively without compromising on quality.
            </p>
            <h2>4. Expert Guidance</h2>
            <p style={{ color: darkMode ? "#fff" : "#000" }}>
              Our team comprises VR enthusiasts who can guide you to choose the
              right VR equipment based on your needs. We are here to make your
              VR shopping experience smooth and easy.
            </p>
            <h2>5. Stellar Customer Service</h2>
            <p style={{ color: darkMode ? "#fff" : "#000" }}>
              Customer satisfaction is our top priority. We promise a seamless
              shopping experience with easy returns and prompt customer service
              to answer any queries or issues.
            </p>
            <br />
          </div>
          <div className="about-col">
            <img src={aboutPIC} />
            <img src={pic} />
          </div>
        </div>
        <div className="welcomeToHere">
              <p>
                Join us in the journey of exploring the limitless possibilities
                of virtual reality. Choose VR World Store for all your VR needs.
              </p>
              <a href="/products">EXPLORE NOW</a>
            </div>
      </section>
      <Footer />
    </>
  );
}
