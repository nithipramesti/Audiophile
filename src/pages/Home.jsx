import { Link } from "react-router-dom";
import ProductCategories from "../components/ProductCategories";
import Story from "../components/Story";

import database from "../database/data.json";

function Home() {
  //select product from database to be featured
  const featuredProducts = [database[5], database[4], database[0]];

  return (
    <div className="home">
      <section
        className="hero"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/home/desktop/image-hero.jpg)`,
        }}
      >
        <div className="container">
          <div className="hero-text">
            <p className="sub-title">NEW PRODUCT</p>
            <h1>XX99 Mark II Headphones</h1>
            <p className="text-details">
              Experience natural, lifelike audio and exceptional build quality
              made for the passionate music enthusiast.
            </p>
          </div>
          <a href="#product-categories" className="btn btn-primary">
            See Product
          </a>
        </div>
      </section>

      <ProductCategories />

      <div className="container">
        <section
          className="featured-primary grid-12 text-light"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/home/desktop/image-speaker-zx9.png)`,
          }}
        >
          <div className="text-container">
            <h1 class="title">{featuredProducts[0].name}</h1>
            <p className="text-details">
              Upgrade to premium speakers that are phenomenally built to deliver
              truly remarkable sound.
            </p>
            <a
              href={`/products/${featuredProducts[0].id}`}
              className="btn btn-dark"
            >
              See Product
            </a>
          </div>
        </section>

        <section
          className="featured-secondary grid-12"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/home/desktop/image-speaker-zx7.jpg)`,
          }}
        >
          <div className="text-container">
            <h3 class="title">{featuredProducts[1].name}</h3>
            <a
              href={`/products/${featuredProducts[1].id}`}
              className="btn btn-outline"
            >
              See Product
            </a>
          </div>
        </section>

        <section className="featured-tertiary grid-12">
          <div
            className="left-side"
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/images/home/desktop/image-earphones-yx1.jpg)`,
            }}
          ></div>
          <div className="right-side grid-6">
            <div className="text-container">
              <h3 class="title">{featuredProducts[2].name}</h3>
              <a
                href={`/products/${featuredProducts[2].id}`}
                className="btn btn-outline"
              >
                See Product
              </a>
            </div>
          </div>
        </section>
      </div>

      <Story />
    </div>
  );
}

export default Home;
