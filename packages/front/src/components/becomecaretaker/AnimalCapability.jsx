import React, { useState } from "react";
import Dogs from "./Dogs";
import Cats from "./Cats";
import Others from "./Others";

function AnimalCapability() {
  const [page, setPage] = useState("dog");
  const [capability, setCapability] = useState();

  function ShowPage(props) {
    const currPage = props.page;
    switch (currPage) {
      case "dog":
        return <Dogs />;

      case "cat":
        return <Cats />;

      case "others":
        return <Others />;

      default:
        return <Dogs />;
    }
  }
  return (
    <div>
      <div class="md:flex md:items-center">
        <div class="md:w-1/3">
          <div class="md:flex">
            <div class="w-64 flex">
              <select
                onChange={(e) => setCapability(e.target.value)}
                class="mx-6 border border-grey-light w-full rounded block text-gray-500 font-bold md:text-left pr-4"
                name="caretaker_type"
                id="1"
              >
                <option onClick={() => setPage("dog")} value="dog">
                  Dog
                </option>
                <option onClick={() => setPage("cat")} value="cat">
                  Cat
                </option>
                <option onClick={() => setPage("others")} value="others">
                  Others
                </option>
              </select>
              <ShowPage page={page} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimalCapability;
