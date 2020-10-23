import React from "react";

function Cats() {
  return (
    <div>
      {/* Breed */}
      <select
        class="border border-grey-light w-auto p-3 rounded mb-4 block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
        for="inline-full-name"
        name="caretaker_type"
        id="1"
      >
        <option value="" disabled selected>
          Select breed
        </option>
        <option value="part">kitty</option>
        <option value="full">morganissa</option>
      </select>
    </div>
  );
}

export default Cats;
