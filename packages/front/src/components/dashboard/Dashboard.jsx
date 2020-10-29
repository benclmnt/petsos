import React, { useState, useEffect } from 'react';
import PetCard from './PetCard';
import './dashboard.css';
import Balance from './Balance';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { client as fetch } from '../../utils/client';
import { useUser } from '../../context/auth-context';

function Dashboard() {
  const user = useUser();
  const basePetsAPILink = `/users/${user.username}/pets`;

  const [pets, setPets] = useState([]);

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    async function fetchData() {
      const result = await fetch(basePetsAPILink);
      console.log(result);
      setPets(result);
    }

    fetchData();
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
    <div className=" dashboard h-screen">
      <div className="flex flex-row justify-center items-center pt-40  space-x-5">
        <div className="flex flex-col space-y-6 self-stretch">
          <div className="bg-white rounded-lg p-10 flex flex-row">
            <img
              src="https://www.flaticon.com/svg/static/icons/svg/21/21645.svg"
              className="m-auto"
              height="150"
              width="100"
            />
            <div className="flex items-center ml-5">
              <div>
                <h1 className="py-3">
                  Welcome back, {user?.username || 'Default User Name'}!
                </h1>
                <Link to="/profile/edit">
                  <button className="w-full text-center hover:bg-orange-400 py-3 px-4 border border-orange-500 rounded">
                    Edit profile
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div>
            <Balance />
          </div>
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
