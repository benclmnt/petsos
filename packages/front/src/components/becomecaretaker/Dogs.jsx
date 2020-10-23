import React from "react";

function Dogs() {
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
                  class="border border-grey-light w-full p-3 rounded mb-4 block text-gray-500 font-bold md:text-left"
                  name="caretaker_type"
                  id="1"
                >
                  <option value="part">anjing</option>
                  <option value="full">doggy</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Dogs;
