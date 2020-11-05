import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import './addPet.css';
import header from '../../resources/dogs-cats-header.png';
import { client as fetch } from '../../utils/client';
import { useUser } from '../../context/auth-context';
import { getAllPetCategories } from '../../utils/fetchutils';

function MyPets() {
  const [isEdit, setIsEdit] = useState('');
  const [pets, setPets] = useState({});
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
      fetchCategories();
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

  return (
    <div className="addPet">
      <img src={header} width="100%" />
      <section className="flex justify-center p-6">
        <div className="lg:w-1/2 w-full p-6 border rounded bg-white shadow">
          <h1 className="font-bold">Tell us a bit about your pet.</h1>
          <h2 className="mb-4">What type of pet?</h2>
          <div className="flex justify-center">
            <button
              className={
                pets.species === 'dog'
                  ? 'petBtn-toggle m-2 w-1/4 px-6 py-2 border border-black rounded transition-all duration-300 opacity-100'
                  : 'petBtn'
              }
              name="species"
              value="dog"
              onClick={handleChange}
            >
              <img
                alt="Dog"
                src="https://www.flaticon.com/svg/static/icons/svg/3135/3135506.svg"
              />
              <h3 className="mt-2">Dog</h3>
            </button>
            <button
              className={
                pets.species === 'cat'
                  ? 'petBtn-toggle m-2 w-1/4 px-6 py-2 border border-black rounded transition-all duration-300 opacity-100'
                  : 'petBtn'
              }
              name="species"
              value="cat"
              onClick={handleChange}
            >
              <img
                alt="Cat"
                src="https://www.flaticon.com/svg/static/icons/svg/3135/3135379.svg"
              />
              <h3 className="mt-2">Cat</h3>
            </button>
          </div>
        </div>
      </section>

      <section className="flex justify-center p-6">
        <div className="lg:w-1/2 w-full p-6 border rounded bg-white shadow">
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
              />
            </div>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold">Breed</h1>
            <select
              onChange={handleChange}
              name="breed"
              value={pets.breed}
              required
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
            <div className="text-center">
              <button
                className={
                  pets.size === 'small'
                    ? 'petBtn-toggle m-2 w-1/5 px-6 py-2 border border-black rounded transition-all duration-300 opacity-100'
                    : 'petBtn-sm'
                }
                name="size"
                value="small"
                onClick={handleChange}
              >
                <img
                  alt="Small"
                  src="https://www.flaticon.com/svg/static/icons/svg/2881/2881761.svg"
                />
                <h3 className="mt-2">Small</h3>
              </button>
              <button
                className={
                  pets.size === 'medium'
                    ? 'petBtn-toggle m-2 w-1/4 px-6 py-2 border border-black rounded transition-all duration-300 opacity-100'
                    : 'petBtn'
                }
                name="size"
                value="medium"
                onClick={handleChange}
              >
                <img
                  alt="Medium"
                  src="https://www.flaticon.com/svg/static/icons/svg/2965/2965396.svg"
                  style={{ transform: 'scaleX(-1)' }}
                />
                <h3 className="mt-2">Medium</h3>
              </button>
              <button
                className={
                  pets.size === 'large'
                    ? 'petBtn-toggle m-2 w-1/3 px-6 py-2 border border-black rounded transition-all duration-300 opacity-100'
                    : 'petBtn-lg'
                }
                name="size"
                value="large"
                onClick={handleChange}
              >
                <img
                  alt="Large"
                  src="https://www.flaticon.com/svg/static/icons/svg/91/91544.svg"
                />
                <h3 className="mt-2">Large</h3>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Special Requirements */}
      <div className="flex justify-center p-6">
        <div className="lg:w-1/2 p-6 border rounded bg-white shadow">
          <h1 className="font-semibold mb-2">Special requirements</h1>
          <div>
            {petSpReq.map((ignore, i) => {
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
            })}
          </div>
        </div>
      </div>

      <section className="flex justify-center p-6">
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
