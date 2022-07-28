import React, { useState, useEffect } from "react";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useSelector } from "react-redux";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import WatchListItem from "../WatchListItem/WatchListItem";
import Button from "../../../shared/components/UI/Button/Button";
import "./WatchList.scss";

const WatchList = () => {
  const token = useSelector((state) => state.auth.token);
  const [watchList, setWatchList] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const fetchWatchList = async () => {
      const responseData = sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/watchlist`,
        "GET",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log(responseData);
      setWatchList(responseData.watchList);
    };
  }, [token, sendRequest]);
  return (
    <div className="watchList-container">
      <ul className="watchList-list">
        <li className="watchList-item">
          <div className="left">
            <video
              src="https://firebasestorage.googleapis.com/v0/b/netflix-76544.appspot.com/o/images%2F1657793609946-ANH%20T%C3%9A%20-%20%20Cho%20con%20tim%20m%E1%BB%99t%20l%C3%BD%20do%20%5BOFFICIAL%20MV%5D.mp4?alt=media&token=05e2bc5e-3f22-40a3-8e07-d2d1248595b6"
              autoPlay
              loop
              muted
              className="poster-video"
            />
          </div>
          <div className="right">
            <div className="info-container">
              <div className="publish-info">
                <span className="matching">93% Match</span>
                <span className="year">2019</span>
                <span className="type">MV</span>
                <span className="duration">120 mins</span>
              </div>
              <div className="category-info">
                <div className="cast">
                  <p>
                    <span>Cast:</span>
                    Anh Tu, Diem My, Hoai Linh, My Dung, Kim Chi
                  </p>
                </div>
                <div className="genre">
                  <p>
                    <span>Genre:</span>Romantic MV
                  </p>
                </div>
              </div>
              <div className="description-info">
                <p>
                  A beautiful love of a young couple. They fell in love with
                  each other since their first dating. They had been through
                  thick and thin. However, the boy gradually recognized that he
                  did not fully understand his girlfriend's intentions, leading
                  to unexpected conflicts in love. Eventually, his girlfriends
                  was so regretful as he passed away in a car accident.
                </p>
              </div>
            </div>
            <div className="btn-container">
              <div className="left-btn">
                <Button
                  className="btn-func-icon striking"
                  element="link"
                  // to={{ pathname: "/watch", movie: movieItem }}
                >
                  <PlayArrowIcon />
                  Play
                </Button>
              </div>
              <div className="right-btn">
                <Button
                  className={`btn-icon `}
                  // onClick={watchListHandler}
                >
                  <FavoriteIcon />
                </Button>
                <Button className="btn-icon">
                  <ThumbUpOffAltIcon />
                </Button>
                <Button className="btn-icon">
                  <ThumbDownOffAltIcon />
                </Button>
                <Button className="btn-icon">
                  <ExpandMoreIcon />
                </Button>
              </div>
            </div>
          </div>
        </li>
        <li className="watchList-item">
          <div className="left">
            <video
              src="https://firebasestorage.googleapis.com/v0/b/netflix-76544.appspot.com/o/images%2F1657793609946-ANH%20T%C3%9A%20-%20%20Cho%20con%20tim%20m%E1%BB%99t%20l%C3%BD%20do%20%5BOFFICIAL%20MV%5D.mp4?alt=media&token=05e2bc5e-3f22-40a3-8e07-d2d1248595b6"
              autoPlay
              loop
              muted
              className="poster-video"
            />
          </div>
          <div className="right">
            <div className="info-container">
              <div className="publish-info">
                <span className="matching">93% Match</span>
                <span className="year">2019</span>
                <span className="type">MV</span>
                <span className="duration">120 mins</span>
              </div>
              <div className="category-info">
                <div className="cast">
                  <p>
                    <span>Cast:</span>
                    Anh Tu, Diem My, Hoai Linh, My Dung, Kim Chi
                  </p>
                </div>
                <div className="genre">
                  <p>
                    <span>Genre:</span>Romantic MV
                  </p>
                </div>
              </div>
              <div className="description-info">
                <p>
                  A beautiful love of a young couple. They fell in love with
                  each other since their first dating. They had been through
                  thick and thin. However, the boy gradually recognized that he
                  did not fully understand his girlfriend's intentions, leading
                  to unexpected conflicts in love. Eventually, his girlfriends
                  was so regretful as he passed away in a car accident.
                </p>
              </div>
            </div>
            <div className="btn-container">
              <div className="left-btn">
                <Button
                  className="btn-func-icon striking"
                  element="link"
                  // to={{ pathname: "/watch", movie: movieItem }}
                >
                  <PlayArrowIcon />
                  Play
                </Button>
              </div>
              <div className="right-btn">
                <Button
                  className={`btn-icon `}
                  // onClick={watchListHandler}
                >
                  <FavoriteIcon />
                </Button>
                <Button className="btn-icon">
                  <ThumbUpOffAltIcon />
                </Button>
                <Button className="btn-icon">
                  <ThumbDownOffAltIcon />
                </Button>
                <Button className="btn-icon">
                  <ExpandMoreIcon />
                </Button>
              </div>
            </div>
          </div>
        </li>
        <li className="watchList-item">
          <div className="left">
            <video
              src="https://firebasestorage.googleapis.com/v0/b/netflix-76544.appspot.com/o/images%2F1657793609946-ANH%20T%C3%9A%20-%20%20Cho%20con%20tim%20m%E1%BB%99t%20l%C3%BD%20do%20%5BOFFICIAL%20MV%5D.mp4?alt=media&token=05e2bc5e-3f22-40a3-8e07-d2d1248595b6"
              autoPlay
              loop
              muted
              className="poster-video"
            />
          </div>
          <div className="right">
            <div className="info-container">
              <div className="publish-info">
                <span className="matching">93% Match</span>
                <span className="year">2019</span>
                <span className="type">MV</span>
                <span className="duration">120 mins</span>
              </div>
              <div className="category-info">
                <div className="cast">
                  <p>
                    <span>Cast:</span>
                    Anh Tu, Diem My, Hoai Linh, My Dung, Kim Chi
                  </p>
                </div>
                <div className="genre">
                  <p>
                    <span>Genre:</span>Romantic MV
                  </p>
                </div>
              </div>
              <div className="description-info">
                <p>
                  A beautiful love of a young couple. They fell in love with
                  each other since their first dating. They had been through
                  thick and thin. However, the boy gradually recognized that he
                  did not fully understand his girlfriend's intentions, leading
                  to unexpected conflicts in love. Eventually, his girlfriends
                  was so regretful as he passed away in a car accident.
                </p>
              </div>
            </div>
            <div className="btn-container">
              <div className="left-btn">
                <Button
                  className="btn-func-icon striking"
                  element="link"
                  // to={{ pathname: "/watch", movie: movieItem }}
                >
                  <PlayArrowIcon />
                  Play
                </Button>
              </div>
              <div className="right-btn">
                <Button
                  className={`btn-icon `}
                  // onClick={watchListHandler}
                >
                  <FavoriteIcon />
                </Button>
                <Button className="btn-icon">
                  <ThumbUpOffAltIcon />
                </Button>
                <Button className="btn-icon">
                  <ThumbDownOffAltIcon />
                </Button>
                <Button className="btn-icon">
                  <ExpandMoreIcon />
                </Button>
              </div>
            </div>
          </div>
        </li>
        <li className="watchList-item">
          <div className="left">
            <video
              src="https://firebasestorage.googleapis.com/v0/b/netflix-76544.appspot.com/o/images%2F1657793609946-ANH%20T%C3%9A%20-%20%20Cho%20con%20tim%20m%E1%BB%99t%20l%C3%BD%20do%20%5BOFFICIAL%20MV%5D.mp4?alt=media&token=05e2bc5e-3f22-40a3-8e07-d2d1248595b6"
              autoPlay
              loop
              muted
              className="poster-video"
            />
          </div>
          <div className="right">
            <div className="info-container">
              <div className="publish-info">
                <span className="matching">93% Match</span>
                <span className="year">2019</span>
                <span className="type">MV</span>
                <span className="duration">120 mins</span>
              </div>
              <div className="category-info">
                <div className="cast">
                  <p>
                    <span>Cast:</span>
                    Anh Tu, Diem My, Hoai Linh, My Dung, Kim Chi
                  </p>
                </div>
                <div className="genre">
                  <p>
                    <span>Genre:</span>Romantic MV
                  </p>
                </div>
              </div>
              <div className="description-info">
                <p>
                  A beautiful love of a young couple. They fell in love with
                  each other since their first dating. They had been through
                  thick and thin. However, the boy gradually recognized that he
                  did not fully understand his girlfriend's intentions, leading
                  to unexpected conflicts in love. Eventually, his girlfriends
                  was so regretful as he passed away in a car accident.
                </p>
              </div>
            </div>
            <div className="btn-container">
              <div className="left-btn">
                <Button
                  className="btn-func-icon striking"
                  element="link"
                  // to={{ pathname: "/watch", movie: movieItem }}
                >
                  <PlayArrowIcon />
                  Play
                </Button>
              </div>
              <div className="right-btn">
                <Button
                  className={`btn-icon `}
                  // onClick={watchListHandler}
                >
                  <FavoriteIcon />
                </Button>
                <Button className="btn-icon">
                  <ThumbUpOffAltIcon />
                </Button>
                <Button className="btn-icon">
                  <ThumbDownOffAltIcon />
                </Button>
                <Button className="btn-icon">
                  <ExpandMoreIcon />
                </Button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default WatchList;
