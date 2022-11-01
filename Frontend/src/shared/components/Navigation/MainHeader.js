import { useState } from "react";

import "./MainHeader.scss";

const MainHeader = (props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <header className={`main-header ${isScrolled && "scrolled"}`}>
      {props.children}
    </header>
  );
};

export default MainHeader;
