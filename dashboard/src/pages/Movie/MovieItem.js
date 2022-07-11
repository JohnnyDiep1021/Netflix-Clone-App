import React from "react";
import { useLocation } from "react-router-dom";

import { Publish } from "@mui/icons-material";

import Button from "../../shared/components/UI/Button/Button";
import "./MovieItem.scss";
const MovieItem = () => {
  const location = useLocation();
  const movie = location.movie;
  console.log(movie);
  return (
    <div className="product-container">
      <div className="product">
        <div className="productTitleContainer">
          <h1 className="productTitle">Movie</h1>
          <Button className="product-add-btn" to="/movies/new">
            Create
          </Button>
        </div>
        <div className="productTop">
          <div className="productTopRight">
            <div className="productInfoTop">
              <img src={movie.image} alt="" className="productInfoImg" />
              <span className="productName">{movie.title}</span>
            </div>
            <div className="productInfoBottom">
              <div className="productInfoItem">
                <span className="productInfoKey">id:</span>
                <span className="productInfoValue">{movie._id}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">genre:</span>
                <span className="productInfoValue">{movie.genre}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">year:</span>
                <span className="productInfoValue">{movie.year}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">limit:</span>
                <span className="productInfoValue">{movie.limit}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="productBottom">
          <form className="productForm">
            <div className="productFormLeft">
              <label>Movie Title</label>
              <input type="text" placeholder={movie.title} />
              <label>Year</label>
              <input type="text" placeholder={movie.year} />
              <label>Genre</label>
              <input type="text" placeholder={movie.genre} />
              <label>Limit</label>
              <input type="text" placeholder={movie.limit} />
              <label>Trailer</label>
              <input type="file" placeholder={movie.trailer} />
              <label>Video</label>
              <input type="file" placeholder={movie.video} />
            </div>
            <div className="productFormRight">
              <div className="productUpload">
                <img src={movie.image} alt="" className="productUploadImg" />
                <label htmlFor="file">
                  <Publish />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="productButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
