import React, { useState } from "react";
import Dogs from "./Dogs";
import Cats from "./Cats";
import Others from "./Others";

function AnimalCapability(props) {
  console.log(props);
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState();
  const [capability, setCapability] = useState();

  function ShowBreed() {
    const currSpecies = species;
    console.log(species);
    switch (currSpecies) {
      case "dog":
        return <Dogs onChange={(value) => setBreed(value)} />;

      case "cat":
        return <Cats onChange={(value) => setBreed(value)} />;

      case "others":
        return <Others onChange={(value) => alert(value)} />;

      default:
        return <Dogs />;
    }
  }

  return (
    <div>
      <div class="md:flex md:items-center items-end">
        <div class="md:w-1/3">
          <div class="md:flex space-x-3 md:items-center mb-6">
            <select
              //onChange={(e) => setCapability(e.target.value)}
              class="border border-grey-light w-full p-3 rounded mb-4 block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
              name="caretaker_type"
              id="1"
            >
              <option
                onClick={(e) => {
                  props.onChange("dog");
                  setSpecies("dog");
                }}
              >
                Dog
              </option>
              <option
                onClick={(e) => {
                  props.onChange("cat");
                  setSpecies("cat");
                }}
              >
                Cat
              </option>
              <option
                onClick={(e) => {
                  props.onChange("others");
                  setSpecies("others");
                }}
              >
                Others
              </option>
            </select>
            <ShowBreed species={species} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimalCapability;
