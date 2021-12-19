import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import database from "../database/data.json";

import ProductCategories from "../components/ProductCategories";
import Story from "../components/Story";

export const ProductDetail = () => {
  //import global state for cart
  const cartGlobalState = useSelector((state) => state.cartReducer);

  //import dispatch
  const dispatch = useDispatch();

  //get route params value
  const params = useParams();

  //get product data from database using param
  const productData = database.find(
    (el) => el.id === Number(params.id_product)
  );

  //get related products data from database
  const relatedProducts = productData.others;

  //state for product quantity (to be added to cart)
  const [productQty, setProductQty] = useState(1);

  //function to edit product quantity (to be added to cart)
  const editQty = (operator) => {
    //add quantity
    if (operator === "add") {
      if (productQty < productData.stock) {
        setProductQty(productQty + 1);
      }
    }
    //subtract quantity
    else if (operator === "subtract") {
      if (productQty > 1) {
        setProductQty(productQty - 1);
      }
    }
  };

  //function to make get/set item from localStorage asynchronous
  const asyncLocalStorage = {
    setItem: async function (key, value) {
      return localStorage.setItem(key, value);
    },
    getItem: async function (key) {
      return localStorage.getItem(key);
    },
  };

  //function to add product to cart
  const addToCart = () => {
    let indexOnCart = cartGlobalState.cartData.findIndex(
      (el) => el.productData.id === productData.id
    );

    let cartDataTemp = cartGlobalState.cartData;

    if (indexOnCart == -1) {
      //save product data and qty to an object
      const cartItem = {
        productData: productData,
        cartQty: productQty,
      };

      cartDataTemp.push(cartItem);

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
          } else {
            //reset state if cart empty
            dispatch({
              type: "RESET_CART",
            });
          }
        });
    } else {
      //calculate total product qty in cart and qty in this page (user want to add)
      let totalCart =
        cartGlobalState.cartData[indexOnCart].cartQty + productQty;

      if (
        totalCart <= cartGlobalState.cartData[indexOnCart].productData.stock
      ) {
        //if qty that wanted to add appropriate (less or same than the stock)
        cartDataTemp[indexOnCart].cartQty = totalCart;

        //convert data to string to be stored on local storage
        const cartDataString = JSON.stringify(cartDataTemp);

        //update cart data in local storage & update cart data
        asyncLocalStorage
          .setItem("Audiophile Cart", cartDataString)
          .then(function () {
            return asyncLocalStorage.getItem("Audiophile Cart");
          })
          .then(function (value) {
            if (value) {
              let cartDataParse = JSON.parse(value);

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
          });
      }
    }
  };

  //function to format price
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  //function to render what's in the box
  const renderInTheBox = () => {
    return productData.includes.map((val) => {
      return (
        <div className="include-item">
          <p className="qty text-orange">{val.quantity}x</p>
          <p className="item">{val.item}</p>
        </div>
      );
    });
  };

  //function to render related products
  const renderRelatedProductCards = () => {
    return relatedProducts.map((val) => {
      return (
        <div className="related-product-card">
          <img src={`${process.env.PUBLIC_URL}` + val.image.desktop} alt="" />
          <h4>{val.name}</h4>
          <a href={`/products/${val.id}`} className="btn btn-primary">
            See Product
          </a>
        </div>
      );
    });
  };

  ////////
  return (
    <div className="product-detail-page">
      <header></header>
      <div className="container">
        <a
          href={`/categories/${productData.category}`}
          className="go-back text-dark"
        >
          Go Back
        </a>
        <div className="product-card">
          <img src={`${process.env.PUBLIC_URL}` + productData.image.desktop} />
          <div className="text-container">
            <h2>{productData.name}</h2>
            <p>{productData.description}</p>
            <h5>{formatter.format(productData.price)}</h5>
            <div className="btn-container">
              <div className="product-qty">
                <button
                  className="text-dark-faded"
                  onClick={() => editQty("subtract")}
                >
                  -
                </button>
                <p>{productQty}</p>
                <button
                  className="text-dark-faded"
                  onClick={() => editQty("add")}
                >
                  +
                </button>
              </div>
              <a onClick={addToCart} className="btn btn-primary">
                Add to Cart
              </a>
            </div>
          </div>
        </div>

        <div className="product-detail grid-12">
          <div className="features">
            <h3>Features</h3>
            <p>{productData.features}</p>
          </div>
          <div className="in-the-box">
            <h3>In The Box</h3>
            {renderInTheBox()}
          </div>
        </div>

        <div className="img-gallery grid-12">
          <div
            className="img-1"
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}${productData.gallery.first.desktop})`,
            }}
          ></div>
          <div
            className="img-2"
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}${productData.gallery.second.desktop})`,
            }}
          ></div>
          <div
            className="img-3"
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}${productData.gallery.third.desktop})`,
            }}
          ></div>
        </div>
      </div>

      <section className="related-products container">
        <h3>You May Also Like</h3>
        <div className="card-container grid-12">
          {renderRelatedProductCards()}
        </div>
      </section>

      <ProductCategories />

      <Story />
    </div>
  );
};

export default ProductDetail;
