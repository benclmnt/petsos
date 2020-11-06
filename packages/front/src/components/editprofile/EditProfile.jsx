import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Address from './Address';
import './nav.css';
import '../Nav';
import { client as fetch } from '../../utils/client';
import { useAuth, useUser } from '../../context/auth-context';

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
    <div className="grid grid-cols-2 w-1/2 align-middle">
      <h1 className="font-bold">Username:</h1>
      <h1>{profile.username}</h1>
      <h1 className="font-bold">Email:</h1>
      <h1>{profile.email}</h1>
      <h1 className="font-bold">Credit Card:</h1>
      <h1>{profile.credit_card}</h1>
    </div>
  );

  const editProfileForm = (
    <div className="grid grid-cols-2 w-1/2 space-y-2">
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
    <form
      onSubmit={handleSubmit}
      className="pt-20 mx-64 flex justify-center flex-col"
    >
      <h1 className="font-bold text-2xl text-center">
        Let's start with the basics
      </h1>

      <div className="mx-auto py-2 text-lg">
        <button
          className="py-2 px-5 hover:text-orange-500 font-bold border-none inline-block"
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

      <div className="flex flex-col space-y-8">
        <div className="md:mx-48 text-left">
          <h1 className="text-2xl font-semibold mb-4">Profile</h1>
          {isEditingProfile ? editProfileForm : profileView}
        </div>
        <Address
          editProfile={isEditingProfile}
          address={profile}
          handleChange={handleChange}
        />

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
