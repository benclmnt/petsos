import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PetCard from './PetCard';
import CTOverview from './CTOverview';
import './dashboard.css';
import { client as fetch } from '../../utils/client';
import { useUser } from '../../context/auth-context';
import bg from '../../resources/wallpaper2.jpg';

function Dashboard() {
  const user = useUser();
  const basePetsAPILink = `/users/${user.username}/pets`;

  const [pets, setPets] = useState([]);

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    async function fetchUserData() {
      const result = await fetch(basePetsAPILink);
      setPets(result);
    }

    fetchUserData();
  }, []);

  const deletedPet = async (e, idx) => {
    e.preventDefault();
    try {
      const result = await fetch(basePetsAPILink, {
        body: {
          name: pets[idx].name,
        },
        method: 'DELETE',
      });
      console.log(result);
      setPets(result.pets);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen">
      <img src={bg} className="min-h-screen bg-cover fixed p-0 z-0" />
      <div className="flex flex-col  md:flex-row justify-center items-center pt-40 md:space-x-5 space-y-6 z-10">
        <div className="flex flex-col space-y-6 self-stretch z-10">
          <div className="bg-white rounded-lg p-10 flex flex-row z-10">
            <img
              src="https://www.flaticon.com/svg/static/icons/svg/21/21645.svg"
              className="m-auto"
              height="150"
              width="100"
            />
            <div className="flex items-center ml-5 z-10">
              <div>
                <h1 className="py-3">
                  Welcome back, {user?.username || 'Default User Name'}!
                </h1>
                <Link to="/profile/edit">
                  <button className="w-full text-center hover:bg-orange-400 py-3 px-4 border border-orange-500 rounded">
                    Edit profile
                  </button>
                </Link>
                {user.is_caretaker && (
                  <Link to="/ctprofile/edit">
                    <button className="w-full text-center hover:bg-orange-400 py-3 px-4 border border-orange-500 rounded">
                      Edit caretaker profile
                    </button>
                  </Link>
                )}
                {!user.is_caretaker && (
                  <Link to="/becomect">
                    <button className="w-full text-center hover:bg-orange-400 py-3 px-4 border border-orange-500 rounded">
                      Become a caretaker
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
          {user.is_caretaker && <CTOverview />}

          <Link to="/profile/orders">
            <div className="p-4 bg-white rounded-md font-semibold text-2xl">
              <img
                src="https://www.flaticon.com/svg/static/icons/svg/1751/1751700.svg"
                alt=""
                width="30"
                height="30"
                className="float-left mr-4"
              />{' '}
              View Past Orders
            </div>
          </Link>
        </div>
        <div className="flex flex-col w-auto md:w-1/3 self-stretch z-10">
          <div className="bg-white rounded-lg px-8 py-8">
            <div>
              <div>
                <h1 className="text-3xl font-bold">Your Pets</h1>
                <h2 className="text-base font-medium opacity-50">
                  Add your pets or edit their info.
                </h2>
              </div>
            </div>
            <div className="mt-5 justify-start grid grid-cols-2 gap-4">
              {pets?.map((pet, idx) => (
                <PetCard
                  className="col-span-1"
                  key={pet.name}
                  petName={pet.name}
                  deletePet={(e) => deletedPet(e, idx)}
                />
              ))}
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
