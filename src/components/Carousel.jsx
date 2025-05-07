import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Carousel } from 'react-bootstrap';
import './stylres/Carousel.css';
import { Link } from 'react-router-dom';

const CustomCarousel = () => {
  const carouselItems = [
    {
      id: 1,
      src: `${process.env.PUBLIC_URL}/images/img16.jpg`,
      alt: "Luxury vehicle showcase",
      caption: "Premium Luxury Vehicles"
    },
    {
      id: 2,
      src: `${process.env.PUBLIC_URL}/images/img18.jpg`,
      alt: "Family cars collection",
      caption: "Family-Friendly Options"
    },
    {
      id: 3,
      src: `${process.env.PUBLIC_URL}/images/img12.jpg`,
      alt: "Sports car highlight",
      caption: "High Performance Sports Cars"
    }
  ];

  return (
    <section aria-label="Featured vehicles carousel">
      <Carousel interval={5000} pause="hover">
        {carouselItems.map((item, index) => (
          <Carousel.Item key={`slide-${item.id}`}>
            <img
              className="d-block w-100 carousel-img"
              src={item.src}
              alt={item.alt}
              loading="lazy"
            />
            <Carousel.Caption>
              <h3>{item.caption}</h3>
              <Link 
        to="/cars" 
        className="btn btn-primary mt-2"
        role="button"  // Makes it behave like a button
      >
        View Collection
      </Link>

            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default CustomCarousel;