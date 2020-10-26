import React from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function CaretakersCard() {
  const [value, setValue] = React.useState(4.5);
  return (
    <div class="justify-self-center md:flex rounded-lg shadow">
      <div class="mt-4 md:mt-0 md:ml-6">
        {/* Basic information */}
        <div class="uppercase tracking-wide text-lg text-indigo-600 font-bold">
          Full Name
        </div>
        <a class="block mt-1 text-md leading-tight font-semibold text-gray-900">
          Short bio?
        </a>
        <div class="flex">
          <svg
            class="opacity-50 h-4 w-4 mt-3"
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
          <p class="mt-2 text-gray-600">Address of caretaker</p>
        </div>

        {/* Details */}
        <div class="flex space-x-8 mt-4 mb-2">
          <div class="flex space-x-1">
            <svg
              class="h-4 w-4 mt-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="#0f9434"
            >
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                clip-rule="evenodd"
              />
            </svg>
            <a class="block mt-1 text-sm leading-tight font-semibold text-gray-900">
              Fee
            </a>
          </div>
          <div class="flex space-x-1">
            <svg
              class="h-4 w-4 mt-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clip-rule="evenodd"
              />
            </svg>
            <a class="block mt-1 text-sm leading-tight font-semibold text-gray-900">
              Commitment level
            </a>
          </div>
        </div>

        {/* Rating */}
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
