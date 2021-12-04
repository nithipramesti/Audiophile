import React, { useState } from "react";

import database from "../database/data.json";
import productImg from "../assets/images/product-xx99-mark-one-headphones/desktop/image-category-page-preview.jpg";

import { useParams } from "react-router-dom";
import ProductCategories from "../components/ProductCategories";
import Story from "../components/Story";

export const ProductDetail = () => {
  const params = useParams();

  const productData = database.find(
    (el) => el.id === Number(params.id_product)
  );

  const relatedProducts = database.filter((val) => {
    return val.category === "headphones";
  });

  const [productQty, setProductQty] = useState(1);

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

  const renderRelatedProductCards = () => {
    return relatedProducts.map((val) => {
      return (
        <div className="related-product-card">
          <img src={productImg} alt="" />
          <h4>{val.name}</h4>
          <a href={`/products/${val.id}`} className="btn btn-primary">
            See Product
          </a>
        </div>
      );
    });
  };

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
          <img src={productImg} />
          <div className="text-container">
            <h2>{productData.name}</h2>
            <p>{productData.description}</p>
            <div className="btn-container">
              <div className="product-qty">
                <span>-</span>
                <p>{productQty}</p>
                <span>+</span>
              </div>
              <a href="#" className="btn btn-primary">
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
          <div className="img-1"></div>
          <div className="img-2"></div>
          <div className="img-3"></div>
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
