import React, { useState } from "react";
import Address from "./Address";
import PersonalProfile from "./PersonalProfile";
import PhotoAndEmail from "./PhotoAndEmail";
import "./nav.css";
import "../Nav";
import { client as fetch } from "../../utils/client";
import { useUser } from "../../context/auth-context";

function EditProfile() {
  const user = useUser();
  const [profile, setProfile] = useState({
    username: user.username,
    email: user.email,
  });
  const [editProfile, setEditProfile] = useState(false);

  const profileView = (
    <div class="grid grid-cols-2 w-1/2 align-middle">
      <h1 class="font-bold">Username:</h1>
      <h1>{user.username}</h1>
      <h1 class="font-bold">Email:</h1>
      <h1>{user.email}</h1>
    </div>
  );

  const editProfileForm = (
    <div class="grid grid-cols-2 w-1/2 space-y-2">
      <label class="font-bold">Username:</label>
      <input
        type="text"
        placeholder={profile.username}
        className="border border-grey-light w-auto px-4 py-2 rounded mb-4 block md:text-left md:mb-0 pr-4"
        onChange={(e) =>
          setEditProfile({ username: e.target.value, email: profile.email })
        }
      ></input>
      <label class="font-bold">Email:</label>
      <input
        type="text"
        placeholder={profile.email}
        className="border border-grey-light w-auto px-4 py-2 rounded mb-4 block md:text-left md:mb-0 pr-4"
        onChange={(e) =>
          setEditProfile({ username: profile.username, email: e.target.value })
        }
      ></input>
    </div>
  );

  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="pt-20 mx-64 flex justify-center flex-col"
    >
      <h1 className="font-bold text-2xl text-center">
        Let's start with the basics
      </h1>

      <button
        class="text-xl py-8 hover:text-orange-500 font-bold"
        onClick={(e) => {
          e.preventDefault();
          setEditProfile(true);
        }}
      >
        Edit info
      </button>

      <div class="flex flex-col space-y-8">
        <div class="md:mx-48 text-left">
          <h1 className="text-2xl font-semibold mb-4">Profile</h1>
          {editProfile ? editProfileForm : profileView}
        </div>
        <Address user={user} editProfile={editProfile} />
        {/* <PhotoAndEmail />
        <PersonalProfile /> */}
        {editProfile && (
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-4 rounded-lg hover:bg-orange-500 hover:text-white text-orange-500 border border-orange-500 text-base md:text-xl font-semibold uppercase ml-4 mt-8 duration-300 ease-in-out"
            >
              Save & Continue
            </button>
          </div>
        )}
      </div>
    </form>
  );
}

export default EditProfile;
