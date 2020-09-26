import React, { useState } from "react";
import "../css/addPet.css";
import header from "../resources/dogs-cats-header.png";

function AddPet() {
  const [showOther, setShowOther] = useState(false);
  const [selectType, setSelectType] = useState(false);

  return (
    <div className="addPet">
      <img src={header} width="100%" />
      <section class="flex justify-center p-6">
        <div class="lg:w-1/2 w-full p-6 border rounded bg-white shadow">
          <h1 class="font-bold">Tell us a bit about your pet.</h1>
          <h2 class="mb-4">What type of pet?</h2>
          <div class="text-center">
            <button
              class="petBtn"
              onClick={() => {
                setShowOther(false);
                setSelectType(true);
              }}
            >
              <img
                alt="Dog"
                src="https://www.flaticon.com/svg/static/icons/svg/3135/3135506.svg"
              />
              <h3 class="mt-2">Dog</h3>
            </button>
            <button
              class="petBtn"
              onClick={() => {
                setShowOther(false);
                setSelectType(true);
              }}
            >
              <img
                alt="Cat"
                src="https://www.flaticon.com/svg/static/icons/svg/3135/3135379.svg"
              />
              <h3 class="mt-2">Cat</h3>
            </button>
            <button
              class="petBtn"
              onClick={() => {
                setShowOther(true);
                setSelectType(true);
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
                placeholder="Pet Category"
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
              <input type="text" name="Pet Name" placeholder="Pet Name" />
            </div>
            <div class="mb-2">
              <h1 class="font-semibold mb-1">Sex</h1>
              <input type="radio" value="Male" name="gender" /> Male
              <input
                type="radio"
                value="Female"
                name="gender"
                class="ml-2 mr-1"
              />
              Female
              <input
                type="radio"
                value="Other"
                name="gender"
                class="ml-2 mr-1"
              />
              N/A
            </div>
          </div>
          <div class="mb-2">
            <h1 class="font-semibold">Breed</h1>
            <select>
              <option value="">Hoho</option>
              <option value="">Hoho</option>
              <option value="">Hoho</option>
              <option value="">Hoho</option>
            </select>
          </div>
          <div>
            <h1 class="font-semibold">Size</h1>
            <h2>Choose your pet size!</h2>
            <div class="text-center">
              <button class="petBtn-sm">
                <img
                  alt="Small"
                  src="https://www.flaticon.com/svg/static/icons/svg/2881/2881761.svg"
                />
                <h3 class="mt-2">Small</h3>
              </button>
              <button class="petBtn">
                <img
                  alt="Medium"
                  src="https://www.flaticon.com/svg/static/icons/svg/2965/2965396.svg"
                  style={{ transform: "scaleX(-1)" }}
                />
                <h3 class="mt-2">Medium</h3>
              </button>
              <button class="petBtn-lg">
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
              name="Special requirements"
              placeholder="Insert any special requirements (allergy, daily walks, pet food, etc.)"
              rows="5"
            />
            <h2 class="opacity-50 text-sm text-center">
              Be sure to include your pet's typical meal and potty schedule, how
              much you feed them, and any medication instructions.
            </h2>
          </label>
        </div>
      </section>

      <section class="flex justify-center p-6">
        <div>
          <button className="confirm-button">Add Pet</button>
          <button className="cancel-button">Cancel</button>
        </div>
      </section>
    </div>
  );
}

export default AddPet;
