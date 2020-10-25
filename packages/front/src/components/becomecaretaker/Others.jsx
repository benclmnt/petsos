import React, { useState } from "react";

function Others(props) {
  console.log(props);
  const [breed, setBreed] = useState();

  return (
    <div>
      <input
        type="text"
        class="border border-grey-light w-auto p-3 rounded mb-4 block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
        name="othersbreed"
        placeholder="Detail"
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
}

export default Others;
