import React from "react";
import Carousel from "react-bootstrap/Carousel";
import img1 from "../../assets/img/slider/img1.jpeg";
import img2 from "../../assets/img/slider/img2.jpeg";
import img3 from "../../assets/img/slider/img3.jpeg";

export default function Slider() {
  return (
    <div className="m-4">
      <Carousel>
        <Carousel.Item interval={5000}>
          <img
            className="d-block "
            src={img1}
            alt="First slide"
            style={{
              height: "85vh",
              width: "95%",
              objectFit: "cover",
              margin: "auto",
              borderRadius: "10px",
            }}
          />
          <Carousel.Caption>
            <h3>Welcome to VR World Store</h3>
            <p>
              Discover the unlimited possibilities of Virtual Reality! From
              immersive games to stunning 360-degree experiences, VR is more
              than a technology - it's a doorway to new universes.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={4000}>
          <img
            className="d-block "
            src={img2}
            alt="Second slide"
            style={{
              height: "85vh",
              width: "95%",
              objectFit: "cover",
              margin: "auto",
              borderRadius: "10px",
            }}
          />
          <Carousel.Caption>
            <h3>Experience the Unbelievable</h3>
            <p>
              VR isn't just about gaming. Visit far-off travel destinations, get
              front-row seats at concerts, or even take a step into the past
              with our immersive, high-quality VR experiences.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            src={img3}
            alt="Third slide"
            style={{
              height: "85vh",
              width: "95%",
              objectFit: "cover",
              margin: "auto",
              borderRadius: "10px",
            }}
          />
          <Carousel.Caption>
            <h3>High Quality VR Products</h3>
            <p>
              We offer a wide variety of VR headsets, games, and accessories
              from top brands. Dive into the world of VR with high-definition
              visuals, exceptional comfort, and cutting-edge technology.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
