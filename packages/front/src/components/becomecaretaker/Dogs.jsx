import React from "react";

function Dogs() {
  return (
    <div>
      {/* Breed */}
      <select
        class="border border-grey-light w-auto p-3 rounded mb-4 block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
        name="caretaker_type"
        id="1"
      >
        <option value="" disabled selected>
          Select breed
        </option>
        <option value="part">anjing</option>
        <option value="full">doggy</option>
      </select>
    </div>
  );
}

export default Dogs;
