import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import './addPet.css';
import header from '../../resources/dogs-cats-header.jpg';
import { client as fetch } from '../../utils/client';
import { useUser } from '../../context/auth-context';
import { getAllPetCategories } from '../../utils/fetchutils';

function MyPets() {
  const [isEdit, setIsEdit] = useState('');
  const [pets, setPets] = useState({
    species: '',
    breed: '',
    size: '',
  });
  const [petCategories, setPetCategories] = useState([]);
  const { name } = useParams();
  const user = useUser();
  const [petSpReq, setSpReq] = useState([{ description: '' }]);

  const basePetsAPIUrl = `/users/${user.username}/pets`;

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    async function fetchData() {
      const result = await fetch(basePetsAPIUrl + `/${name}`); // Note to Drake: This will fail if creating new pet (?)
      setPets(result);
      const result2 = await fetch(`/users/${user.username}/specialReq/${name}`);
      setIsEdit(true);
      let temp = Object.values(result2);
      setSpReq(temp.slice(0, temp.length - 2));
    }
    async function fetchCategories() {
      const _tmp = await getAllPetCategories();
      console.log(_tmp);
      setPetCategories(_tmp);
    }
    if (name !== 'add') {
      fetchData();
    }
    fetchCategories();
  }, []);

  console.log(petCategories);
  // Special requirements
  const handleSpecialReqChange = (name, value, index) => {
    const list = [...petSpReq];
    list[index][name] = value;
    setSpReq(list);
  };

  const addSpecialReq = () => {
    setSpReq([...petSpReq, { description: '' }]);
  };

  const removeSpecialReq = (index) => {
    const list = [...petSpReq];
    list.splice(index, 1);
    setSpReq(list);
  };

  const PetSpReqPicker = (index) => {
    return (
      <textarea
        selected={petSpReq[index]['description']}
        required="required"
        className="block border border-grey-light p-3 rounded mb-4 w-full"
        value={petSpReq[index]['description']}
        name="Special requirements"
        placeholder="Insert any special requirements (allergy, daily walks, pet food, etc.)"
        rows="2"
        onChange={(e) =>
          handleSpecialReqChange('description', e.target.value, index)
        }
      />
    );
  };

  const handleChange = (e) => {
    console.log(e.currentTarget.name);
    console.log(e.currentTarget.value);
    setPets({
      ...pets,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isSuccess = true;
    try {
      const result = await fetch(basePetsAPIUrl + (isEdit ? `/${name}` : ''), {
        body: pets,
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }

    try {
      const result = await fetch(`/users/${user.username}/specialReq`, {
        body: {
          petname: name,
        },
        method: 'DELETE',
      });
      console.log(result);
      setPets(result.pets);
    } catch (error) {
      console.error(error);
    }

    for (let i = 0; i < petSpReq.length; i++) {
      const specialReq = {
        petname: pets.name,
        description: petSpReq[i]['description'],
      };
      try {
        const result = await fetch(`/users/${user.username}/specialReq`, {
          body: specialReq,
        });
      } catch (err) {
        console.error(err);
        isSuccess = false;
      }
    }

    if (isSuccess === true) {
      window.location.assign('/dashboard');
    }
  };

  const dogIcon = (
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-current"
    >
      <path d="m510.361 484.122c-10.951-25.554-36.077-42.122-63.879-42.122h-26.472v15c0 20.962-7.643 40.163-20.269 55h92.237c14.359 0 24.039-14.681 18.383-27.878z" />
      <path d="m362.03 295.43c-18.815-27.964-45.392-49.221-76.776-61.426-40.68-15.82-70.481-49.775-81.238-91.125-8.085 4.788-17.491 7.445-27.486 7.445-1.742 0-3.516-.083-5.271-.248-25.052-2.362-44.489-20.648-48.373-45.502l-3.555-22.748c-1.279-8.185 4.319-15.857 12.504-17.136 8.179-1.279 15.856 4.319 17.136 12.504l3.555 22.748c1.757 11.243 10.212 19.198 21.541 20.266.821.077 1.652.116 2.463.116 10.346 0 18.961-6.13 22.485-15.998l11.01-30.827c.012-.034.029-.065.041-.099 5.963-16.796 3.4-35.51-6.869-50.082-10.289-14.601-27.095-23.318-44.957-23.318h-45.545c-15.463 0-30.296 6.562-40.697 18.003l-33.634 36.997h-23.105c-2.26 0-4.52.419-6.565 1.38-5.457 2.565-8.694 7.926-8.694 13.62v45c0 19.253 15.728 34.954 35.06 35 12.949.031 23.624 9.977 24.827 22.619l-3.608 9.754c-16.737 45.238-11.568 96.098 13.721 137.006v135.191c-16.569 0-30 13.431-30 30v12.43c0 8.284 6.716 15 15 15h74.99v-222c0-8.284 6.716-15 15-15s15 6.716 15 15v222h20.01v-30c0-24.813 20.187-45 45-45h16.507c6.969-34.191 37.274-60 73.493-60 8.284 0 15 6.716 15 15s-6.716 15-15 15c-24.813 0-45 20.187-45 45 0 8.284-6.716 15-15 15h-30c-8.271 0-15 6.729-15 15v30h125c30.376 0 55-24.624 55-55v-68.389c0-33.128-9.476-65.694-27.97-93.181z" />
    </svg>
  );

  const catIcon = (
    <svg
      enable-background="new 0 0 511.108 511.108"
      viewBox="0 0 511.108 511.108"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-current"
    >
      <path
        id="XMLID_75_"
        d="m397.526 314.366h64.766v-30h-64.766c-35.104 0-63.664 28.56-63.664 63.664v2.087c0 35.104 28.56 63.664 63.664 63.664h1.103c18.562 0 33.664 15.102 33.664 33.664s-15.102 33.664-33.664 33.664h-83.174l-19.021-165.444c-.136-35.055-20.765-87.053-60.077-118.962-1.71-1.386-3.381-2.863-4.966-4.391-15.747-15.172-20.451-38.579-11.984-59.631 3.559-8.848 5.364-18.171 5.364-27.709v-1.541c0-18.498-7.203-35.889-20.286-48.972-8.14-8.131-17.734-16.003-32.679-18.996-4.012-5.881-11.477-16.216-21.164-24.088-14.113-11.468-28.908-14.333-42.795-8.285l-4.453 1.94 10.157 49.846c-9.202 7.024-51.58 35.514-51.58 35.514l5.597 28.586.157.435c1.184 3.274 4.563 16.146 9.493 21.279 2.647 2.753 6.874 5.216 12.921 7.529 10.479 4.008 16.439 14.813 14.172 25.691-11.529 55.349-22.785 111.006-22.785 130.352v115.332h46.59v-108.013h30v35.238c12.083-8.846 26.964-14.084 43.052-14.084h15v30h-15c-23.739 0-43.052 19.313-43.052 43.052v41.12h-77.2c-17.729 0-32.101 14.372-32.101 32.101 0 17.729 14.372 32.101 32.101 32.101h317.712c35.104 0 63.664-28.56 63.664-63.664s-28.56-63.664-63.664-63.664h-1.103c-18.562 0-33.664-15.102-33.664-33.664v-2.087c.002-18.563 15.103-33.664 33.665-33.664z"
      />
    </svg>
  );

  const largeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 441.23 441.23"
      className="fill-current"
    >
      <path
        d="M440.651,132.739c-0.888-2.354-2.721-4.229-5.054-5.171L396.39,111.75c-2.435-12.666-12.056-22.81-24.436-26.008
    l-2.115-24.363c-0.309-3.565-2.701-6.608-6.093-7.751c-3.391-1.142-7.137-0.167-9.541,2.484l-10.062,11.099l-6.22-21.766
    c-1.072-3.752-4.44-6.386-8.341-6.521c-3.924-0.139-7.444,2.258-8.773,5.928L274.34,173.047c0,0-172.127,8.035-172.199,8.039
    c-35.296,2.121-68.735-16.765-85.167-48.119c-2.309-4.402-7.748-6.102-12.149-3.794c-4.403,2.308-6.101,7.747-3.794,12.149
    c14.69,28.03,40.708,47.75,70.541,54.93c-3.097,3.609-9.751,12.554-13.642,26.617c-4.231,15.291-5.756,39.667,9.801,70.619
    L42.499,327.76c-1.474,2.001-2.054,4.523-1.603,6.968l11.105,60.218c0.787,4.268,4.51,7.367,8.851,7.367h11.312
    c2.669,0,5.2-1.185,6.911-3.233c1.71-2.05,2.422-4.753,1.944-7.378l-7.032-38.627l74.401-55.853c0.131-0.099-0.126,0.107,0,0
    c7.114-5.975,12.278-12.556,15.972-19.322c38.777,6.808,91.844,16.02,125.857,21.498l14.986,95.314
    c0.689,4.377,4.46,7.602,8.891,7.602h9.308c4.971,0,9-4.029,9-9V296.56c8.449-5.77,11.469-15.42,13.472-24.871
    c0.063-0.297,20.022-92.416,20.022-92.416c3.762,0.627,7.561,0.956,11.388,0.956c26.356,0,50.492-15.431,62.987-40.271
    C441.401,137.712,441.539,135.094,440.651,132.739z"
      />
    </svg>
  );

  const medIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 392.747 392.747"
      className="fill-current"
    >
      <path
        d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
    c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
    c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
    c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
    h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
    c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
    c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
    c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
    c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
    c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
      />
    </svg>
  );

  const smallIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 444.851 444.851"
      className="fill-current"
    >
      <path
        d="M422.48,339.224l1-5.229c0.468-2.447-0.099-4.979-1.567-6.992c-1.467-2.013-3.703-3.328-6.176-3.632l-54.965-6.75
      l-21.309-28.007c0.849-1.475,4.553-7.711,4.553-7.711c13.045,11.556,29.114,17.462,45.494,17.462
      c15.906,0,32.106-5.571,46.108-16.944c1.953-1.586,3.153-3.918,3.309-6.429c0.155-2.511-0.747-4.973-2.489-6.788L407.164,237.7
      c2.972-12.551-1.642-25.747-11.622-33.741l8.061-23.088c1.18-3.378,0.246-7.135-2.379-9.567c-2.624-2.432-6.44-3.079-9.721-1.647
      l-13.729,5.997l3.253-22.402c0.566-3.9-1.47-7.714-5.025-9.414c-3.556-1.699-7.802-0.888-10.481,2.002l-70.676,76.238
      L42.836,130.263c-19.589-7.165-29.696-28.931-22.531-48.519c3.471-9.489,10.43-17.059,19.594-21.314
      c9.165-4.256,19.437-4.688,28.926-1.217c4.668,1.709,9.836-0.693,11.544-5.36c1.708-4.668-0.692-9.836-5.36-11.544
      c-14.003-5.123-29.165-4.484-42.69,1.796C18.793,50.384,8.523,61.556,3.401,75.56c-10.575,28.911,4.342,61.033,33.252,71.607
      l12.743,4.661c-0.192,0.494,0.195-0.505,0,0c-3.856,6.74-9.415,18.695-12.141,31.414c-4.255,19.859-3.679,48.905,21.782,76.93
      l-27.321,66.89c-0.798,1.954-0.884,4.126-0.243,6.137l21.207,66.505c1.202,3.769,4.699,6.266,8.568,6.266
      c0.377,0,0.758-0.023,1.14-0.072l12.793-1.625c2.648-0.336,5.01-1.83,6.448-4.079c1.438-2.248,1.804-5.02,0.999-7.564
      l-15.102-47.738l57.207-51.315l53.734,30.76c0.107,0.062-0.11-0.057,0,0c22.221,11.604,45.66,17.916,67.785,17.916
      c7.715,0,15.197-0.732,22.391-2.154l42.466,48.756c1.503,1.726,3.607,2.814,5.885,3.043l71.603,7.213
      c0.306,0.031,0.609,0.046,0.91,0.046c4.27,0,8.014-3.033,8.831-7.31l1-5.229c0.468-2.447-0.099-4.979-1.567-6.992
      c-1.467-2.013-3.703-3.328-6.176-3.632l-53.875-6.616l-24.307-50.016c1.396-1.123,2.766-2.284,4.107-3.483l17.727,20.352
      c1.503,1.726,3.607,2.814,5.885,3.044l71.604,7.213c0.306,0.031,0.609,0.046,0.91,0.046
      C417.919,346.535,421.662,343.502,422.48,339.224z"
      />
      <path
        d="M430.238,357.555c-8.057,0-14.612,6.555-14.612,14.612c0,8.057,6.555,14.612,14.612,14.612
      c8.057,0,14.612-6.555,14.612-14.612C444.851,364.11,438.296,357.555,430.238,357.555z"
      />
    </svg>
  );

  const petBtn =
    'p-2 m-2 md:px-6 md:py-2 border border-current rounded-lg transition-all duration-300 opacity-25 transform hover:scale-105 hover:text-orange-500 hover:opacity-100 focus:outline-none';

  return (
    <div className="flex flex-col space-y-4">
      <img src={header} width="100%" />
      <section className="flex justify-center px-4">
        <div className="lg:w-1/2 w-full border rounded bg-white shadow px-8 py-6">
          <h1 className="font-bold">Tell us a bit about your pet.</h1>
          <h2 className="mb-4">What type of pet?</h2>
          <div className="flex justify-center">
            <button
              className={
                pets.species === 'dog'
                  ? petBtn + ' w-1/4 text-orange-500 opacity-100 scale-105'
                  : petBtn + ' w-1/4'
              }
              name="species"
              value="dog"
              onClick={handleChange}
            >
              {dogIcon}
              <h3 className="mt-2">Dog</h3>
            </button>
            <button
              className={
                pets.species === 'cat'
                  ? petBtn + ' w-1/4 text-orange-500 opacity-100 scale-105'
                  : petBtn + ' w-1/4'
              }
              name="species"
              value="cat"
              onClick={handleChange}
            >
              {catIcon}
              <h3 className="mt-2">Cat</h3>
            </button>
          </div>
        </div>
      </section>

      <section className="flex justify-center px-4">
        <div className="lg:w-1/2 w-full border rounded bg-white shadow px-8 py-6">
          <div className="lg:flex md:block">
            <div className="mr-8 mb-2">
              <h1 className="font-semibold">Pet Name</h1>
              <input
                type="text"
                name="name"
                defaultValue={pets.name}
                onChange={handleChange}
                required
                placeholder="Pet Name"
                className="border border-grey-light w-full md:w-auto p-3 rounded mb-4 block text-gray-500 font-bold md:text-left md:mb-0 pr-4 capitalize"
              />
            </div>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold">Breed</h1>
            <select
              onChange={handleChange}
              name="breed"
              value={pets ? pets.breed : 'Error'}
              required
              className="border border-grey-light w-full md:w-auto p-3 rounded mb-4 block text-gray-500 font-bold md:text-left md:mb-0 pr-4 capitalize"
            >
              <option value="" disabled>
                Select breed
              </option>
              {petCategories[pets.species]?.map((item, idx) => (
                <option value={item} key={idx}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h1 className="font-semibold">Size</h1>
            <h2>Choose your pet size!</h2>
            <div className="text-center transform scale-110 md:scale-100">
              <button
                className={
                  pets.size === 'small'
                    ? petBtn + ' w-1/5 text-orange-500 scale-105 opacity-100'
                    : petBtn + ' w-1/5'
                }
                name="size"
                value="small"
                onClick={handleChange}
              >
                {smallIcon}
                <h3 className="mt-2 text-sm md:text-base">Small</h3>
              </button>
              <button
                className={
                  pets.size === 'medium'
                    ? petBtn + ' w-1/4 text-orange-500 scale-105 opacity-100'
                    : petBtn + ' w-1/4'
                }
                name="size"
                value="medium"
                onClick={handleChange}
              >
                {medIcon}
                <h3 className="mt-2 text-sm md:text-base">Medium</h3>
              </button>
              <button
                className={
                  pets.size === 'large'
                    ? petBtn + ' w-1/3 scale-105 text-orange-500 opacity-100'
                    : petBtn + ' w-1/3'
                }
                name="size"
                value="large"
                onClick={handleChange}
              >
                {largeIcon}
                <h3 className="mt-2 text-sm md:text-base">Large</h3>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Special Requirements */}
      <div className="flex justify-center px-4">
        <div className="lg:w-1/2 w-full border rounded bg-white shadow px-8 py-6">
          <h1 className="font-semibold mb-2">Special requirements</h1>
          <div>
            {petSpReq.length < 1 ? (
              <div className="flex space-x-4">
                <textarea
                  required="required"
                  className="block border border-grey-light p-3 rounded mb-4 w-full"
                  value=""
                  name="Special requirements"
                  placeholder="Insert any special requirements (allergy, daily walks, pet food, etc.)"
                  rows="2"
                  onChange={(e) =>
                    handleSpecialReqChange('description', e.target.value, 0)
                  }
                />
                <div className="flex justify-items-end">
                  <button onClick={addSpecialReq}>
                    <svg
                      className="h-8 w-8"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 30 30"
                      fill="#0fa30a"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              petSpReq.map((ignore, i) => {
                return (
                  <div className="flex space-x-4" key={i}>
                    {PetSpReqPicker(i)}

                    <div className="flex justify-items-end">
                      {petSpReq.length > 1 && (
                        <button onClick={(i) => removeSpecialReq(i)}>
                          <svg
                            className="h-8 w-8"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 30 30"
                            fill="#b82727"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      )}
                      {petSpReq.length - 1 === i && (
                        <button onClick={addSpecialReq}>
                          <svg
                            className="h-8 w-8"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 30 30"
                            fill="#0fa30a"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <section className="flex justify-center ">
        <div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="border border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white text-orange-500 font-semibold text-lg px-8 py-4 m-2 duration-500 ease-in-out "
          >
            {isEdit ? 'Edit Pet' : 'Add Pet'}
          </button>

          <button
            onClick={useHistory().goBack}
            className="font-semibold text-lg px-8 py-4 m-2 border border-red-600 hover:bg-red-600 rounded-lg hover:text-white text-red-600  duration-500 ease-in-out "
          >
            Cancel
          </button>
        </div>
      </section>
    </div>
  );
}

export default MyPets;
