import React from "react";

function DayCare() {
  return (
    <div>
      {/* Address */}
      <div>
        <h1 class="text-sm mb-2 mt-4">What's your address or cross-streets?</h1>
        <input
          type="text"
          class="block border border-grey-light w-full p-2 rounded"
          name="address"
        />
      </div>

      {/* Drop In Interval */}
      <div>
        <h1 class="text-sm mb-2 mt-4">How often do you need Doggy Day Care?</h1>
        <div class="flex space-x-8">
          <input
            type="text"
            class="block border border-grey-light w-full p-2 rounded"
            name="once"
            placeholder="One Time"
          />

          <input
            type="text"
            class="block border border-grey-light w-full p-2 rounded"
            name="repeat"
            placeholder="Repeat Weekly"
          />
        </div>
      </div>

      {/* Dates */}
      <div>
        <h1 class="text-sm mb-2 mt-4">Which dates do you need?</h1>
        <div class="flex space-x-8 mb-4">
          <input
            type="text"
            class="block border border-grey-light w-full p-2 rounded"
            name="dropoffdate"
            placeholder="Start"
          />

          <input
            type="text"
            class="block border border-grey-light w-full p-2 rounded"
            name="pickupdate"
            placeholder="End"
          />
        </div>
      </div>
    </div>
  );
}

export default DayCare;
