import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PetCard from './PetCard';
import CTOverview from './CTOverview';
import './dashboard.css';
import { client as fetch } from '../../utils/client';
import { useUser } from '../../context/auth-context';
import bg from '../../resources/wallpaper2.jpg';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

function Dashboard() {
  const user = useUser();
  const basePetsAPILink = `/users/${user.username}/pets`;

  const [pets, setPets] = useState([]);
  const [rating, setRating] = useState();

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

  const receiptIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className="w-10 h-10 fill-current"
    >
      <rect x="86.588" y="472.785" width="331.294" height="37.647" />
      <path
        d="M311.843,169.726H195.765c-10.397,0-18.824,8.427-18.824,18.824s8.427,18.824,18.824,18.824h116.078
        c10.397,0,18.824-8.427,18.824-18.824S322.24,169.726,311.843,169.726z"
      />
      <path
        d="M399.686,257.569H195.765c-10.397,0-18.824,8.427-18.824,18.824s8.427,18.824,18.824,18.824h203.922
        c10.397,0,18.823-8.427,18.823-18.824S410.083,257.569,399.686,257.569z"
      />
      <path
        d="M500.907,3.86c-6.758-3.037-14.657-1.838-20.204,3.062l-52.712,46.632L375.216,6.363c-7.147-6.394-17.951-6.394-25.098,0
        l-52.706,47.134L244.7,6.363c-7.147-6.394-17.945-6.394-25.092,0l-52.775,47.191L114.121,6.922
        c-5.54-4.894-13.446-6.093-20.204-3.062c-6.751,3.043-11.093,9.757-11.093,17.161v335.059h-64C8.427,356.079,0,364.506,0,374.903
        v45.804c0,49.474,40.251,89.725,89.725,89.725v-37.647c-28.718,0-52.078-23.366-52.078-52.078v-26.98h294.902v26.98
        c0,49.474,40.251,89.726,89.725,89.726c49.474,0,89.725-40.251,89.725-89.725V21.02C512,13.616,507.658,6.903,500.907,3.86z
         M474.353,420.707c0,28.712-23.366,52.078-52.078,52.078s-52.078-23.366-52.078-52.078v-45.804
        c0-10.397-8.427-18.824-18.824-18.824H120.471V62.802l33.964,30.049c7.153,6.325,17.907,6.293,25.016-0.069l52.706-47.134
        l52.706,47.128c7.147,6.394,17.951,6.394,25.098,0l52.712-47.134l52.706,47.134c7.115,6.362,17.87,6.387,25.016,0.069
        l33.958-30.042V420.707z"
      />
    </svg>
  );

  return (
    <div className="h-screen">
      <img src={bg} className="min-h-screen bg-cover fixed p-0 z-0" />
      <div className="flex flex-col space-y-4 px-4 pb-8 md:flex-row justify-center pt-20 md:space-x-5 md:space-y-6 z-10">
        <div className="flex flex-col space-y-6 self-stretch z-10">
          <div className="bg-white rounded-lg px-10 py-6 flex flex-row z-10">
            <img
              src="https://www.flaticon.com/svg/static/icons/svg/21/21645.svg"
              className="m-auto w-20 h-20 mr-4"
            />
            <div className="flex items-center z-10">
              <div>
                <h1 className="pb-2 text-lg">
                  Welcome back,{' '}
                  <span className="font-semibold">
                    {user?.username || 'Default User Name'}
                  </span>
                  !
                </h1>
                {user.is_caretaker && (
                  <div className="flex space-x-2 mb-2">
                    <Box component="fieldset" borderColor="transparent">
                      <Rating
                        name="read-only"
                        precision={0.1}
                        value={parseFloat(rating)}
                        readOnly
                      />
                    </Box>
                    <h2>{rating}</h2>
                  </div>
                )}
                <div>
                  <Link to="/profile/edit">
                    <button className="font-semibold hover:text-orange-500">
                      Edit profile
                    </button>
                  </Link>
                </div>
                <div>
                  <Link
                    to={user.is_caretaker ? '/ctprofile/edit' : '/becomect'}
                  >
                    <button className="font-semibold hover:text-orange-500">
                      {user.is_caretaker
                        ? 'Edit caretaker profile'
                        : 'Become a caretaker'}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {user.is_caretaker && <CTOverview setRating={setRating} />}
        </div>
        <div className="flex flex-col space-y-4 w-auto md:w-1/3 self-stretch z-10">
          <div className="bg-white rounded-lg px-8 py-8">
            <div>
              <div>
                <h1 className="text-3xl font-bold">Your Pets</h1>
                <h2 className="text-base font-medium opacity-50">
                  Add your pets or edit their info!
                </h2>
              </div>
            </div>
            <div className="mt-5 justify-start grid md:grid-cols-3 grid-cols-2 gap-4">
              {pets?.map((pet, idx) => (
                <PetCard
                  className="col-span-1"
                  key={pet.name}
                  pet={pet}
                  deletePet={(e) => deletedPet(e, idx)}
                />
              ))}
              <Link to="/myPets/add">
                <PetCard className="col-span-1" />
              </Link>
            </div>
          </div>

          <div>
            <Link to="/profile/orders">
              <button className="flex space-x-4 p-4 border-2 rounded-lg shadow bg-orange-500 border-orange-500 hover:bg-orange-600 hover:border-orange-600 text-white font-semibold text-2xl duration-300 ease-in-out">
                {receiptIcon}
                <h1>View Past Orders</h1>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
