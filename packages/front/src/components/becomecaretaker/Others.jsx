import React from "react";

function Others() {
  return (
    <div>
      {/* Dates */}
      <div class="mt-8">
        <h1 class="mb-2 text-sm">Breed</h1>
        <div class="flex mb-4 space-x-8">
          <input
            type="text"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="othersbreed"
            placeholder="Details"
          />
        </div>
      </div>
    </div>
  );
}

export default Others;
