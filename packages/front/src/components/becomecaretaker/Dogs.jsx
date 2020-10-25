import React, { useState } from "react";

function Dogs(props) {
  console.log(props);
  const [breed, setBreed] = useState();

  return (
    <div>
      {/* Breed */}
      <select
        class="border border-grey-light w-auto p-3 rounded mb-4 block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
        name="caretaker_type"
        id="1"
      >
        {/* <option value="default" disabled selected>
          Select breed
        </option> */}

        <option onClick={(e) => props.onClick("husky")}>husky</option>

        <option onClick={(e) => props.onChange("golden retriever")}>
          golden retriever
        </option>

        <option onClick={(e) => props.onChange("shiba inu")}>shiba inu</option>
      </select>
    </div>
  );
}

export default Dogs;
