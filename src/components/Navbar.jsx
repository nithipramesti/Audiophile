import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import database from "../database/data.json";

export const Navbar = () => {
  // const cartProductsData = database.filter((val) => {
  //   return val.category === "headphones";
  // });

  const [cartDisplayed, setCartDisplayed] = useState(false);

  //state to save cart data -- for rerender?
  let [cartData, setCartData] = useState([]);

  //get cart data from local storage
  useEffect(() => {
    let cartDataLocalStorage = JSON.parse(
      localStorage.getItem("Audiophile Cart")
    );

    if (cartDataLocalStorage) {
      setCartData(cartDataLocalStorage);
    }
  }, []);

  //function to edit product quantity (to be added to cart)
  const editCartQty = (id_product, operator) => {
    //make temp array for cart data
    let cartDataTemp = cartData;

    //find selected cart item
    let cartItemIndex = cartData.findIndex(
      (el) => el.productData.id === id_product
    );

    //add quantity
    if (operator === "add") {
      if (cartDataTemp[cartItemIndex].cartQty <= 3) {
        cartDataTemp[cartItemIndex].cartQty += 1;
      }
    }

    //subtract quantity
    else if (operator === "subtract") {
      if (cartDataTemp[cartItemIndex].cartQty > 1) {
        cartDataTemp[cartItemIndex].cartQty -= 1;
      }
    }

    //remove cart or qty = 0

    //update cart data in local storage
    localStorage.setItem("Audiophile Cart", JSON.stringify(cartDataTemp));
    setCartData(cartDataTemp); //NOT WORKING
  };

  const totalProductsPrice = () => {
    let total = 0;
    cartData.map((val) => {
      total += val.productData.price * val.cartQty;
    });

    return total;
  };

  //function to format price
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const renderCartProducts = () => {
    if (cartData.length) {
      return cartData.map((val) => {
        return (
          <div className="cart-product-card">
            <img
              src={`${process.env.PUBLIC_URL}` + val.productData.image.desktop}
              alt=""
            />
            <div className="text-container">
              <div className="flex">
                <div className="flex-left">
                  <a
                    href={`/products/${val.productData.id}`}
                    className="product-title"
                  >
                    {val.productData.name}
                  </a>
                  <p className="product-price">${val.productData.price}</p>
                </div>
                <div className="product-qty">
                  <button
                    onClick={() => editCartQty(val.productData.id, "subtract")}
                  >
                    -
                  </button>
                  <p>{val.cartQty}</p>
                  <button
                    onClick={() => editCartQty(val.productData.id, "add")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return (
        <p className="cart-empty-text text-dark-faded">Your cart is empty!</p>
      );
    }
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
            onClick={() => setCartDisplayed(!cartDisplayed)}
            className="nav-cart"
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/shared/desktop/icon-cart.svg`}
              alt=""
            />
          </a>
          <div className={`cart ${!cartDisplayed && "hidden"}`}>
            <header>
              <h5>{`CART(${cartData.length})`}</h5>
              <a href="#" className="text-dark-faded">
                Remove All
              </a>
            </header>
            <div className="products-container">{renderCartProducts()}</div>
            <div className="total">
              <p className="total-title text-dark-faded">Total</p>
              <p className="total-amount">
                {formatter.format(totalProductsPrice())}
              </p>
            </div>
            <a href="/checkout" className="btn btn-primary">
              Checkout
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
