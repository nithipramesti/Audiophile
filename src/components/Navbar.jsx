import React, { useState } from "react";
import { Link } from "react-router-dom";

import database from "../database/data.json";

export const Navbar = () => {
  const cartProductsData = database.filter((val) => {
    return val.category === "headphones";
  });

  const [cartDisplayed, setCartDisplayed] = useState(false);
  const [productQty, setProductQty] = useState(1);

  const renderCartProducts = () => {
    return cartProductsData.map((val) => {
      return (
        <div className="cart-product-card">
          <img src={`${process.env.PUBLIC_URL}` + val.image.desktop} alt="" />
          <div className="text-container">
            <div className="flex">
              <div className="flex-left">
                <p className="product-title">{val.name}</p>
                <p className="product-price">${val.price}</p>
              </div>
              <div className="product-qty">
                <span>-</span>
                <p>{productQty}</p>
                <span>+</span>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="navbar">
      <nav>
        <a href="/">
          <img
            src={`${process.env.PUBLIC_URL}/images/shared/desktop/logo.svg`}
            alt=""
            className="logo"
          />
        </a>
        <div className="nav-links">
          <a href="/" className="link link-primary">
            Home
          </a>
          <a href="/categories/headphones" className="link link-primary">
            Headphones
          </a>
          <a href="/categories/speakers" className="link link-primary">
            Speakers
          </a>
          <a href="/categories/earphones" className="link link-primary">
            Earphones
          </a>
        </div>

        <div className="cart-container">
          <a
            onClick={
              cartDisplayed
                ? () => setCartDisplayed(false)
                : () => setCartDisplayed(true)
            }
            className="nav-cart"
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/shared/desktop/icon-cart.svg`}
              alt=""
            />
          </a>
          <div className={`cart ${!cartDisplayed && "hidden"}`}>
            <header>
              <h5>CART(3)</h5>
              <a href="#" className="text-dark-faded">
                Remove All
              </a>
            </header>
            <div className="products-container">{renderCartProducts()}</div>
            <div className="total">
              <p className="total-title text-dark-faded">Total</p>
              <p className="total-amount">$5396</p>
            </div>
            <a href="#" className="btn btn-primary">
              Checkout
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
