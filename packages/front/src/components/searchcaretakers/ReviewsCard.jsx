import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function ReviewsCard({ reviews }) {
  const [ratingFromPetOwner, setRating] = useState(reviews.rating); //cust_rating);
  const [pouname, setPetOwnerName] = useState(reviews.pouname); //full_name);

  // var createCapability = () =>
  //   capability.map((x, i) => (
  //     <div
  //       class="text-xs text-center mr-2 my-1 uppercase tracking-wider border px-2  border-indigo-600 bg-indigo-600 text-indigo-100 cursor-default"
  //       key={i}
  //     >
  //       {x.breed}, {x.size}
  //     </div>
  //   ));

  return (
    <div>
      <div class="bg-white mt-40 w-2/6 md:flex rounded-lg shadow px-10 py-8">
        <div class="w-full">
          {/* Basic information */}
          <div class="flex justify-between">
            <div class="uppercase tracking-wide text-3xl text-indigo-600 font-bold">
              {pouname}
            </div>

            {/* <div class="flex flex-col">
              <div class="text-right text-2xl text-indigo-800 opacity-75 font-bold">
                ${price}
              </div>

              <div class="text-sm text-right text-indigo-800 opacity-75">
                per night
              </div> */}
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
          {/* <div class="flex mt-2">{createCapability()}</div> */}

          <div class="flex justify-between">
            {/* Rating */}
            <div>
              <Box component="fieldset" borderColor="transparent">
                {/* <Typography component="legend">Rating</Typography> */}
                <Rating
                  name="read-only"
                  precision={0.5}
                  value={rating}
                  readOnly
                />
              </Box>
              {/* {rating} */}
            </div>

            <div
              href="#"
              class="text-indigo-800 text-right tracking-wide uppercase text-sm font-bold hover:underline"
            >
              See reviews
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewsCard;