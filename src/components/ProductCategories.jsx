import React from "react";

export const ProductCategories = () => {
  //object for storing product categories
  const productCategoriesData = [
    {
      img: `${process.env.PUBLIC_URL}/images/shared/desktop/image-category-thumbnail-headphones.png`,
      title: "Headphones",
      shopLink: "/categories/headphones",
    },
    {
      img: `${process.env.PUBLIC_URL}/images/shared/desktop/image-category-thumbnail-speakers.png`,
      title: "Speakers",
      shopLink: "/categories/speakers",
    },
    {
      img: `${process.env.PUBLIC_URL}/images/shared/desktop/image-category-thumbnail-earphones.png`,
      title: "Earphones",
      shopLink: "/categories/earphones",
    },
  ];

  //function for rendering product categories cards
  const renderProductCategories = () => {
    return productCategoriesData.map((category) => {
      return (
        <div className="product-category-card">
          <img className="img-category" src={category.img} alt="" />
          <h5>{category.title}</h5>
          <a className="link link-grey" href={category.shopLink}>
            Shop
            <img
              src={`${process.env.PUBLIC_URL}/images/shared/desktop/icon-arrow-right.svg`}
              alt=""
              className="icon-arrow"
            />
          </a>
        </div>
      );
    });
  };

  /////////
  return (
    <section
      className="product-categories grid-12 container"
      id="product-categories"
    >
      {renderProductCategories()}
    </section>
  );
};

export default ProductCategories;
