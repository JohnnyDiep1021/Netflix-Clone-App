import React, { useState } from "react";

import {
  Play,
  ThumbDown,
  ThumbUp,
  Add,
  DropDown,
} from "../../../shared/components/Icon/MovieIcons";
import "./MovieItem.scss";
const MovieItem = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const trailer =
    "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
  const showOnHoverHandler = () => {
    setIsHovered(true);
  };

  return (
    <li
      key={props.id}
      className={`listItem`}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="listImage">
        {!isHovered && (
          <img
            // className={`trailer-img ${!isHovered && "active"}`}
            src="https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee"
            alt="movie poster"
            onClick={showOnHoverHandler}
          />
        )}
        {isHovered && (
          <video
            className={`trailer-video ${!isHovered && "deactive"}`}
            src={trailer}
            autoPlay={isHovered}
            loop
          />
        )}
      </div>
      <div className="itemInfo">
        <div className="row">
          <div className="left">
            <button className="btn-icon play-active">
              <Play />
            </button>
            <button className="btn-icon">
              <Add />
            </button>
            <button className="btn-icon">
              <ThumbUp />
            </button>
            <button className="btn-icon">
              <ThumbDown />
            </button>
          </div>
          <div className="right">
            <button className="btn-icon">
              <DropDown />
            </button>
          </div>
        </div>
        <div className="itemInfoTop">
          <span>1 hour 14 mins</span>
          <span className="limit">+16</span>
          <span>1999</span>
          <div className="genre">Action</div>
        </div>
        {/* <div className="desc">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium
          hic rem eveniet error possimus, neque ex doloribus.
        </div> */}
      </div>
    </li>
  );
};
export default MovieItem;
