import React from "react";

function Cats() {
  return (
    <div>
      {/* Breed */}
      <div class="mt-8">
        <h1 class="mb-2 text-sm">Breed</h1>
        <form>
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <div class="md:flex md:items-center mb-6">
                <select
                  class="border border-grey-light w-full p-3 rounded mb-4 block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                  for="inline-full-name"
                  name="caretaker_type"
                  id="1"
                >
                  <option value="part">kitty</option>
                  <option value="full">morganissa</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cats;
