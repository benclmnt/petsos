import React, { useState } from "react";
import Dogs from "./Dogs";
import Cats from "./Cats";
import Others from "./Others";

function AnimalCapability() {
  const [species, setSpecies] = useState("dog");
  const [breed, setBreed] = useState("dogBreed");
  const [capability, setCapability] = useState();

  function ShowBreed(props) {
    const currSpecies = props.species;
    switch (currSpecies) {
      case "dog":
        return <Dogs />;

      case "cat":
        return <Cats />;

      case "others":
        return <Others />;

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
              onChange={(e) => setCapability(e.target.value)}
              class="border border-grey-light w-full p-3 rounded mb-4 block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
              name="caretaker_type"
              id="1"
            >
              <option onClick={() => setSpecies("dog")} value="dog">
                Dog
              </option>
              <option onClick={() => setSpecies("cat")} value="cat">
                Cat
              </option>
              <option onClick={() => setSpecies("others")} value="others">
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
