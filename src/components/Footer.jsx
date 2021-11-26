import React from "react";

import logo from "../assets/images/shared/desktop/logo.svg";
import iconFacebook from "../assets/images/shared/desktop/icon-facebook.svg";
import iconTwitter from "../assets/images/shared/desktop/icon-twitter.svg";
import iconInstagram from "../assets/images/shared/desktop/icon-instagram.svg";

export const Footer = () => {
  return (
    <footer>
      <div className="container grid-12 text-grey">
        <nav>
          <img src={logo} alt="" className="logo" />
          <div className="nav-links text-light">
            <a href="#" className="link link-primary">
              Home
            </a>
            <a href="#" className="link link-primary">
              Headphones
            </a>
            <a href="#" className="link link-primary">
              Speakers
            </a>
            <a href="#" className="link link-primary">
              Earphones
            </a>
          </div>
        </nav>
        <p className="about">
          Audiophile is an all in one stop to fulfill your audio needs. We're a
          small team of music lovers and sound specialists who are devoted to
          helping you get the most out of personal audio. Come and visit our
          demo facility - we’re open 7 days a week.
        </p>
        <div className="social">
          <a href="#" className="social-button">
            <img src={iconFacebook} alt="" />
          </a>
          <a href="#" className="social-button">
            <img src={iconTwitter} alt="" />
          </a>
          <a href="#" className="social-button">
            <img src={iconInstagram} alt="" />
          </a>
        </div>
        <div className="copyright">Built with React by Nithi</div>
      </div>
    </footer>
  );
};

export default Footer;
