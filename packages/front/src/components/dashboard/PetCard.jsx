import React from "react";
import "./pet-card.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function PetCard({ petName }) {
  return (
    <div class="pet-card--empty">
      <button>
        <img
          src="https://www.flaticon.com/svg/static/icons/svg/672/672716.svg"
          class="w-32 m-auto"
        />
        <h1 class="text-lg mt-5">{petName}</h1>
      </button>
    </div>
  );
}

export default PetCard;
