import "./App.css";
import database from "./database/data.json";
import logo from "./assets/images/shared/desktop/logo.svg";
import iconCart from "./assets/images/shared/desktop/icon-cart.svg";
import categoryThumbnailHeadphones from "./assets/images/shared/desktop/image-category-thumbnail-headphones.png";
import categoryThumbnailEarphones from "./assets/images/shared/desktop/image-category-thumbnail-earphones.png";
import categoryThumbnailSpeakers from "./assets/images/shared/desktop/image-category-thumbnail-speakers.png";
import iconFacebook from "./assets/images/shared/desktop/icon-facebook.svg";
import iconTwitter from "./assets/images/shared/desktop/icon-twitter.svg";
import iconInstagram from "./assets/images/shared/desktop/icon-instagram.svg";

function App() {
  const productCategoriesData = [
    {
      img: categoryThumbnailHeadphones,
      title: "Headphones",
      shopLink: "#",
    },
    {
      img: categoryThumbnailSpeakers,
      title: "Speakers",
      shopLink: "#",
    },
    {
      img: categoryThumbnailEarphones,
      title: "Earphones",
      shopLink: "#",
    },
  ];

  const renderProductCategories = () => {
    return productCategoriesData.map((category) => {
      return (
        <div className="product-category">
          <img src={category.img} alt="" />
          <h4>{category.title}</h4>
          <a className="btn btn-primary" href={category.shopLink}>
            Shop
          </a>
        </div>
      );
    });
  };

  return (
    <div className="App">
      <nav>
        <img src={logo} alt="" className="logo" />
        <div className="nav-links">
          <a href="#" className="nav-link">
            Home
          </a>
          <a href="#" className="nav-link">
            Headphones
          </a>
          <a href="#" className="nav-link">
            Speakers
          </a>
          <a href="#" className="nav-link">
            Earphones
          </a>
        </div>
        <img src={iconCart} alt="" className="nav-cart" />
      </nav>

      <section className="hero">
        <div className="hero-text">
          <p className="sub-title">NEW PRODUCT</p>
          <h1>XX99 Mark II Headphones</h1>
          <p className="text-details">
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>
        </div>
        <a href="#">See Product</a>
      </section>

      <section className="product-categories">
        {renderProductCategories()}
      </section>
      <section className="featured-primary">
        <h1 class="title">ZX9 Speaker</h1>
        <p className="text-details">
          Upgrade to premium speakers that are phenomenally built to deliver
          truly remarkable sound.
        </p>
        <a href="#" className="btn btn-dark">
          See Product
        </a>
      </section>

      <section className="featured-secondary">
        <h1 class="title">ZX7 Speaker</h1>
        <a href="#" className="btn btn-outline">
          See Product
        </a>
      </section>

      <section className="featured-tertiary">
        <div className="left-side"></div>
        <div className="right-side">
          <h1 class="title">XY1 Earphone</h1>
          <a href="#" className="btn btn-outline">
            See Product
          </a>
        </div>
      </section>

      <section className="story">
        <div className="text">
          <h2>
            Bringing you the <span>best</span> audio gear
          </h2>
          <p className="text-details">
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>
        <div className="story-image"></div>
      </section>

      <footer>
        <nav>
          <img src={logo} alt="" className="logo" />
          <div className="nav-links">
            <a href="#" className="nav-link">
              Home
            </a>
            <a href="#" className="nav-link">
              Headphones
            </a>
            <a href="#" className="nav-link">
              Speakers
            </a>
            <a href="#" className="nav-link">
              Earphones
            </a>
          </div>
        </nav>
        <div className="about">
          Audiophile is an all in one stop to fulfill your audio needs. We're a
          small team of music lovers and sound specialists who are devoted to
          helping you get the most out of personal audio. Come and visit our
          demo facility - we’re open 7 days a week.
        </div>
        <div className="social">
          <a href="#" className="social-button">
            <img src={iconFacebook} alt="" />
          </a>
          <a href="#" className="social-button">
            <img src={iconTwitter} alt="" />
          </a>
          <a href="#" className="social-button">
            <img src={iconInstagram} alt="" />
          </a>
        </div>
        <div className="copyright">Copyright 2021. All Rights Reserved</div>
      </footer>
    </div>
  );
}

export default App;
