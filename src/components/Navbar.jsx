import React from "react";

import logo from "../assets/images/shared/desktop/logo.svg";
import iconCart from "../assets/images/shared/desktop/icon-cart.svg";

export const Navbar = () => {
  return (
    <div className="navbar">
      <nav>
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
        <a href="#" className="nav-cart">
          <img src={iconCart} alt="" />
        </a>
      </nav>

      <div className="cart-container">
        <div className="cart">XXY12345</div>
      </div>
    </div>
  );
};

export default Navbar;
