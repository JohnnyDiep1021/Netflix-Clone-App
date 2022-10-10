import React from "react";

import { Link } from "react-router-dom";

import "./SearchItem.scss";

const SearchItem = (props) => {
  let content;
  // console.log(props.movie);
  switch (props.element) {
    case "sml":
      content = (
        <div className="seearchItem-container--small">
          <div className="poster-container">
            {/* <img src={props.movie.image.file} alt="movie poster" /> */}
            <div
              className="poster-img"
              style={{ backgroundImage: `url(${props.movie.image.file})` }}
            ></div>
          </div>
          <div className="info-container">
            <p className="info_title">
              {props.movie.title.length < 25
                ? props.movie.title
                : `${props.movie.title.slice(0, 25)}...`}
            </p>
            <p className="info_publish">{props.movie.year}</p>
            <p className="info_genre">{props.movie.genre}</p>
          </div>
        </div>
      );
      break;
    default:
      content = <div></div>;
      break;
  }
  return (
    <li key={props.movie._id}>
      <Link to="/">{content}</Link>
    </li>
  );
};

export default SearchItem;
