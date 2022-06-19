import React from "react";
import MovieList from "../components/MovieList/MovieList";
import FeatureOption from "../components/Feature/FeatureOtp";
import Navbar from "../../shared/components/Navigation/Navbar/Navbar";
import "./HomePage.scss";

const Home = (props) => {
  return (
    <div className="home">
      <Navbar />
      <FeatureOption type={props.type} />
      <MovieList />
      <MovieList />
      <MovieList />
      <MovieList />
    </div>
  );
};

export default Home;
