import React, { useState, useEffect } from "react";
import "../css/nav.css";
import logo from "../resources/petsoslogo.png";

function Nav() {
  const [show, handleShow] = useState([]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });

    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show && "nav_bg"}`}>
      <img src={logo} />
      <a href="/index.html"><h1>Home</h1></a>
    </div>
  );
}

export default Nav;
