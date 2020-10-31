import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { toJSONLocal } from "../../utils/dateutils";

function ReviewsCard({ review }) {
  console.log("Review:", review);
  const [ratingPO, setRating] = useState(review.rating);
  //   const [pouname, setPetOwnerName] = useState(review.pouname);
  //   const [review_desc, setReviewDesc] = useState(review.review);

  return (
    <div>
      <div class="bg-white w-full md:flex rounded-lg shadow px-10 py-8">
        <div class="w-full">
          {/* Basic information */}
          <div class="flex-col justify-between">
            <div class="uppercase tracking-wide text-xl text-indigo-600 font-bold">
              {review.pouname}
            </div>

            <div class="flex-col mb-4">
              {/* Rating */}
              <p class="text-gray-600">
                {toJSONLocal(new Date(review.end_date))}
              </p>

              <div>
                <Box component="fieldset" borderColor="transparent">
                  {/* <Typography component="legend">Rating</Typography> */}
                  <Rating
                    name="read-only"
                    precision={0.5}
                    value={review.rating}
                    readOnly
                  />
                </Box>
                {/* {rating} */}
              </div>

              <div>
                <h2 class="text-md text-indigo-800 font-bold">
                  {review.review}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewsCard;
