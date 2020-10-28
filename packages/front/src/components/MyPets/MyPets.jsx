import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router";
import "./addPet.css";
import header from "../../resources/dogs-cats-header.png";
import { client as fetch } from "../../utils/client";
import { useUser } from "../../context/auth-context";

function MyPets({ pet }) {
  const [isLoaded, setIsLoaded] = useState("");
  const [petName, setPetName] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petSize, setPetSize] = useState("");
  const [petType, setPetType] = useState("");
  const [petSpReq, setSpReq] = useState("");
  const [pets, setPets] = useState([]);
  const { name } = useParams();
  const user = useUser();

  let buttonPet = "Add Pet";
  let linkfetch = "/pets/addNewPet";

  useEffect(async () => {
    // GET request using fetch inside useEffect React hook
    if (name != "Add new pet") {
      const link = "/pets/getPetByPounameAndName/" + user.username + "/" + name;
      const result = await fetch(link);
      setPets(Object.values(result)[0]);
      setPetName(name);
      setIsLoaded(true);
    }
  }, []);

  if (isLoaded) {
    console.log("haha");
    console.log(pets);
    console.log(petName);
    buttonPet = "Edit Pet";
  }

  if (name != "Add new pet") {
    linkfetch = "/pets/updatePetInformation";
  }
  //setPetName(pets.name);
  //setPetBreed(pets.breed);

  const onSubmit = async (e) => {
    console.log(user.username);

    const body = {
      name: petName,
      pouname: user.username,
      species: petType,
      breed: petBreed,
      size: petSize,
    };

    try {
      console.log(linkfetch);
      const result = await fetch(linkfetch, {
        body: body,
        redirectTo: "/dashboard",
      });
      console.log("hhaha");
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
                petType == "Dog"
                  ? "petBtn-toggle m-2 w-1/4 px-6 py-2 border border-black rounded transition-all duration-300 opacity-100"
                  : "petBtn"
              }
              value="Dog"
              onClick={(e) => {
                setPetType("Dog");
              }}
            >
              <img
                alt="Dog"
                src="https://www.flaticon.com/svg/static/icons/svg/3135/3135506.svg"
              />
              <h3 className="mt-2">Dog</h3>
            </button>
            <button
              className={
                petType == "Cat"
                  ? "petBtn-toggle m-2 w-1/4 px-6 py-2 border border-black rounded transition-all duration-300 opacity-100"
                  : "petBtn"
              }
              value="Cat"
              onClick={(e) => {
                setPetType("Cat");
              }}
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
                name="Pet Name"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="Pet Name"
                disabled={name != "Add new pet"}
              />
            </div>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold">Breed</h1>
            <select onChange={(e) => setPetBreed(e.target.value)}>
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
                  petSize == "small"
                    ? "petBtn-toggle m-2 w-1/5 px-6 py-2 border border-black rounded transition-all duration-300 opacity-100"
                    : "petBtn-sm"
                }
                onClick={(e) => {
                  setPetSize("small");
                }}
              >
                <img
                  alt="Small"
                  src="https://www.flaticon.com/svg/static/icons/svg/2881/2881761.svg"
                />
                <h3 className="mt-2">Small</h3>
              </button>
              <button
                className={
                  petSize == "medium"
                    ? "petBtn-toggle m-2 w-1/4 px-6 py-2 border border-black rounded transition-all duration-300 opacity-100"
                    : "petBtn"
                }
                onClick={(e) => {
                  setPetSize("medium");
                }}
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
                  petSize == "large"
                    ? "petBtn-toggle m-2 w-1/3 px-6 py-2 border border-black rounded transition-all duration-300 opacity-100"
                    : "petBtn-lg"
                }
                onClick={(e) => {
                  setPetSize("large");
                }}
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
            onClick={onSubmit}
            className="border border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white text-orange-500 font-semibold text-lg px-8 py-4 m-2 duration-500 ease-in-out "
          >
            {buttonPet}
          </button>

          <button className="font-semibold text-lg px-8 py-4 m-2 border border-red-600 hover:bg-red-600 rounded-lg hover:text-white text-red-600  duration-500 ease-in-out ">
            Cancel
          </button>
        </div>
      </section>
    </div>
  );
}

export default MyPets;
