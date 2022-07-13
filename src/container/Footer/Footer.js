import React, { useState } from "react";
import { client } from "../../client";
import { images } from "../../constants";
import { AppWrap, MotionWrap } from "../../Wrapper";
import { ToastContainer, toast } from "react-toastify";
import "./Footer.scss";
const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const errorToast = (error) => {
    return toast.error(error, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleSubmit = () => {
    let regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    console.log(regex.test(formData.email));
    if (formData.name === "") {
      errorToast("Oops! You missed your name😅");
    } else if (formData.email === "") {
      errorToast("Oops! You missed your email😅");
    } else if (!regex.test(formData.email)) {
      errorToast("Fill in a valid email address🙂");
    } else if (formData.message === "") {
      errorToast("Oops! You missed the message itself😅");
    } else {
      const contact = {
        _type: "contact",
        name: name,
        email: email,
        message: message,
      };
      toast.promise(
        client.create(contact).then(() => {
          setFormData({
            name: "",
            email: "",
            message: "",
          });
        }),
        {
          pending: "Sending your message...",
          success: "Thank you for getting in touch!😊",
          error: "Something went wrong 😯",
        }
      );
    }
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
          Send a message
        </button>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        theme="colored"
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__whitebg"
);
