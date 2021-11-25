import React from "react";

import logo from "../assets/images/shared/desktop/logo.svg";
import iconCart from "../assets/images/shared/desktop/icon-cart.svg";

export const Header = () => {
  return (
    <header>
      <img src={logo} alt="" className="logo" />
      <nav>
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
      </nav>
      <img src={iconCart} alt="" className="nav-cart" />
    </header>
  );
};

export default Header;
