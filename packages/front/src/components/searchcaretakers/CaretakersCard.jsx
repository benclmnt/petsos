import React from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function CaretakersCard() {
  const [value, setValue] = React.useState(2);
  return (
    <div class="flex-col max-h-screen max-w-2xl mx-auto">
      <div class="bg-white text-black px-10 py-8 rounded shadow space-y-3">
        <div class="flex-col">
          <div>
            <h2 class="text-lg text-orange-800">Full Name</h2>
          </div>

          <div>
            <Box component="fieldset" mb={3} borderColor="transparent">
              {/* <Typography component="legend">Rating</Typography> */}
              <Rating name="read-only" value={value} readOnly />
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaretakersCard;
