import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import database from "../database/data.json";

export const Checkout = () => {
  //import global state for cart
  const cartGlobalState = useSelector((state) => state.cartReducer);

  //import dispatch
  const dispatch = useDispatch();

  //state for checkout history
  let [checkoutHistory, setCheckoutHistory] = useState({});

  //state for displaying checkout pop-up modal
  let [checkoutFinished, setCheckoutFinished] = useState(false);

  //State for input values
  let [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    address: "",
    zipCode: "",
    city: "",
    country: "",
    paymentMethod: "eMoney",
    eMoneyNumber: "",
    eMoneyPin: "",
  });

  //State for handling validation error
  let [errors, setErrors] = useState({});

  let [isSubmitting, setIsSubmitting] = useState(false);

  //Function for onChange in input form
  const inputHandler = (e) => {
    //Save input value to state
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  //Function to save validate info
  const validateInfo = (values) => {
    let errors = {};

    //name validation
    if (!values.name) {
      errors.name = "Please insert your full name";
    }

    //email validation
    if (!values.email) {
      errors.email = "Please insert your email";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
    }

    //phone number validation
    // if (!values.phoneNumber) {
    //   errors.phoneNumber = "Please insert your phone number";
    // }

    //address validation
    if (!values.address) {
      errors.address = "Please insert your address";
    }

    //zip code validation
    if (!values.zipCode) {
      errors.zipCode = "Please insert your ZIP code";
    }

    //city validation
    if (!values.city) {
      errors.city = "Please insert your city";
    }

    //country validation
    if (!values.country) {
      errors.country = "Please insert your country";
    }

    //payment method validation
    if (values.paymentMethod === "eMoney") {
      if (!values.eMoneyNumber) {
        errors.eMoneyNumber = "Please insert your e-Money number";
      }

      if (!values.eMoneyPin) {
        errors.eMoneyPin = "Please insert your e-Money PIN";
      }
    } else if (values.paymentMethod === "cod") {
      delete errors.eMoneyNumber;
      delete errors.eMoneyPin;
    }

    return errors;
  };

  //function to make get/set item from localStorage asynchronous
  const asyncLocalStorage = {
    getItem: async function (key) {
      return localStorage.getItem(key);
    },
    removeItem: async function (key) {
      return localStorage.removeItem(key);
    },
  };

  //Function for checkout
  const checkout = () => {
    //trigger state to display updated validation alert
    setErrors(validateInfo(inputValues));

    setIsSubmitting(true);
  };

  useEffect(() => {
    //if there's no error & checkout button is clicked:
    if (Object.keys(errors).length === 0 && isSubmitting) {
      //add cart data to checkout history
      setCheckoutHistory(cartGlobalState);

      //delete cart data in localStorage & global state
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

      //display success checkout pop-up modal
      setCheckoutFinished(true);
    }
  }, [errors]);

  ////
  const renderCheckoutProducts = () => {
    return cartGlobalState.cartData.map((val) => {
      return (
        <div className="checkout-product-card">
          <img
            src={`${process.env.PUBLIC_URL}` + val.productData.image.desktop}
            alt=""
          />
          <div className="text-container">
            <div className="flex">
              <p className="product-title">{val.productData.name}</p>
              <p className="product-qty">x{val.cartQty}</p>
            </div>
            <p className="product-price">
              {formatter.format(val.productData.price)}
            </p>
          </div>
        </div>
      );
    });
  };

  const totalProductsPrice = () => {
    let total = 0;
    cartGlobalState.cartData.map((val) => {
      total += val.productData.price * val.cartQty;
    });

    return total;
  };

  const shippingPrice = () => {
    return 50;
  };

  const vatPrice = () => {
    return (20 / 100) * totalProductsPrice();
  };

  const grandTotalPrice = () => {
    return totalProductsPrice() + shippingPrice() + vatPrice();
  };

  const grandTotalCheckout = () => {
    let total = 0;
    checkoutHistory.cartData.map((val) => {
      total += val.productData.price * val.cartQty;
    });

    return total + 50 + (20 / 100) * total;
  };

  //function to format price
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const renderCheckoutModal = () => {
    return (
      <div className="first-product">
        <img
          src={
            `${process.env.PUBLIC_URL}` +
            checkoutHistory.cartData[0].productData.image.desktop
          }
          alt=""
        />
        <div className="text-container">
          <div className="flex">
            <p className="product-title">
              {checkoutHistory.cartData[0].productData.name}
            </p>
            <p className="product-qty">
              x{checkoutHistory.cartData[0].cartQty}
            </p>
          </div>
          <p className="product-price">
            {formatter.format(checkoutHistory.cartData[0].productData.price)}
          </p>
        </div>
      </div>
    );
  };

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
    } else {
      //Set global state
      dispatch({
        type: "RESET_CART",
      });
    }
  }, []);

  /////////
  return (
    <div className="checkout-page">
      <header></header>
      <div className="container grid-12">
        <a onClick={() => window.history.back()} className="go-back text-dark">
          Go Back
        </a>

        {/* CHECKOUT FORM */}
        <div className="checkout-form">
          <h3>Checkout</h3>

          {/* BILLING DETAIL */}
          <div className="form-section billing-detail">
            <p className="form-title">Billing Detail</p>
            <p>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Alexei Ward"
                id="name"
                name="name"
                onChange={inputHandler}
                className={errors.name && "invalid"}
              />
              <p className={`invalid-msg ${!errors.name && "hidden"}`}>
                {errors.name}
              </p>
            </p>
            <p>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                placeholder="alexei@mail.com"
                id="email"
                name="email"
                onChange={inputHandler}
                className={errors.email && "invalid"}
              />
              <p className={`invalid-msg ${!errors.email && "hidden"}`}>
                {errors.email}
              </p>
            </p>
            {/* <p>
              <label htmlFor="phone-number">Phone Number</label>
              <input
                type="tel"
                placeholder="+1 202-555-0136"
                id="phone-number"
                name="phoneNumber"
                onChange={inputHandler}
                className={errors.phoneNumber && "invalid"}
              />
              <p className={`invalid-msg ${!errors.phoneNumber && "hidden"}`}>
                {errors.phoneNumber}
              </p>
            </p> */}
          </div>

          {/* SHIPPING INFO */}
          <div className="form-section shipping-info">
            <p className="form-title">Shipping Info</p>
            <p className="span-2">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                placeholder="1137 Williams Avenue"
                id="address"
                name="address"
                onChange={inputHandler}
                className={errors.address && "invalid"}
              />
              <p className={`invalid-msg ${!errors.address && "hidden"}`}>
                {errors.address}
              </p>
            </p>
            <p>
              <label htmlFor="zip-code">ZIP Code</label>
              <input
                type="number"
                placeholder="10001"
                id="zip-code"
                name="zipCode"
                onChange={inputHandler}
                className={errors.zipCode && "invalid"}
              />
              <p className={`invalid-msg ${!errors.zipCode && "hidden"}`}>
                {errors.zipCode}
              </p>
            </p>
            <p>
              <label htmlFor="city">City</label>
              <input
                type="text"
                placeholder="New York"
                id="city"
                name="city"
                onChange={inputHandler}
                className={errors.city && "invalid"}
              />
              <p className={`invalid-msg ${!errors.city && "hidden"}`}>
                {errors.city}
              </p>
            </p>
            <p>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                placeholder="United States"
                id="country"
                name="country"
                onChange={inputHandler}
                className={errors.country && "invalid"}
              />
              <p className={`invalid-msg ${!errors.country && "hidden"}`}>
                {errors.country}
              </p>
            </p>
          </div>

          {/* PAYMENT DETAILS */}
          <div className="form-section payment-detail">
            <p className="form-title">Payment Detail</p>
            <label>Payment Method</label>
            <div className="radio-item">
              <input
                type="radio"
                name="paymentMethod"
                value="eMoney"
                id="eMoney"
                style={{ width: "unset" }}
                onChange={inputHandler}
                defaultChecked
              />
              <label htmlFor="eMoney">e-Money</label>
            </div>
            <div className="radio-item half-right">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                id="cod"
                style={{ width: "unset" }}
                onChange={inputHandler}
              />
              <label htmlFor="cod">Cash on Delivery</label>
            </div>
            <p>
              <label htmlFor="eMoney-number">e-Money Number</label>
              <input
                type="number"
                placeholder="238521993"
                id="eMoney-number"
                name="eMoneyNumber"
                onChange={inputHandler}
                className={errors.eMoneyNumber && "invalid"}
              />
              <p className={`invalid-msg ${!errors.eMoneyNumber && "hidden"}`}>
                {errors.phoneNumber}
              </p>
            </p>
            <p className="half-right">
              <label htmlFor="eMoney-pin">e-Money PIN</label>
              <input
                type="number"
                placeholder="6891"
                id="eMoney-pin"
                name="eMoneyPin"
                onChange={inputHandler}
                className={errors.eMoneyPin && "invalid"}
              />
              <p className={`invalid-msg ${!errors.eMoneyPin && "hidden"}`}>
                {errors.eMoneyPin}
              </p>
            </p>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="summary">
          <h5>Summary</h5>
          <div className="checkout-products">
            {cartGlobalState.cartData[0] && renderCheckoutProducts()}
          </div>
          <di v className="price">
            <p className="price-title">Total</p>
            <p className="price-amount">
              {formatter.format(totalProductsPrice())}
            </p>
          </di>
          <div className="price">
            <p className="price-title">Shipping</p>
            <p className="price-amount">
              {cartGlobalState.totalQty > 0
                ? formatter.format(shippingPrice())
                : formatter.format(0)}
            </p>
          </div>
          <div className="price">
            <p className="price-title">VAT (Included)</p>
            <p className="price-amount">{formatter.format(vatPrice())}</p>
          </div>

          <div className="price total">
            <p className="price-title">Grand Total</p>
            <p className="price-amount text-orange">
              {cartGlobalState.totalQty > 0
                ? formatter.format(grandTotalPrice())
                : formatter.format(0)}
            </p>
          </div>

          <a
            onClick={cartGlobalState.totalQty > 0 && checkout}
            className={`btn  ${
              cartGlobalState.totalQty > 0
                ? "btn-primary"
                : "btn-primary-disabled"
            }`}
          >{`Continue & Pay`}</a>
        </div>

        {/* CHECKOUT MODAL */}
        <div className={`bg-overlay ${!checkoutFinished && "hidden"}`}></div>
        <div
          className={`modal-container ${
            checkoutFinished ? "grid-12" : "hidden"
          }`}
        >
          <div className="checkout-modal">
            <h3>
              Thank You <br />
              for Your Order
            </h3>
            <p>You will receive an email confirmation shortly.</p>
            <div className="order-detail">
              <div className="products">
                {checkoutFinished && renderCheckoutModal()}
                <div className="other-product text-dark-faded">
                  <p>
                    {checkoutHistory.totalQty > 1 &&
                      `and ${checkoutHistory.totalQty - 1} other item(s)`}
                  </p>
                </div>
              </div>
              <div className="grand-total">
                <p className="grand-total-title">Grand Total</p>
                <p className="grand-total-amount">
                  {checkoutFinished && formatter.format(grandTotalCheckout())}
                </p>
              </div>
            </div>
            <a href="/" className="btn btn-primary">
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
