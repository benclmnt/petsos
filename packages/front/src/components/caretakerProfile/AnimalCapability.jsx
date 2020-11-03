import React from "react";

function AnimalCapability(props) {
  return (
    <div className="flex space-x-4 mb-4 w-full">
      {/* Size */}
      <select
        className="border border-grey-light w-1/5 p-3 rounded mb-4 block text-gray-500 font-bold md:text-left md:mb-0 pr-4"
        name="size"
        required="required"
        onChange={(e) => props.setCapability(e)}
        defaultValue={props.capability.size}
      >
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="big">Large</option>
      </select>

      {/* Species */}
      <select
        className="border border-grey-light w-1/4 p-3 rounded mb-4 block text-gray-500 font-bold md:text-left md:mb-0 pr-4"
        name="species"
        required="required"
        onChange={(e) => props.setCapability(e)}
        defaultValue={props.capability.species}
      >
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
      </select>

      {/* Breed */}
      <select
        className="border border-grey-light w-1/4 p-3 rounded mb-4 block text-gray-500 font-bold md:text-left md:mb-0 pr-4"
        name="breed"
        required="required"
        onChange={(e) => props.setCapability(e)}
        defaultValue={props.capability.breed}
      >
        {props.categories[props.capability.species]?.map((item, idx) => (
          <option value={item} key={idx}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AnimalCapability;
