import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Navbar = () => {
  //import global state for cart
  const cartGlobalState = useSelector((state) => state.cartReducer);

  //import dispatch
  const dispatch = useDispatch();

  const [cartDisplayed, setCartDisplayed] = useState(false);

  //get cart data from local storage
  useEffect(() => {
    let cartDataParse = JSON.parse(localStorage.getItem("Audiophile Cart"));

    if (cartDataParse) {
      //Set global state
      dispatch({
        type: "UPDATE_CART",
        payload: {
          cartData: cartDataParse,
          totalQty: cartDataParse.length,
        },
      });
    }
  }, []);

  //function to make get/set item from localStorage asynchronous
  const asyncLocalStorage = {
    setItem: async function (key, value) {
      return localStorage.setItem(key, value);
    },
    getItem: async function (key) {
      return localStorage.getItem(key);
    },
    removeItem: async function (key) {
      return localStorage.removeItem(key);
    },
  };

  //function to edit product quantity (to be added to cart)
  const editCartQty = (index, operator) => {
    //make temp array for cart data
    let cartDataTemp = cartGlobalState.cartData;

    //add or subtract quantity
    if (operator === "add") {
      if (cartDataTemp[index].cartQty < cartDataTemp[index].productData.stock) {
        cartDataTemp[index].cartQty += 1;
      }
    } else if (operator === "subtract") {
      if (cartDataTemp[index].cartQty > 1) {
        cartDataTemp[index].cartQty -= 1;
      } else {
        removeCartItem(index);
      }
    }

    //convert data to string to be stored on local storage
    const cartDataString = JSON.stringify(cartDataTemp);

    //update cart data in local storage & update cart data
    asyncLocalStorage
      .setItem("Audiophile Cart", cartDataString)
      .then(function () {
        //get cart data from local storage after setItem
        return asyncLocalStorage.getItem("Audiophile Cart");
      })
      .then(function (value) {
        if (value) {
          //parse data from local storage
          let cartDataParse = JSON.parse(value);

          //Set global state
          dispatch({
            type: "UPDATE_CART",
            payload: {
              cartData: cartDataParse,
              totalQty: cartDataParse.length,
            },
          });
        }
      });
  };

  //function to remove cart item
  const removeCartItem = (index) => {
    //make temp array for cart data
    let cartDataTemp = cartGlobalState.cartData;

    //remove the product from the cartTemp
    cartDataTemp.splice(index, 1);

    //convert data to string to be stored on local storage
    const cartDataString = JSON.stringify(cartDataTemp);

    //update cart data in local storage & update cart data
    asyncLocalStorage
      .setItem("Audiophile Cart", cartDataString)
      .then(function () {
        //get cart data from local storage after setItem
        return asyncLocalStorage.getItem("Audiophile Cart");
      })
      .then(function (value) {
        if (value) {
          //parse data from local storage
          let cartDataParse = JSON.parse(value);

          //Set global state
          dispatch({
            type: "UPDATE_CART",
            payload: {
              cartData: cartDataParse,
              totalQty: cartDataParse.length,
            },
          });
        }
      });
  };

  //function to remove ALL cart item
  const removeAllCartItem = () => {
    //update cart data in local storage & update cart data
    asyncLocalStorage
      .removeItem("Audiophile Cart")
      .then(function () {
        //get cart data from local storage after setItem
        return asyncLocalStorage.getItem("Audiophile Cart");
      })
      .then(function (value) {
        if (value) {
          //parse data from local storage
          let cartDataParse = JSON.parse(value);

          //Set global state
          dispatch({
            type: "UPDATE_CART",
            payload: {
              cartData: cartDataParse,
              totalQty: cartDataParse.length,
            },
          });
        } else {
          //reset state if cart empty
          dispatch({
            type: "RESET_CART",
          });
        }
      });
  };

  //function to calculate total product price in cart
  const totalProductsPrice = () => {
    let total = 0;
    cartGlobalState.cartData.map((val) => {
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
    if (cartGlobalState.cartData.length) {
      return cartGlobalState.cartData.map((val, index) => {
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
                  <p className="product-price">
                    {formatter.format(val.productData.price)}
                  </p>
                </div>
                <div className="flex-right">
                  <div className="product-qty">
                    <button onClick={() => editCartQty(index, "subtract")}>
                      -
                    </button>
                    <p>{val.cartQty}</p>
                    <button onClick={() => editCartQty(index, "add")}>+</button>
                  </div>
                  <button
                    className="remove-item text-dark-faded"
                    onClick={() => removeCartItem(index)}
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

  //////////
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
            {cartGlobalState.totalQty > 0 && (
              <div className="cart-badge">{cartGlobalState.totalQty}</div>
            )}
          </a>
          <div className={`cart ${!cartDisplayed && "hidden"}`}>
            <header>
              <h5>{`CART(${cartGlobalState.cartData.length})`}</h5>
              <a
                onClick={removeAllCartItem}
                className="remove-all text-dark-faded"
              >
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
            <a
              href={cartGlobalState.totalQty > 0 && `/checkout`}
              className={`btn ${
                cartGlobalState.totalQty > 0
                  ? "btn-primary"
                  : "btn-primary-disabled"
              }`}
            >
              Checkout
            </a>
          </div>
        </div>
      </nav>
      <div className={`bg-overlay ${!cartDisplayed && "hidden"}`}></div>
    </div>
  );
};

export default Navbar;
