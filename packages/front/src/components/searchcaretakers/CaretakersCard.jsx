import React from "react";
import { Link } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

function CaretakersCard({ caretaker = {} }) {
  return (
    <>
      <div
        class="bg-white rounded-lg shadow px-10 py-8"
        style={{ minWidth: 360 }}
      >
        <div class="w-full">
          {/* Basic information */}
          <div class="flex justify-between">
            <div class="uppercase tracking-wide text-3xl text-indigo-600 font-bold">
              {caretaker.ctuname}
            </div>

            <div class="flex flex-col">
              <div class="text-right text-2xl text-indigo-800 opacity-75 font-bold">
                ${caretaker.price}
              </div>

              <div class="text-sm text-right text-indigo-800 opacity-75">
                per day
              </div>
            </div>
          </div>

          <div class="flex">
            <svg
              class="opacity-50 h-4 w-4 mt-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd"
              />
            </svg>
            <p class="text-gray-600">
              {caretaker.city}, {caretaker.postal_code}
            </p>
          </div>

          {/* Capability */}
          {/* <div class="flex mt-2">{createCapability()}</div> */}

          {/* Rating */}
          <div class="h-2"></div>
          <div class="flex align-middle">
            <Box
              component="fieldset"
              borderColor="transparent"
              class="flex-1 py-1"
            >
              <Rating
                name="read-only"
                precision={0.1}
                value={caretaker.avg_rating}
                readOnly
              />
            </Box>
            <div class="w-5"></div>
            {/* <button
              class="bg-orange-600 rounded-md text-white px-2 py-2 text-right tracking-wide uppercase text-sm font-bold"
            >
              Book a time
            </button> */}
            <div class="w-2"></div>
            <Link
              to={`/ct/${caretaker.ctuname}`}
              class="py-2 text-indigo-800 text-right tracking-wide uppercase text-sm font-bold"
            >
              See reviews
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default CaretakersCard;
