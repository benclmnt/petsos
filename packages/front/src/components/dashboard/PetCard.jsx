import React from 'react';
import './pet-card.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function PetCard({ petName, deletePet }) {
  // const link = "/myPets/" + petName;

  return (
    <div className="text-center pet-card--empty p-4 cursor-pointer">
      {petName !== 'Add new pet' ? (
        <button className="opacity-50 flex justify-end" onClick={deletePet}>
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/1345/1345823.svg"
            height="20"
            width="20"
          />
        </button>
      ) : null}

      {/* <Link to={link}> */}
      <img
        src="https://www.flaticon.com/svg/static/icons/svg/672/672716.svg"
        className="w-32 m-auto"
      />
      {/* </Link> */}
      <h1 className="text-lg mt-5">{petName}</h1>
    </div>
  );
}

export default PetCard;
