import React from "react";

export const Story = () => {
  return (
    <section className="container story grid-12">
      <div className="text-container">
        <h2>
          Bringing you the <span className="text-orange">best</span> audio gear
        </h2>
        <p className="text-details">
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
      <div
        className="img-container"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/shared/desktop/image-best-gear.jpg)`,
        }}
      ></div>
    </section>
  );
};

export default Story;
