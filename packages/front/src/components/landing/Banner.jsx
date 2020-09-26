import React, { useState } from "react";
import "../../css/banner.css";
import logo from "../../resources/petsoslogo.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Banner() {
  return (
    <header
      className="banner"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url("https://s2.best-wallpaper.net/wallpaper/2560x1600/1904/Dog-and-cat-friends-pets_2560x1600.jpg")`,
        backgroundPosition: 'center center',
      }}
    >
      <div className="banner__contents">
        <div className="title">
          <h1>Hi, we are</h1>
          <p>
            <img src={logo} alt="PetSos!" />
          </p>
        </div>
        <h2>The best locally-owned pet care</h2>
        <h3>
          We care for your <span className="changing-text"></span>
        </h3>

        <Link to="/signup">
          <button class="px-8 py-4 rounded-lg bg-orange-700 text-white-1000 text-xl font-semibold uppercase mt-8">
            Sign Up
          </button>
        </Link>
        <Link to="/login">
          <button class="px-8 py-4 rounded-lg bg-orange-700 text-white-1000 text-xl font-semibold uppercase ml-4 mt-8">
            Sign In
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Banner;
