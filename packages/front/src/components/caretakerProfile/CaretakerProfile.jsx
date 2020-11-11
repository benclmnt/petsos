import React, { useState, useEffect } from 'react';
import AvailabilityForm from './AvailabilityForm';
import CapabilityForm from './CapabilityForm';
import { Link } from 'react-router-dom';
import { client as fetch } from '../../utils/client';
import { useUser } from '../../context/auth-context';
import { toJSONLocal } from '../../utils/dateutils.js';
import bg from '../../resources/wallpaper2.jpg';
import '../searchcaretakers/ctprofile.css';

function CaretakerProfile() {
  const user = useUser();

  const [profile, setProfile] = useState(user);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const [capabilityList, setCapabilityList] = useState([]);
  const [availabilityList, setAvailabilityList] = useState([]);

  const [isEditingProfile, toggleIsEditingProfile] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchData = async () => {
    const getCapability = fetch(
      '/caretakers/' + user.username + '/capabilities'
    );
    const getAvailability = fetch(
      '/caretakers/' + user.username + '/availabilities'
    );
    // triggering 2 parallel requests then waiting for all of them to finish.
    const result = await Promise.all([getCapability, getAvailability]);
    setCapabilityList(result[0]);
    setAvailabilityList(result[1]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const commitmentType =
    profile.ct_type === 'part-time' ? 'Part-Time' : 'Full-Time';

  const commitmentForm = (
    <select
      onChange={(e) => handleChange(e)}
      required="required"
      className="border border-gray-300 w-full py-2 px-3 rounded mb-4 text-gray-500 font-bold"
      name="ct_type"
      defaultValue={profile.ct_type}
      id="0"
    >
      <option value="" disabled>
        Select commitment
      </option>
      <option value="part-time">Part-time</option>
      <option value="full-time">Full-time</option>
    </select>
  );

  const userCapability = (
    <div className="grid grid-cols-2">
      <div>
        <h1 className="font-semibold text-lg">Dogs</h1>
        {capabilityList
          .filter((capability) => capability.species === 'dog')
          .map((capability, i) => (
            <div key={i}>
              {capability.breed}, {capability.size}
            </div>
          ))}
      </div>

      <div>
        <h1 className="font-semibold text-lg">Cats</h1>
        {capabilityList
          .filter((capability) => capability.species === 'cat')
          .map((capability, i) => (
            <div key={i}>
              {capability.breed}, {capability.size}
            </div>
          ))}
      </div>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update caretaker data
    const url = '/caretakers/' + user.username;

    const data = {
      ctuname: user.username,
      ct_type: profile.ct_type,
    };

    try {
      const editedUser = await fetch(url, {
        body: data,
        method: 'PATCH',
      });
      console.log(editedUser);
    } catch (error) {
      console.error(error);
      setErrorMsg(error.error);
      return;
    }

    // Update capabilities
    try {
      await fetch('/caretakers/' + user.username + '/capabilities', {
        body: { ctuname: user.username },
        method: 'DELETE',
      });
      setErrorMsg('');
    } catch (error) {
      console.error(error);
      setErrorMsg(error.error);
      return;
    }

    for (let i = 0; i < capabilityList.length; i++) {
      const capability = {
        pc_species: capabilityList[i]['species'],
        pc_breed: capabilityList[i]['breed'],
        pc_size: capabilityList[i]['size'],
        ctuname: user.username,
      };

      try {
        const capabResults = await fetch('/caretakers/capability', {
          body: capability,
        });
        console.log(capabResults);
      } catch (err) {
        console.error(err);
        setErrorMsg(err.error);
      }
    }

    // Update availabilities
    try {
      await fetch('/caretakers/' + user.username + '/availabilities', {
        body: { ctuname: user.username },
        method: 'DELETE',
      });
      setErrorMsg('');
    } catch (error) {
      console.error(error);
      setErrorMsg(error.error);
    }

    for (let i = 0; i < availabilityList.length; i++) {
      const availability = {
        ctuname: user.username,
        start_date: availabilityList[i].start_date,
        end_date: availabilityList[i].end_date,
      };

      try {
        const availResults = await fetch('/caretakers/availability', {
          body: availability,
        });
        console.log(availResults);
      } catch (err) {
        console.error(err);
        setErrorMsg(err.error);
      }

      toggleIsEditingProfile(false);
    }
  };

  return (
    <div className="min-h-screen">
      <img src={bg} className="min-h-screen object-cover fixed p-0 behind" />
      <div className="flex flex-col items-center pt-20 w-full mx-auto text-lg text-white">
        <h1 className="text-center font-bold uppercase text-3xl">
          {user.username}
        </h1>
        <div>
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
        className="md:w-1/2 mx-auto p-5 flex justify-items-center flex-col space-y-4"
      >
        <div className="flex flex-col space-y-8 md:px-32">
          <div className="bg-white rounded-lg shadow-lg py-6 px-8 ">
            <h1 className="text-2xl font-semibold mb-4 py-2 border-b-2 border-orange-900">
              Commitment
            </h1>
            {isEditingProfile ? commitmentForm : <h2>{commitmentType}</h2>}
          </div>

          <div className="bg-white rounded-lg shadow-lg py-6 px-8 ">
            <h1 className="text-2xl font-semibold mb-4 py-2 border-b-2 border-orange-900">
              Capabilities
            </h1>
            {isEditingProfile ? (
              <CapabilityForm
                capabilityList={capabilityList}
                setCapabilityList={setCapabilityList}
              />
            ) : (
              userCapability
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg py-6 px-8 ">
            <h1 className="text-2xl font-semibold mb-4 py-2 border-b-2 border-orange-900">
              Availabilities
            </h1>
            <div>
              {isEditingProfile ? (
                <AvailabilityForm
                  availabilityList={availabilityList}
                  setAvailabilityList={setAvailabilityList}
                />
              ) : (
                availabilityList.map((availability, i) => (
                  <div key={i}>
                    {toJSONLocal(availability.start_date)} to{' '}
                    {toJSONLocal(availability.end_date)}
                  </div>
                ))
              )}
            </div>
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

export default CaretakerProfile;
