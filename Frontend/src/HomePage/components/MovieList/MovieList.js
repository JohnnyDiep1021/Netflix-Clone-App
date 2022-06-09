import React, { useRef, useState } from "react";
import MovieItem from "../MovieItem/MovieItem";
import "./MovieList.scss";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";

const MovieList = () => {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);

  const listRef = useRef();
  const clickHandler = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 5) {
      setSlideNumber(slideNumber + 1);

      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }

    console.log(distance);
  };
  return (
    <div className="list">
      <span className="listTitle">Continue to watch</span>
      <div className="wrapper">
        <ArrowBackIosOutlined
          className="sliderArrow left"
          onClick={() => clickHandler("left")}
          style={{ display: !isMoved && "none" }}
        />
        <ul className="container" ref={listRef}>
          <MovieItem index={0} id="1" />
          <MovieItem index={1} id="2" />
          <MovieItem index={2} id="3" />
          <MovieItem index={3} />
          <MovieItem index={4} />
          {/* <MovieItem index={5} />
          <MovieItem index={6} />
          <MovieItem index={7} />
          <MovieItem index={8} />
          <MovieItem index={9} /> */}
        </ul>
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={() => clickHandler("right")}
        />
      </div>
    </div>
  );
};

export default MovieList;
