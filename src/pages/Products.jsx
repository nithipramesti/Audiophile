import React from "react";
import ProductCategories from "../components/ProductCategories";
import Story from "../components/Story";

import database from "../database/data.json";

import { Link, useParams } from "react-router-dom";

export const Products = () => {
  const params = useParams();

  const productDatabase = database.filter((val) => {
    return val.category === params.category;
  });

  const renderProductCard = () => {
    return productDatabase.map((val, index) => {
      return (
        <div className="product-card">
          <img
            src={`${process.env.PUBLIC_URL}` + val.image.desktop}
            style={{ order: `${index % 2 === 0 ? "1" : "2"}` }}
          />
          <div
            className="text-container"
            style={{ order: `${index % 2 === 0 ? "2" : "1"}` }}
          >
            <h2>{val.name}</h2>
            <p>{val.description}</p>
            <a href={`/products/${val.id}`} className="btn btn-primary">
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
        <h2 className="text-light">{params.category}</h2>
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
