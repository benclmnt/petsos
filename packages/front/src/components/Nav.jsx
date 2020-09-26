import React, { useState, useEffect } from "react";
import "../css/nav.css";
import logo from "../resources/petsoslogo.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
      <Link to="/">
        <button>
          <h1>Home</h1>
        </button>
      </Link>
    </div>
  );
}

export default Nav;
