import React from 'react';
import Button from '../button';
import '../../css/banner.css';
import logo from '../../resources/petsoslogo.png';

function banner() {
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

        <Button>Sign up</Button>
        <Button>Sign in</Button>
      </div>
    </header>
  );
}

export default banner;
