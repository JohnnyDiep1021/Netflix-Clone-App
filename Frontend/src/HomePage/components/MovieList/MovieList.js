import React, { useRef, useState } from "react";

import MovieItem from "../MovieItem/MovieItem";

import {
  ForwardArrow,
  BackwardArrow,
} from "../../../shared/components/Icon/MovieIcons";

import "./MovieList.scss";

let scrollAmount = 0;
const MovieList = (props) => {
  const [isMoved, setIsMoved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  // const [scrollAmount, setScrollAmount] = useState(0);
  const carouselRef = useRef();
  const sliders = useRef();

  const scrollHandler = (direction) => {
    setIsMoved(true);

    const totalCarouselWidth = carouselRef.current.clientWidth - 208;
    console.log(totalCarouselWidth);
    // get bounding x (margin-left, ) of carousel
    let distance = carouselRef.current.getBoundingClientRect().x - 50;
    console.log(distance);

    // movieItem innerWidth = 200, margin-right = 8 => totalWidth = 208
    // translate +x value will push the carousel forward and create sliding backward effect
    if (direction === "left") {
      scrollAmount = parseInt(416 + distance);
      // if (scrollAmount >= 0) {
      // setIsMoved(false);
      // }
      if (scrollAmount > 0) {
        scrollAmount = -totalCarouselWidth;
      }
    }

    // translate -x value will push the carousel backward and create sliding forward effect
    if (direction === "right") {
      scrollAmount = parseInt(-416 + distance);
      if (scrollAmount < -totalCarouselWidth) {
        scrollAmount = 0;
        setIsMoved(false);
      }
    }
    console.log(scrollAmount);
    carouselRef.current.style.transform = `translateX(${scrollAmount}px)`;
  };

  const movieItems = props.movieList.content.map((id) => (
    <MovieItem id={id} key={id} />
  ));
  return (
    <div
      className="list"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <span className="listTitle">{props.movieList.title}</span>
      <div className="carousel" ref={sliders}>
        <BackwardArrow
          className="sliderArrow left"
          onClick={() => {
            scrollHandler("left");
          }}
          // onClick={scrollLeftHandler}
          display={!isMoved && "none"}
        />
        <ul
          className="carouselbox"
          ref={carouselRef}
          style={{ zIndex: isHovered && 1 }}
        >
          {movieItems}
        </ul>
        <ForwardArrow
          className="sliderArrow right"
          onClick={() => {
            scrollHandler("right");
          }}
          // onClick={scrollRightHandler}
        />
      </div>
    </div>
  );
};

export default MovieList;
