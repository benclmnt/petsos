import React from "react";
import "../../css/dashboard.css";
import PetCard from "./PetCard";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="nav-bg"></div>
      <div className="dashboard__contents">
        <div className="profile">
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/21/21645.svg"
            class="m-auto"
          />
          <h1>User Name</h1>
          <a>Edit Profile</a>
        </div>

        <div className="pets">
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
