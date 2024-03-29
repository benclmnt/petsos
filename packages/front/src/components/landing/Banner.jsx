import React, { useState } from 'react';
import '../../css/banner.css';
import logo from '../../resources/petsoslogo.png';
import bg from '../../resources/wallpaper.jpg';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/auth-context';

function Banner() {
  const user = useUser();

  return (
    <header
      className="banner"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(${bg})`,
        backgroundPosition: 'center center',
      }}
    >
      <div className="text-center m-0 bg-black bg-opacity-75 w-full h-full flex justify-center items-center  md:justify-end lg:bg-transparent md:text-right md:pr-12 md:pt-8">
        <div>
          <div className="md:flex md:flex-end md:justify-end md:justify-items-end inline">
            <h1 className="text-5xl md:text-6xl md:text-right font-bold">
              Hi, we are
            </h1>
            <p>
              <img
                src={logo}
                alt="PetSos!"
                className="h-20 md:h-24 mx-auto my-4 md:ml-4"
              />
            </p>
          </div>
          <h2 className="text-xl md:text-4xl font-semibold">
            The best locally-owned pet care
          </h2>
          <h3 className="text-2xl md:text-3xl italic mt-8">
            We care for your <span className="changing-text"></span>
          </h3>

          {user == null && (
            <>
              <Link to="/signup">
                <button className="px-8 py-4 rounded-lg hover:bg-orange-500 hover:text-white text-orange-500 border border-orange-500 text-base md:text-xl font-semibold uppercase mt-8 duration-300 ease-in-out">
                  Sign Up
                </button>
              </Link>
              <Link to="/login">
                <button className="px-8 py-4 rounded-lg hover:bg-orange-500 hover:text-white text-orange-500 border border-orange-500 text-base md:text-xl font-semibold uppercase ml-4 mt-8 duration-300 ease-in-out">
                  Sign In
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Banner;
