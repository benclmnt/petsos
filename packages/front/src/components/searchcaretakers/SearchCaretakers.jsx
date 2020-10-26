import React, { useState } from "react";
import HouseSitting from "./HouseSitting";
import Boarding from "./Boarding";
import DropIn from "./DropIn";
import DayCare from "./DayCare";
import DogWalk from "./DogWalk";

function SearchCaretakers() {
  const [page, setPage] = useState("boarding");

  function ShowPage(props) {
    const currPage = props.page;
    switch (currPage) {
      case "boarding":
        return <Boarding />;

      case "housesitting":
        return <HouseSitting />;

      case "dropin":
        return <DropIn />;

      case "daycare":
        return <DayCare />;

      case "dogwalk":
        return <DogWalk />;

      default:
        return <Boarding />;
    }
  }

  return (
    <div
      class="py-20 h-screen my-auto"
      style={{
        backgroundSize: "cover",
        backgroundImage:
          "url(https://img4.goodfon.com/wallpaper/nbig/8/71/sobaka-vzgliad-brevno.jpg)",
        backgroundPosition: "center center",
      }}
    >
      <div class="flex-col max-h-screen max-w-2xl mx-auto">
        <div class="bg-white text-black px-10 py-8 rounded shadow space-y-3">
          <h1 class="text-3xl text-left font-bold">Find the Perfect Match</h1>

          {/* Checkboxes */}
          <div>
            <h1 class="text-sm">I'm looking for services for my :</h1>

            <div class="flex space-x-8 pt-3">
              <label class="inline-flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-5 w-5 text-orange-600"
                />
                <span class="ml-2 text-gray-700">Dog</span>
              </label>

              <label class="inline-flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-5 w-5 text-orange-600"
                />
                <span class="ml-2 text-gray-700">Cat</span>
              </label>
            </div>
          </div>

          {/* Option boxes */}
          <h1 class="text-sm text-left">What service do you need?</h1>

          <div class="flex items-center justify-between py-2 px-4">
            <button onClick={() => setPage("boarding")} class="btn">
              <svg
                class="fill-current h-8 w-8 mx-auto mb-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>

              <span>
                Boarding <br /> Services
              </span>
            </button>

            <button onClick={() => setPage("housesitting")} class="btn">
              <svg
                class="fill-current h-8 w-8 mx-auto mb-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span>
                House <br /> Sitting
              </span>
            </button>

            <button onClick={() => setPage("dropin")} class="btn">
              <svg
                class="fill-current h-8 w-8 mx-auto mb-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>
                Drop-In <br /> Visits
              </span>
            </button>

            <button onClick={() => setPage("daycare")} class="btn">
              <svg
                class="fill-current h-8 w-8 mx-auto mb-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>
                Doggy <br /> Day Care
              </span>
            </button>

            <button onClick={() => setPage("dogwalk")} class="btn">
              <svg
                class="fill-current h-8 w-8 mx-auto mb-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>
                Dog <br />
                Walking
              </span>
            </button>
          </div>

          {/* Subcomponents */}

          <ShowPage page={page} />

          {/* Next Button */}
          <button class="bg-orange-300 hover:bg-orange-400 text-orange-800 font-bold py-3 px-6 rounded">
            Search Now!
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchCaretakers;
