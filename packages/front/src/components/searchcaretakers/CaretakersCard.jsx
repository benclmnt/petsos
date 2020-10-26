import React from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function CaretakersCard() {
  const [value, setValue] = React.useState(4.5);
  return (
    <div class="md:flex">
      <div class="md:flex-shrink-0">
        <img class="rounded-lg md:w-56" src="" />
      </div>
      <div class="mt-4 md:mt-0 md:ml-6">
        <div class="uppercase tracking-wide text-sm text-indigo-600 font-bold">
          Full Name
        </div>
        <a class="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline">
          Short bio?
        </a>
        <p class="mt-2 text-gray-600">Address of caretaker</p>

        <div class="flex space-x-8 mt-4 mb-2">
          <a class="block mt-1 text-md leading-tight font-semibold text-gray-900 hover:underline">
            Fee
          </a>
          <a class="block mt-1 text-md leading-tight font-semibold text-gray-900 hover:underline">
            Commitment level
          </a>
        </div>
        <div>
          <Box component="fieldset" mb={3} borderColor="transparent">
            {/* <Typography component="legend">Rating</Typography> */}
            <Rating name="read-only" precision={0.5} value={value} readOnly />
          </Box>
        </div>
      </div>
    </div>
  );
}

export default CaretakersCard;
