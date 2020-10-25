import React from "react";

function AnimalCapability({ species, setSpecies, breed, setBreed, setSize }) {
  var breedOptions;

  var makeOptions = () => (
    <select
      class="border border-grey-light w-auto p-3 rounded mb-4 block text-gray-500 font-bold md:text-left md:mb-0 pr-4"
      name="pet_breed"
      id="2"
      required="required"
      onChange={(e) => setBreed(e.target.value)}
      value={breed}
    >
      <option value="" disabled selected>
        Select breed
      </option>
      {breedOptions.map((x, y) => (
        <option key={y}>{x}</option>
      ))}
    </select>
  );

  function ShowBreed() {
    switch (species) {
      case "dog":
        breedOptions = ["doggy", "husky"];
        return makeOptions();

      case "cat":
        breedOptions = ["kitty", "morganissa"];
        return makeOptions();

      default:
        return null;
    }
  }

  return (
    <div class="flex space-x-4 mb-4">
      {/* Size */}
      <select
        class="border border-grey-light w-1/5 p-3 rounded mb-4 block text-gray-500 font-bold md:text-left md:mb-0 pr-4"
        name="pet_size"
        id="3"
        required="required"
        onChange={(e) => setSize(e.target.value)}
      >
        <option value="" disabled selected>
          Select size
        </option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="big">Large</option>
      </select>

      {/* Species */}
      <select
        class="border border-grey-light w-1/4 p-3 rounded mb-4 block text-gray-500 font-bold md:text-left md:mb-0 pr-4"
        name="pet_species"
        id="1"
        required="required"
        onChange={(e) => setSpecies(e.target.value)}
      >
        <option value="" disabled selected>
          Select species
        </option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="others">Others</option>
      </select>

      <ShowBreed />
    </div>
  );
}

export default AnimalCapability;
