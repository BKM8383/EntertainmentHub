import React from "react";
import "./Header.css";
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const id = location.state ? location.state.id : '';

  return (
    <>
      <span onClick={() => window.scrollTo(0, 0)} className="header">
        🎬 Entertainment Hub 🎥
      </span>
      <span>
        {id}
      </span>
    </>
  );
};

export default Header;