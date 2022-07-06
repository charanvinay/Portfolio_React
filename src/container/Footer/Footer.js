import React, { useState } from "react";
import { client } from "../../client";
import { images } from "../../constants";
import { AppWrap, MotionWrap } from "../../Wrapper";
import "./Footer.scss";
const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setIsLoading(true);
    const contact = {
      _type: "contact",
      name: name,
      email: email,
      message: message,
    };

    client.create(contact).then(() => {
      setIsLoading(false);
      setIsFormSubmitted(true);
    });
  };

  return (
    <>
      <h2 className="head-text">Take A Coffee & Chat With Me</h2>
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:charanvinaynarni@gmail.com" className="p-text">
            charanvinaynarni@gmail.com
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="mobile" />
          <a href="tel:+918317566250" className="p-text">
            +91 831-756-6250
          </a>
        </div>
      </div>
      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input
              className="p-text"
              type="text"
              name="name"
              placeholder="Your Name"
              value={name}
              onChange={handleChangeInput}
            />
          </div>
          <div className="app__flex">
            <input
              className="p-text"
              type="email"
              name="email"
              placeholder="Your Email"
              value={email}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="Your Message"
              value={message}
              name="message"
              onChange={handleChangeInput}
            />
          </div>
          <button className="p-text" type="button" onClick={handleSubmit}>
            {isLoading ? "Sending" : "Send Message"}
          </button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">Thank you for getting in touch!</h3>
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__whitebg"
);
