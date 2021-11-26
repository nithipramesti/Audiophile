import React from "react";

import database from "../database/data.json";
import productImg from "../assets/images/product-xx99-mark-one-headphones/desktop/image-category-page-preview.jpg";

export const ProductDetail = () => {
  const productData = database[2];

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

  return (
    <div className="product-detail-page">
      <header></header>
      <div className="container">
        <a href="#" className="go-back text-dark">
          Go Back
        </a>
        <div className="product-card">
          <img src={productImg} />
          <div className="text-container">
            <h2>{productData.name}</h2>
            <p>{productData.description}</p>
            <a href="#" className="btn btn-primary">
              See Product
            </a>
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
          <div className="img-1"></div>
          <div className="img-2"></div>
          <div className="img-3"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
