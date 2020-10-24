import React, { useState, useEffect } from "react";
import PetCard from "./PetCard";
import "./dashboard.css";
import Balance from "./Balance";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Dashboard() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch("/api/pets/getPetByPouname/:po1")
      .then((response) => response.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setPets(Object.values(data));
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  let itemsToRender;
  if (isLoaded) {
    console.log(pets);
    itemsToRender = pets.slice(0, pets.length - 2).map((item) => {
      const a = "/myPets/" + item.name + "/po1";
      return (
        <Link to={a}>
          <PetCard className="col-span-1" key={item.name} petName={item.name} />
        </Link>
      );
    });
  }

  return (
    <div className="flex flex-row justify-center items-center dashboard h-screen space-x-5">
      <div className="flex flex-col space-y-5">
        <div className="bg-white rounded-lg p-10 flex flex-row">
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/21/21645.svg"
            class="m-auto"
            height="150"
            width="100"
          />
          <div className="flex items-center ml-5">
            <div>
              <h1>User Name</h1>
              <a>Edit Profile</a>
            </div>
          </div>
        </div>

        <div>
          <Balance />
        </div>
      </div>

      <div className="flex flex-col w-2/5">
        <div className="bg-white rounded-lg p-5">
          <h1 class="text-3xl font-bold">Your Pets</h1>
          <h2 class="text-base font-medium opacity-50">
            Add your pets or edit their info.
          </h2>
          <div class="mt-5 flex justify-start grid grid-cols-2 gap-4">
            {itemsToRender}
            <Link to="/myPets/add/po1">
              <PetCard className="col-span-1" petName="Add new pet" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
