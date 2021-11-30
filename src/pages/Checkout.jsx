import React from "react";

import database from "../database/data.json";
import productImg from "../assets/images/product-xx99-mark-one-headphones/desktop/image-category-page-preview.jpg";

export const Checkout = () => {
  const checkoutProductsData = database.filter((val) => {
    return val.category === "headphones";
  });

  const renderCheckoutProducts = () => {
    return checkoutProductsData.map((val) => {
      return (
        <div className="checkout-product-card">
          <img src={productImg} alt="" />
          <div className="text-container">
            <div className="flex">
              <p className="product-title">{val.name}</p>
              <p className="product-qty">x1</p>
            </div>
            <p className="product-price">${val.price}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="checkout-page">
      <header></header>
      <div className="container grid-12">
        <a href="#" className="go-back text-dark">
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
              <input type="text" placeholder="Alexei Ward" id="name" />
            </p>
            <p>
              <label htmlFor="email">Email Address</label>
              <input type="email" placeholder="alexei@mail.com" id="email" />
            </p>
            <p>
              <label htmlFor="phone-number">Phone Number</label>
              <input
                type="tel"
                placeholder="+1 202-555-0136"
                id="phone-number"
              />
            </p>
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
              />
            </p>
            <p>
              <label htmlFor="zip-code">ZIP Code</label>
              <input type="text" placeholder="10001" id="zip-code" />
            </p>
            <p>
              <label htmlFor="city">City</label>
              <input type="text" placeholder="New York" id="city" />
            </p>
            <p>
              <label htmlFor="country">Country</label>
              <input type="text" placeholder="United States" id="country" />
            </p>
          </div>

          {/* PAYMENT DETAILS */}
          <div className="form-section payment-detail">
            <p className="form-title">Payment Detail</p>
            <label>Payment Method</label>
            <div className="radio-item">
              <input
                type="radio"
                name="payment-method"
                value="emoney"
                id="emoney"
                style={{ width: "unset" }}
              />
              <label htmlFor="emoney">e-Money</label>
            </div>
            <div className="radio-item half-right">
              <input
                type="radio"
                name="payment-method"
                value="cod"
                id="cod"
                style={{ width: "unset" }}
              />
              <label htmlFor="cod">Cash on Delivery</label>
            </div>
            <p>
              <label htmlFor="emoney-number">e-Money Number</label>
              <input type="text" placeholder="238521993" id="emoney-number" />
            </p>
            <p className="half-right">
              <label htmlFor="emoney-pin">e-Money PIN</label>
              <input type="text" placeholder="6891" id="emoney-pin" />
            </p>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="summary">
          <h5>Summary</h5>
          <div className="checkout-products">{renderCheckoutProducts()}</div>
          <di v className="price">
            <p className="price-title">Total</p>
            <p className="price-amount">$5,396</p>
          </di>
          <div className="price">
            <p className="price-title">Shipping</p>
            <p className="price-amount">$50</p>
          </div>
          <div className="price">
            <p className="price-title">VAT (Included)</p>
            <p className="price-amount">$1,079</p>
          </div>

          <div className="price total">
            <p className="price-title">Grand Total</p>
            <p className="price-amount text-orange">$5,446</p>
          </div>

          <a href="#" className="btn btn-primary">{`Continue & Pay`}</a>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
