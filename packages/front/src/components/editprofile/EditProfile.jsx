import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Address from './Address';
import { client as fetch } from '../../utils/client';
import { useAuth, useUser } from '../../context/auth-context';
import bg from '../../resources/wallpaper2.jpg';

function EditProfile() {
  const user = useUser();
  const authClient = useAuth();

  const [profile, setProfile] = useState(user);

  const [isEditingProfile, toggleIsEditingProfile] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = '/users/' + user.username;

    try {
      // Update user data
      const editedUser = await fetch(url, {
        body: profile,
        method: 'PATCH',
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
    <div className="grid grid-cols-2 align-middle">
      <h1 className="font-bold">Username:</h1>
      <h1>{profile.username}</h1>
      <h1 className="font-bold">Email:</h1>
      <h1>{profile.email}</h1>
      <h1 className="font-bold">Credit Card:</h1>
      <h1>{profile.credit_card}</h1>
    </div>
  );

  const editProfileForm = (
    <div className="grid grid-cols-2 space-y-2">
      <h1 className="font-bold">Username:</h1>
      <h1>{profile.username}</h1>
      <label className="font-bold">Email:</label>
      <input
        type="text"
        name="email"
        placeholder={profile.email}
        className="border border-grey-light w-auto px-4 py-2 rounded mb-4 block md:text-left md:mb-0 pr-4"
        onChange={handleChange}
      ></input>
      <label className="font-bold">Credit card:</label>
      <input
        type="text"
        name="credit_card"
        placeholder={profile.credit_card}
        className="border border-grey-light w-auto px-4 py-2 rounded mb-4 block md:text-left md:mb-0 pr-4"
        onChange={handleChange}
      ></input>
    </div>
  );

  return (
    <div className="min-h-screen text-center">
      <img src={bg} className="min-h-screen object-cover fixed p-0 behind" />
      <div className="pt-20 text-white">
        <h1 className="font-bold text-3xl text-center">
          Let's start with the basics
        </h1>

        <div className="mx-auto py-2 text-lg">
          <button
            className="py-2 px-5 hover:text-orange-500 font-bold border-none inline-block focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              toggleIsEditingProfile(!isEditingProfile);
            }}
          >
            {!isEditingProfile ? 'Edit info' : 'Cancel'}
          </button>
          <button className="py-2 px-5 hover:text-green-500 font-bold border-none inline-block left-auto">
            <Link to="/dashboard">Back to Dashboard</Link>
          </button>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="md:w-1/3 m-auto p-4 flex justify-items-center flex-col text-center"
      >
        <div className="flex flex-col space-y-8 mt-4 text-left">
          <div className="text-left bg-white rounded-lg shadow-lg px-10 py-6">
            <h1 className="text-2xl font-semibold mb-4 py-2 border-b-2 border-orange-900">
              Profile
            </h1>
            {isEditingProfile ? editProfileForm : profileView}
          </div>
          <div className="bg-white rounded-lg shadow-lg px-10 py-6">
            <Address
              editProfile={isEditingProfile}
              address={profile}
              handleChange={handleChange}
            />
          </div>
          {isEditingProfile && (
            <button
              type="submit"
              className="px-8 py-4 rounded-lg bg-orange-500 text-white border border-orange-500 text-base md:text-xl font-semibold uppercase hover:bg-orange-600 hover:border-orange-600 duration-300 ease-in-out"
            >
              Save & Continue
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
