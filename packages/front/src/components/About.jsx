import React from "react";
import "../css/about.css";

function About() {
  return (
    <div className="about">
      <h1>Services for every kind of pet</h1>

      <div className="about__contents">
        <div className="services">
          <ul>
            <img
              src="https://www.flaticon.com/svg/static/icons/svg/3069/3069175.svg"
              width="80px"
            />
            <div className="desc">
              <h2>Boarding</h2>
              <h3>
                Need to travel without your pet? <br />
                Worry not we'll keep them safe and happy!
              </h3>
            </div>
          </ul>
          <ul>
            <img
              src="https://www.flaticon.com/svg/static/icons/svg/609/609803.svg"
              width="80px"
            />
            <div className="desc">
              <h2>House-sitting</h2>
              <h3>
                Excellent house-sitting services provided by our best
                caretakers.
              </h3>
            </div>
          </ul>
          <ul>
            <img
              src="https://www.flaticon.com/svg/static/icons/svg/3048/3048408.svg"
              width="80px"
            />
            <div className="desc">
              <h2>Daily walks</h2>
              <h3>
                Too busy to take your pet our for walks? <br />
                We have caretakers who'll do that for you!
              </h3>
            </div>
          </ul>
        </div>

        <div className="trusted_caretakers">
          <div className="trusted_caretakers__title">
            <img
              src="https://www.flaticon.com/svg/static/icons/svg/744/744922.svg"
              //   src="https://www.flaticon.com/svg/static/icons/svg/3068/3068103.svg"
              width="50px"
            />
            <h2>Book with caretakers you can trust!</h2>
          </div>
          <ul>
            <img src="https://www.coussins.co.uk/wp-content/uploads/2018/04/Tick-Orange.png" />
            <h3>View ratings for every sitter</h3>
          </ul>
          <ul>
            <img src="https://www.coussins.co.uk/wp-content/uploads/2018/04/Tick-Orange.png" />
            <h3>Detailed profile and personal information of our caretakers</h3>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
