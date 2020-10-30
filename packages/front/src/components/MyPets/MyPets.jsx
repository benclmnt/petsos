import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import "./addPet.css";
import header from "../../resources/dogs-cats-header.png";
import { client as fetch } from "../../utils/client";
import { useUser } from "../../context/auth-context";

function MyPets() {
  const [isEdit, setIsEdit] = useState("");
  const [petSpReq, setSpReq] = useState("");
  const [pets, setPets] = useState({});
  const { name } = useParams();
  const user = useUser();

  const basePetsAPIUrl = `/users/${user.username}/pets`;

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    async function fetchData() {
      const result = await fetch(basePetsAPIUrl + `/${name}`); // Note to Drake: This will fail if creating new pet (?)
      console.log(result);
      setPets(result);
      setIsEdit(true);
    }
    if (name != "add") {
      fetchData();
    }
  }, []);

  const handleChange = (e) => {
    console.log(e.currentTarget.name);
    console.log(e.currentTarget.value);
    setPets({
      ...pets,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  console.log(pets);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await fetch(basePetsAPIUrl + (isEdit ? `/${name}` : ""), {
        body: pets,
        redirectTo: "/dashboard",
      });
      console.log(result);
    } catch (error) {
      console.error(error);
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
                pets.species == "dog"
                  ? "petBtn-toggle m-2 w-1/4 px-6 py-2 border border-black rounded transition-all duration-300 opacity-100"
                  : "petBtn"
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
                pets.species == "cat"
                  ? "petBtn-toggle m-2 w-1/4 px-6 py-2 border border-black rounded transition-all duration-300 opacity-100"
                  : "petBtn"
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
              <option value="Siberian">Siberian</option>
              <option value="Alaskan">Alaskan</option>
              <option value="Golden Retriever">Golden Retriever</option>
              <option value="French Bulldog">French Bulldog</option>
            </select>
          </div>
          <div>
            <h1 className="font-semibold">Size</h1>
            <h2>Choose your pet size!</h2>
            <div className="text-center">
              <button
                className={
                  pets.size === "small"
                    ? "petBtn-toggle m-2 w-1/5 px-6 py-2 border border-black rounded transition-all duration-300 opacity-100"
                    : "petBtn-sm"
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
                  pets.size === "medium"
                    ? "petBtn-toggle m-2 w-1/4 px-6 py-2 border border-black rounded transition-all duration-300 opacity-100"
                    : "petBtn"
                }
                name="size"
                value="medium"
                onClick={handleChange}
              >
                <img
                  alt="Medium"
                  src="https://www.flaticon.com/svg/static/icons/svg/2965/2965396.svg"
                  style={{ transform: "scaleX(-1)" }}
                />
                <h3 className="mt-2">Medium</h3>
              </button>
              <button
                className={
                  pets.size === "large"
                    ? "petBtn-toggle m-2 w-1/3 px-6 py-2 border border-black rounded transition-all duration-300 opacity-100"
                    : "petBtn-lg"
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

      <section className="flex justify-center p-6">
        <div className="lg:w-1/2 p-6 border rounded bg-white shadow">
          <label>
            <h1 className="font-semibold mb-2">Special requirements</h1>
            <textarea
              className="block border border-grey-light p-3 rounded mb-4 w-full"
              value={petSpReq}
              name="Special requirements"
              placeholder="Insert any special requirements (allergy, daily walks, pet food, etc.)"
              rows="5"
              onChange={(e) => setSpReq(e.target.value)}
            />
            <h2 className="opacity-50 text-sm text-center">
              Be sure to include your pet's typical meal and potty schedule, how
              much you feed them, and any medication instructions.
            </h2>
          </label>
        </div>
      </section>

      <section className="flex justify-center p-6">
        <div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="border border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white text-orange-500 font-semibold text-lg px-8 py-4 m-2 duration-500 ease-in-out "
          >
            {isEdit ? "Edit Pet" : "Add Pet"}
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
