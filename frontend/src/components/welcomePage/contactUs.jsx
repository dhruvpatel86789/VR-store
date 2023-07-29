import React, { useContext } from "react";
import { DarkModeContext } from "../../context";
import emailjs from "emailjs-com";
import { toast, ToastContainer } from 'react-toastify';
import "../../styles/contactUs.css";
import Header from "../productListPage/header";
import Footer from "../productListPage/footer";

export default function ContactUs() {
  const [darkMode] = useContext(DarkModeContext);

  function sendEmail(e) {
    e.preventDefault();

    const serviceID = "service_0ltgc0o";
    const templateID = "template_14xsvn4";
    const userID = "5fS7OqpNSMR6Jqt2a";

    let templateParams = {
      to_name: "Yassine Dorgâa",
      from_name: e.target.elements.name.value,
      from_email: e.target.elements.email.value,
      message: e.target.elements.message.value,
    };

    emailjs.send(serviceID, templateID, templateParams, userID).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        toast.success("Your message has been sent successfully");
        e.target.reset();
      },
      (error) => {
        console.log("FAILED...", error);
        toast.error("Failed to send message. Please try again later");
      }
    );
  }
  return (
    <>
      <Header />
      <div style={{ backgroundColor: darkMode ? "#000" : "#fff" }}>
        <div className="contact-title">
          <h1>Contact Us</h1>
          <h2>We are always ready to serve you!</h2>
        </div>
        <div className="contact-form">
          <form onSubmit={sendEmail}>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Your name"
              required
            />
            <br />
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Your Email"
              required
            />
            <br />
            <textarea
              name="message"
              className="form-control"
              rows="4"
              placeholder="Your Message"
              required
            ></textarea>
            <br />
            <input
              type="submit"
              className="form-control submit"
              value="send message"
            />
          </form>
          <script src="https://smtpjs.com/v3/smtp.js"></script>
        </div>
      </div>

      <Footer />
    </>
  );
}
