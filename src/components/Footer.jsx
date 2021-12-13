import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer>
      <div className="container grid-12 text-grey">
        <nav>
          <Link to="/">
            <img
              src={`${process.env.PUBLIC_URL}/images/shared/desktop/logo.svg`}
              alt=""
              className="logo"
            />
          </Link>
          <div className="nav-links text-light">
            <Link to="/" className="link link-primary">
              Home
            </Link>
            <Link to="/categories/headphones" className="link link-primary">
              Headphones
            </Link>
            <Link to="/categories/speakers" className="link link-primary">
              Speakers
            </Link>
            <Link to="/categories/earphones" className="link link-primary">
              Earphones
            </Link>
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
            <img
              src={`${process.env.PUBLIC_URL}/images/shared/desktop/icon-facebook.svg`}
              alt=""
            />
          </a>
          <a href="#" className="social-button">
            <img
              src={`${process.env.PUBLIC_URL}/images/shared/desktop/icon-twitter.svg`}
              alt=""
            />
          </a>
          <a href="#" className="social-button">
            <img
              src={`${process.env.PUBLIC_URL}/images/shared/desktop/icon-instagram.svg`}
              alt=""
            />
          </a>
        </div>
        <div className="copyright">Built with React by Nithi</div>
      </div>
    </footer>
  );
};

export default Footer;
