import React, { useRef, useState } from "react";
import MovieItem from "../MovieItem/MovieItem";
import "./MovieList.scss";
// import {
//   ArrowBackIosOutlined,
//   ArrowForwardIosOutlined,
// } from "@material-ui/icons";
import {
  ForwardArrow,
  BackwardArrow,
} from "../../../shared/components/Icon/MovieIcons";
let scrollAmount = 0;
const MovieList = () => {
  const [isMoved, setIsMoved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  // const [scrollAmount, setScrollAmount] = useState(0);
  const carouselRef = useRef();
  const sliders = useRef();
  const clickHandler = (direction) => {
    setIsMoved(true);

    const totalCarouselWidth = carouselRef.current.clientWidth - 1248;
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

  // const scrollLeftHandler = (event) => {
  //   if (scrollAmount >= 0) {
  //     scrollAmount -= 218;
  //   } else {
  //     scrollAmount = 0;
  //   }
  //   console.log(scrollAmount);
  //   sliders.current.scrollTo({
  //     top: 0,
  //     left: scrollAmount,
  //     behavior: "smooth",
  //   });
  //   // listRef.current.style.transform = `translateX(-${scrollAmount}px)`;
  // };
  // const scrollRightHandler = (event) => {
  //   const listTotalWidth = listRef.current.clientWidth;
  //   if (scrollAmount <= listTotalWidth) {
  //     scrollAmount += 218;
  //   } else {
  //     scrollAmount = 0;
  //   }
  //   console.log(scrollAmount);
  //   sliders.current.scrollTo({
  //     top: 0,
  //     left: scrollAmount,
  //     behavior: "smooth",
  //   });
  //   // listRef.current.style.transform = `translateX(${scrollAmount}px)`;
  // };
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
      <span className="listTitle">Continue to watch</span>
      <div className="carousel" ref={sliders}>
        <BackwardArrow
          className="sliderArrow left"
          onClick={() => {
            clickHandler("left");
          }}
          // onClick={scrollLeftHandler}
          display={!isMoved && "none"}
        />
        <ul
          className="carouselbox"
          ref={carouselRef}
          style={{ zIndex: isHovered && 1 }}
        >
          <MovieItem />
          <MovieItem />
          <MovieItem />
          <MovieItem />
          <MovieItem />
          <MovieItem />
          <MovieItem />
          <MovieItem />
          <MovieItem />
          <MovieItem />
        </ul>
        <ForwardArrow
          className="sliderArrow right"
          onClick={() => {
            clickHandler("right");
          }}
          // onClick={scrollRightHandler}
        />
      </div>
    </div>
  );
};

export default MovieList;
