import categoryThumbnailHeadphones from "../assets/images/shared/desktop/image-category-thumbnail-headphones.png";
import categoryThumbnailEarphones from "../assets/images/shared/desktop/image-category-thumbnail-earphones.png";
import categoryThumbnailSpeakers from "../assets/images/shared/desktop/image-category-thumbnail-speakers.png";

function Home() {
  //object for storing product categories
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

  //function for rendering product categories cards
  const renderProductCategories = () => {
    return productCategoriesData.map((category) => {
      return (
        <div className="product-category-card">
          <img src={category.img} alt="" />
          <h4>{category.title}</h4>
          <a className="link link-black" href={category.shopLink}>
            Shop
          </a>
        </div>
      );
    });
  };

  //////////
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-text">
            <p className="sub-title">NEW PRODUCT</p>
            <h1>XX99 Mark II Headphones</h1>
            <p className="text-details">
              Experience natural, lifelike audio and exceptional build quality
              made for the passionate music enthusiast.
            </p>
          </div>
          <a href="#" className="btn btn-primary">
            See Product
          </a>
        </div>
      </section>

      <section className="product-categories grid-12 container">
        {renderProductCategories()}
      </section>

      <section className="container featured-primary grid-12 text-light">
        <div className="text-container">
          <h1 class="title">ZX9 Speaker</h1>
          <p className="text-details">
            Upgrade to premium speakers that are phenomenally built to deliver
            truly remarkable sound.
          </p>
          <a href="#" className="btn btn-dark">
            See Product
          </a>
        </div>
      </section>

      <section className="container featured-secondary grid-12">
        <div className="text-container">
          <h3 class="title">ZX7 Speaker</h3>
          <a href="#" className="btn btn-outline">
            See Product
          </a>
        </div>
      </section>

      <section className="container featured-tertiary grid-12">
        <div className="left-side"></div>
        <div className="right-side grid-6">
          <div className="text-container">
            <h3 class="title">XY1 Earphone</h3>
            <a href="#" className="btn btn-outline">
              See Product
            </a>
          </div>
        </div>
      </section>

      <section className="container story grid-12">
        <div className="text-container">
          <h2>
            Bringing you the <span className="text-orange">best</span> audio
            gear
          </h2>
          <p className="text-details">
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>
        <div className="img-container"></div>
      </section>
    </div>
  );
}

export default Home;
