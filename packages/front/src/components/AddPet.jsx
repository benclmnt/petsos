import React, { useState } from "react";
import "../css/addPet.css";
import header from "../resources/dogs-cats-header.png";

function AddPet() {
  const [showOther, setShowOther] = useState(false);
  const [petName, setPetName] = useState("");
  const [petSex, setPetSex] = useState("Nan");
  const [petBreed, setPetBreed] = useState("Nan");
  const [petSize, setPetSize] = useState("Nan");
  const [petType, setPetType] = useState("");
  const [petSpReq, setSpReq] = useState("");
  const [petBtnDog, setPetBtnDog] = useState("petBtn");
  const [petBtnCat, setPetBtnCat] = useState("petBtn");
  const [petBtnOther, setPetBtnOther] = useState("petBtn");
  const [petBtnSm, setPetBtnSm] = useState("petBtn-sm");
  const [petBtnMed, setPetBtnMed] = useState("petBtn");
  const [petBtnLg, setPetBtnLg] = useState("petBtn-lg");

  const retrieve = (data) => {
    data.preventDefault();
    setPetType(data.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: petName,
      pouname: "po1",
      species: petType,
      breed: petBreed,
      size: petSize,
    };

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("api/users/addNewPet", option)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="addPet">
      <form action="" onSubmit={onSubmit}>
        <img src={header} width="100%" />
        <section class="flex justify-center p-6">
          <div class="lg:w-1/2 w-full p-6 border rounded bg-white shadow">
            <h1 class="font-bold">Tell us a bit about your pet.</h1>
            <h2 class="mb-4">What type of pet?</h2>
            <div class="flex justify-center">
              <button
                class={petBtnDog}
                value="Dog"
                onClick={(e) => {
                  setShowOther(false);
                  setPetType("Dog");
                  setPetBtnDog(
                    "petBtn-toggle m-2 w-1/4 px-6 py-2 border border-black rounded transition-all duration-300 opacity-100"
                  );
                  setPetBtnCat("petBtn");
                  setPetBtnOther("petBtn");
                }}
              >
                <img
                  alt="Dog"
                  src="https://www.flaticon.com/svg/static/icons/svg/3135/3135506.svg"
                />
                <h3 class="mt-2">Dog</h3>
              </button>
              <button
                class={petBtnCat}
                value="Cat"
                onClick={(e) => {
                  setShowOther(false);
                  setPetType("Cat");
                  setPetBtnDog("petBtn");
                  setPetBtnCat(
                    "petBtn-toggle m-2 w-1/4 px-6 py-2 border border-black rounded transition-all duration-300 opacity-100"
                  );
                  setPetBtnOther("petBtn");
                }}
              >
                <img
                  alt="Cat"
                  src="https://www.flaticon.com/svg/static/icons/svg/3135/3135379.svg"
                />
                <h3 class="mt-2">Cat</h3>
              </button>
              <button
                class={petBtnOther}
                onClick={(e) => {
                  setShowOther(!showOther);
                  setPetBtnDog("petBtn");
                  setPetBtnCat("petBtn");
                  setPetBtnOther(
                    "petBtn-toggle m-2 w-1/4 px-6 py-2 border border-black rounded transition-all duration-300 opacity-100"
                  );
                }}
              >
                <img
                  alt="Others"
                  src="https://www.flaticon.com/svg/static/icons/svg/3135/3135369.svg"
                />
                <h3 class="mt-2">Others</h3>
              </button>
            </div>

            {showOther ? (
              <div class="mt-4">
                <h1 class="font-semibold">Pet Category</h1>
                <input
                  type="text"
                  name="Pet Category"
                  value={petType}
                  placeholder="Pet Category"
                  onChange={(e) => setPetType(e.target.value)}
                />
              </div>
            ) : null}
          </div>
        </section>

        <section class="flex justify-center p-6">
          <div class="lg:w-1/2 w-full p-6 border rounded bg-white shadow">
            <div class="lg:flex md:block">
              <div class="mr-8 mb-2">
                <h1 class="font-semibold">Pet Name</h1>
                <input
                  type="text"
                  name="Pet Name"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  placeholder="Pet Name"
                />
              </div>
              <div class="mb-2">
                <h1 class="font-semibold mb-1">Sex</h1>
                <input
                  type="radio"
                  value="Male"
                  name="gender"
                  onClick={(e) => setPetSex(e.target.value)}
                />{" "}
                &nbsp;Male &nbsp;&nbsp;
                <input
                  type="radio"
                  value="Female"
                  name="gender"
                  onClick={(e) => setPetSex(e.target.value)}
                />{" "}
                &nbsp;Female &nbsp;&nbsp;
                <input
                  type="radio"
                  value="Other"
                  name="gender"
                  onClick={(e) => setPetSex(e.target.value)}
                />{" "}
                &nbsp;N/A &nbsp;&nbsp;
              </div>
            </div>
            <div class="mb-2">
              <h1 class="font-semibold">Breed</h1>
              <select onChange={(e) => setPetBreed(e.target.value)}>
                <option value="Siberian">Hoho</option>
                <option value="Alaskan">Hoho</option>
                <option value="Slama">Hoho</option>
                <option value="MLalal">Hoho</option>
              </select>
            </div>
            <div>
              <h1 class="font-semibold">Size</h1>
              <h2>Choose your pet size!</h2>
              <div class="text-center">
                <button
                  class={petBtnSm}
                  onClick={(e) => {
                    setPetSize("small");
                    setPetBtnSm(
                      "petBtn-toggle m-2 w-1/5 px-6 py-2 border border-black rounded transition-all duration-300 opacity-100"
                    );
                    setPetBtnMed("petBtn");
                    setPetBtnLg("petBtn-lg");
                  }}
                >
                  <img
                    alt="Small"
                    src="https://www.flaticon.com/svg/static/icons/svg/2881/2881761.svg"
                  />
                  <h3 class="mt-2">Small</h3>
                </button>
                <button
                  class={petBtnMed}
                  onClick={(e) => {
                    setPetSize("medium");
                    setPetBtnSm("petBtn-sm");
                    setPetBtnMed(
                      "petBtn-toggle m-2 w-1/4 px-6 py-2 border border-black rounded transition-all duration-300 opacity-100"
                    );
                    setPetBtnLg("petBtn-lg");
                  }}
                >
                  <img
                    alt="Medium"
                    src="https://www.flaticon.com/svg/static/icons/svg/2965/2965396.svg"
                    style={{ transform: "scaleX(-1)" }}
                  />
                  <h3 class="mt-2">Medium</h3>
                </button>
                <button
                  class={petBtnLg}
                  onClick={(e) => {
                    setPetSize("large");
                    setPetBtnSm("petBtn-sm");
                    setPetBtnMed("petBtn");
                    setPetBtnLg(
                      "petBtn-toggle m-2 w-1/3 px-6 py-2 border border-black rounded transition-all duration-300 opacity-100"
                    );
                  }}
                >
                  <img
                    alt="Large"
                    src="https://www.flaticon.com/svg/static/icons/svg/91/91544.svg"
                  />
                  <h3 class="mt-2">Large</h3>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section class="flex justify-center p-6">
          <div class="lg:w-1/2 p-6 border rounded bg-white shadow">
            <label>
              <h1 class="font-semibold mb-2">Special requirements</h1>
              <textarea
                class="block border border-grey-light p-3 rounded mb-4 w-full"
                value={petSpReq}
                name="Special requirements"
                placeholder="Insert any special requirements (allergy, daily walks, pet food, etc.)"
                rows="5"
                onChange={(e) => setSpReq(e.target.value)}
              />
              <h2 class="opacity-50 text-sm text-center">
                Be sure to include your pet's typical meal and potty schedule,
                how much you feed them, and any medication instructions.
              </h2>
            </label>
          </div>
        </section>

        <section class="flex justify-center p-6">
          <div>
            <button
              type="submit"
              class="border border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white text-orange-500 font-semibold text-lg px-8 py-4 m-2 duration-500 ease-in-out "
            >
              Add Pet
            </button>
            <button class="font-semibold text-lg px-8 py-4 m-2 border border-red-600 hover:bg-red-600 rounded-lg hover:text-white text-red-600  duration-500 ease-in-out ">
              Cancel
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}

export default AddPet;
