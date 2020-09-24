import React from "react";
import "../../css/review.css";

function Review() {
  return (
    <div className="review">
      <div
        className="review__content"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_1600/https://www.clubpets.com.sg/wp-content/uploads/2019/08/pet-hacks-5-dog-breeds-unsuitable-for-first-time-pet-owners-2.jpg)`,
          backgroundPosition: "center center",
        }}
      ></div>

      <div className="review__content--text">
        <hr></hr>
        <h1>
          My PetSos caretaker sent me updates throughout the day and took care
          of my dog as if she were her own.{" "}
          <span className="quote">– Florence</span>
        </h1>
        <h2>Singapore, SG</h2>
      </div>
    </div>
  );
}

export default Review;
