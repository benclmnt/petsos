import React, { useState, useEffect } from "react";
import PetCard from "./PetCard";
import "./dashboard.css";
import Balance from "./Balance";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { client as fetch } from "../../utils/client";
import { useUser } from "../../context/auth-context";

function Dashboard() {
  const user = useUser();

  const [isLoaded, setIsLoaded] = useState(false);
  const [pets, setPets] = useState([]);

  useEffect(async () => {
    // GET request using fetch inside useEffect React hook
    const link = "/pets/getPetByPouname/" + user.username;
    const result = await fetch(link);
    console.log(user.username);
    setPets(Object.values(result));
    setIsLoaded(true);
  }, []);

  //const removed = pots.splice(1,1);
  const deletedPet = async (idx) => {
    const deleted = pets[idx];
    console.log(deleted.name);
    const link = "/pets/deletePetByPounameAndName";
    const body = {
      name: deleted.name,
      pouname: user.username,
    };
    try {
      const result = await fetch(link, {
        body: body,
        method: "DELETE",
        redirectTo: "/dashboard",
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
    window.location.reload(false);
  };

  let itemsToRender;
  if (isLoaded) {
    console.log(pets);
    itemsToRender = pets.slice(0, pets.length - 2).map((item) => {
      const index = pets.indexOf(item);
      return (
        <PetCard
          className="col-span-1"
          key={item.name}
          petName={item.name}
          deletePet={() => deletedPet(index)}
        />
      );
    });
  }

  return (
    <div className=" dashboard h-screen">
      <div className="flex flex-row justify-center pt-40  space-x-5">
        <div className="flex flex-col space-y-6">
          <div className="bg-white rounded-lg p-10 flex flex-row">
            <img
              src="https://www.flaticon.com/svg/static/icons/svg/21/21645.svg"
              className="m-auto"
              height="150"
              width="100"
            />
            <div className="flex items-center ml-5">
              <div>
                <h1>{user?.username || "Default User Name"}</h1>
                <a onClick={() => window.location.assign("/profile/edit")}>
                  Edit Profile
                </a>
              </div>
            </div>
          </div>

          <div>
            <Balance />
          </div>

          <Link to="/pastOrders">
            <div className="p-4 bg-white rounded-md font-semibold text-2xl">
              <img
                src="https://www.flaticon.com/svg/static/icons/svg/1751/1751700.svg"
                alt=""
                width="30"
                height="30"
                className="float-left mr-4"
              />{" "}
              View Past Orders
            </div>
          </Link>
        </div>
        <div className="flex flex-col w-1/3 self-stretch">
          <div className="bg-white rounded-lg px-8 py-8">
            <div>
              <div>
                <h1 className="text-3xl font-bold">Your Pets</h1>
                <h2 className="text-base font-medium opacity-50">
                  Add your pets or edit their info.
                </h2>
              </div>
            </div>
            <div class="mt-5 flex justify-start grid grid-cols-2 gap-4">
              {itemsToRender}
              <Link to="/myPets/add">
                <PetCard className="col-span-1" petName="Add new pet" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
