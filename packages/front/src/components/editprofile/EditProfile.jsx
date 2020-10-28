import React, { useState } from "react";
import { Link } from "react-router-dom";
import Address from "./Address";
import PersonalProfile from "./PersonalProfile";
import PhotoAndEmail from "./PhotoAndEmail";
import "./nav.css";
import "../Nav";
import { client as fetch } from "../../utils/client";
import { useAuth, useUser } from "../../context/auth-context";

function EditProfile(props) {
  const user = useUser();
  const authClient = useAuth();

  const [profile, setProfile] = useState(user);

  const [isEditingProfile, toggleIsEditingProfile] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "/users/" + user.username;

    try {
      const editedUser = await fetch(url, {
        body: profile,
        method: "PATCH",
      });
      console.log(editedUser);
      authClient.updateUser(editedUser);
      toggleIsEditingProfile(false);
    } catch (err) {
      setErrorMsg(err.error);
      return;
    }
  };

  const profileView = (
    <div class="grid grid-cols-2 w-1/2 align-middle">
      <h1 class="font-bold">Username:</h1>
      <h1>{profile.username}</h1>
      <h1 class="font-bold">Email:</h1>
      <h1>{profile.email}</h1>
    </div>
  );

  const editProfileForm = (
    <div class="grid grid-cols-2 w-1/2 space-y-2">
      <h1 class="font-bold">Username:</h1>
      <h1>{profile.username}</h1>
      <label class="font-bold">Email:</label>
      <input
        type="text"
        placeholder={profile.email}
        className="border border-grey-light w-auto px-4 py-2 rounded mb-4 block md:text-left md:mb-0 pr-4"
        onChange={handleChange}
      ></input>
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="pt-20 mx-64 flex justify-center flex-col"
    >
      <h1 className="font-bold text-2xl text-center">
        Let's start with the basics
      </h1>

      <div class="mx-auto py-2 text-lg">
        <button
          class="py-2 px-5 hover:text-orange-500 font-bold border-none inline-block"
          onClick={(e) => {
            e.preventDefault();
            toggleIsEditingProfile(!isEditingProfile);
          }}
        >
          {!isEditingProfile ? "Edit info" : "Cancel"}
        </button>
        <button class="py-2 px-5 hover:text-green-500 font-bold border-none inline-block left-auto">
          <Link to="/dashboard">Back to Dashboard</Link>
        </button>
      </div>

      <div class="flex flex-col space-y-8">
        <div class="md:mx-48 text-left">
          <h1 className="text-2xl font-semibold mb-4">Profile</h1>
          {isEditingProfile ? editProfileForm : profileView}
        </div>
        <Address
          editProfile={isEditingProfile}
          address={profile}
          handleChange={handleChange}
        />
        {/* <PhotoAndEmail />
        <PersonalProfile /> */}
        {isEditingProfile && (
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
