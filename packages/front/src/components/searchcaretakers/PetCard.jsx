import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function PetCard({ species, setSpecies, breed, setBreed, size, setSize }) {
  return (
    <button
      class="justify-self-center md:flex rounded-lg shadow w-1/4 px-4 py-2"
      onClick={(e) => {
        e.preventDefault();
        setSpecies(species);
        setBreed(breed);
        setSize(size);
      }}
    >
      <div class="mt-4 md:mt-0 md:ml-6 text-left">
        {/* Basic information */}
        <div class="uppercase tracking-wide text-lg text-indigo-600 font-bold">
          {species}
        </div>
        <div class="block mt-1 text-md leading-tight font-semibold text-gray-900">
          {breed}
        </div>
        <div class="block mt-1 text-md leading-tight font-semibold text-gray-900">
          {size}
        </div>
      </div>
    </button>
  );
}

export default PetCard;
