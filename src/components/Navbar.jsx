import React from "react";

import logo from "../assets/images/shared/desktop/logo.svg";
import iconCart from "../assets/images/shared/desktop/icon-cart.svg";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="" className="logo" />
      <div className="nav-links">
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
      <img src={iconCart} alt="" className="nav-cart" />
    </nav>
  );
};

export default Navbar;
