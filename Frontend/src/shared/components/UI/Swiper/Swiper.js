import React from "react";
import Swiper from "react-id-swiper";

import "./Swiper.scss";

const SimpleSwiperWithParams = (props) => {
  const params = {
    slidesPerView: 5,
    spaceBetween: 10,
    loop: true,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };

  return (
    <Swiper {...params}>
      <div>Slide #1</div>
      <div>Slide #2</div>
      <div>Slide #3</div>
      <div>Slide #4</div>
      <div>Slide #5</div>
      <div>Slide #6</div>
      <div>Slide #7</div>
      <div>Slide #8</div>
    </Swiper>
  );
};

export default SimpleSwiperWithParams;
