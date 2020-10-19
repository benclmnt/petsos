import React from "react";
import PetCard from "./PetCard";
import "./dashboard.css";
import Balance from "./Balance";

function Dashboard() {
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

      <div className="flex flex-col w-1/3">
        <div className="bg-white rounded-lg p-5">
          <h1 class="text-3xl font-bold">Your Pets</h1>
          <h2 class="text-base font-medium opacity-50">
            Add your pets or edit their info.
          </h2>
          <div class="mt-10 flex justify-start">
            <PetCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
