import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function CaretakersCard(full_name, cust_rating, capabilities, base_price) {
  const [rating, setRating] = useState(2.5); //cust_rating);
  const [name, setName] = useState("full name"); //full_name);
  const [price, setPrice] = useState(100);
  const [capability, setCapability] = useState("");

  // function generateCard() {
  //   setName(full_name);
  //   setRating(cust_rating);
  //   setPrice(base_price);
  // }

  // generateCard();
  return (
    <div>
      <div class="mt-40 w-2/6 md:flex rounded-lg shadow">
        <div class="ml-6 mt-20 w-full">
          {/* Basic information */}
          <div class="flex justify-between">
            <div class="uppercase tracking-wide text-3xl text-indigo-600 font-bold">
              {name}
            </div>

            <div class="flex flex-col mr-10">
              <div class="text-right text-2xl text-indigo-800 opacity-75 font-bold">
                ${price}
              </div>

              <div class="text-sm text-right text-indigo-800 opacity-75">
                per night
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
            <p class="text-gray-600">Address of caretaker</p>
          </div>

          {/* Capability */}
          <div class="flex mt-2">
            <div class="text-xs text-center mr-2 my-1 uppercase tracking-wider border px-2 border-indigo-600 bg-indigo-600 text-indigo-100 cursor-default">
              Husky
            </div>

            <div class="text-xs text-center mr-2 my-1 uppercase tracking-wider border px-2  border-indigo-600 bg-indigo-600 text-indigo-100 cursor-default">
              Golden Retriever
            </div>

            <div class="text-xs text-center mr-2 my-1 uppercase tracking-wider border px-2  border-indigo-600 bg-indigo-600 text-indigo-100 cursor-default">
              Sphynx
            </div>
          </div>

          <div class="flex space-x-10">
            {/* Rating */}
            <div>
              <Box component="fieldset" mb={3} borderColor="transparent">
                {/* <Typography component="legend">Rating</Typography> */}
                <Rating
                  name="read-only"
                  precision={0.5}
                  value={rating}
                  readOnly
                />
              </Box>
            </div>

            {/*Reviews */}
            <div>
              <div class="text-right">
                <div
                  href="#"
                  class="mt-1 ml-64 text-indigo-800 tracking-wide uppercase text-sm font-bold hover:underline"
                >
                  See reviews
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaretakersCard;
