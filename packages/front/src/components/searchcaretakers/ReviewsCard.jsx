import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function ReviewsCard({ review }) {
  console.log("Review:", review);
  const [ratingPO, setRating] = useState(review.rating);
  //   const [pouname, setPetOwnerName] = useState(review.pouname);
  //   const [review_desc, setReviewDesc] = useState(review.review);

  return (
    <div className="bg-white">
      <div class="bg-white w-1/2 md:flex rounded-lg shadow px-10 py-8">
        <div class="w-full">
          {/* Basic information */}
          <div class="flex justify-between">
            <div class="uppercase tracking-wide text-3xl text-indigo-600 font-bold">
              {review.pouname}
            </div>
          </div>
        </div>

        <div class="flex mb-4">
          {/* Rating */}
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
            <h2 class="text-md text-indigo-800 font-bold">{review.review}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewsCard;
