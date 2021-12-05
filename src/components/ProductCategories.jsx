import React from "react";

import categoryThumbnailHeadphones from "../assets/images/shared/desktop/image-category-thumbnail-headphones.png";
import categoryThumbnailEarphones from "../assets/images/shared/desktop/image-category-thumbnail-earphones.png";
import categoryThumbnailSpeakers from "../assets/images/shared/desktop/image-category-thumbnail-speakers.png";

export const ProductCategories = () => {
  //object for storing product categories
  const productCategoriesData = [
    {
      img: categoryThumbnailHeadphones,
      title: "Headphones",
      shopLink: "/categories/headphones",
    },
    {
      img: categoryThumbnailSpeakers,
      title: "Speakers",
      shopLink: "/categories/speakers",
    },
    {
      img: categoryThumbnailEarphones,
      title: "Earphones",
      shopLink: "/categories/earphones",
    },
  ];

  //function for rendering product categories cards
  const renderProductCategories = () => {
    return productCategoriesData.map((category) => {
      return (
        <div className="product-category-card">
          <img src={category.img} alt="" />
          <h5>{category.title}</h5>
          <a className="link link-black" href={category.shopLink}>
            Shop
          </a>
        </div>
      );
    });
  };

  return (
    <section className="product-categories grid-12 container">
      {renderProductCategories()}
    </section>
  );
};

export default ProductCategories;
