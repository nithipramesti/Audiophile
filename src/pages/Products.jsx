import React from "react";
import ProductCategories from "../components/ProductCategories";
import Story from "../components/Story";

import database from "../database/data.json";

import productImg from "../assets/images/product-xx99-mark-one-headphones/desktop/image-category-page-preview.jpg";

export const Products = () => {
  const productCategory = "Headphones";

  const productDatabase = database.filter((val) => {
    return val.category === "headphones";
  });

  const renderProductCard = () => {
    return productDatabase.map((val, index) => {
      return (
        <div className="product-card">
          <img
            src={productImg}
            style={{ order: `${index % 2 === 0 ? "1" : "2"}` }}
          />
          <div
            className="text-container"
            style={{ order: `${index % 2 === 0 ? "2" : "1"}` }}
          >
            <h2>{val.name}</h2>
            <p>{val.description}</p>
            <a href="#" className="btn btn-primary">
              See Product
            </a>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="products-page">
      <header>
        <h2 className="text-light">{productCategory}</h2>
      </header>
      <section className="products-container container">
        {renderProductCard()}
      </section>
      <ProductCategories />
      <Story />
    </div>
  );
};

export default Products;
