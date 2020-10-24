import React, { useState, useEffect } from "react";
import "../css/nav.css";
import logo from "../resources/petsoslogo.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", useEffect);
    };
  }, []);

  return (
    <div className={`nav ${show ? "nav_bg" : "nav"}`}>
      <img src={logo} class="w-1/3 object-scale-down md:w-auto md:h-12" />
      <div>
        <Link to="/">
          <button class="focus:outline-none mx-4">
            <h1 class="md:font-bold md:text-xl pt-1">Home</h1>
          </button>
        </Link>
        <Link to="/dashboard">
          <button class="focus:outline-none mx-4">
            <h1 class="md:font-bold md:text-xl pt-1">View Profile</h1>
          </button>
        </Link>
        <Link to="/searchSitters">
          <button class="focus:outline-none mx-4">
            <h1 class="md:font-bold md:text-xl pt-1">Search Sitters</h1>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Nav;
