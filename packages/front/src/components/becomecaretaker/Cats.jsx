import React, { useState } from "react";

function Cats(props) {
  console.log(props);
  const [breed, setBreed] = useState();

  return (
    <div>
      {/* Breed */}
      <select
        class="border border-grey-light w-auto p-3 rounded mb-4 block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
        for="inline-full-name"
        name="caretaker_type"
        id="1"
      >
        <option onClick={(e) => props.onClick("kucing jalanan")}>
          kucing jalanan
        </option>

        <option onClick={(e) => props.onChange("morganissa")}>
          morganissa
        </option>

        <option onClick={(e) => props.onChange("kucing botak")}>
          kucing botak
        </option>
      </select>
    </div>
  );
}

export default Cats;
