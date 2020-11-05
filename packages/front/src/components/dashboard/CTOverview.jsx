import React from 'react';
import { client as fetch } from '../../utils/client';
import { useUser } from '../../context/auth-context';
import { toJSONLocal } from '../../utils/dateutils';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

function CTOverview(props) {
  const user = useUser();
  const [profile, setProfile] = React.useState(user);

  async function fetchCaretakerData() {
    const result = await fetch(`/caretakers/${user.username}`);
    setProfile({
      ...profile,
      past_month: result.past_month,
      avg_rating: result.avg_rating,
      reviews: result.reviews,
    });
  }

  React.useEffect(() => {
    fetchCaretakerData();
  }, []);

  console.log(profile);

  return (
    <>
      <div className="bg-white p-5 rounded-lg">
        <p className="border-b-2 border-black pb-3">Past Month Summary</p>
        <div className="mt-3">
          <p>Total Payout: ${profile.past_month?.total_payout}</p>
          <p>Pet days: {profile.past_month?.pet_days}</p>
          <p>Total jobs taken: {profile.past_month?.num_jobs}</p>
        </div>
      </div>
      <div className="bg-white p-5 rounded-lg">
        {props.setRating(profile.avg_rating)}
        <h1 className="border-b-2 border-black py-3">Past Reviews</h1>
        <div className="h-32 overflow-y-auto overscroll-contain container">
          {profile.reviews?.map((review) => (
            <div className="py-2 border-b-2">
              <div className="flex space-x-2 mt-3">
                <Box component="fieldset" borderColor="transparent">
                  <Rating
                    name="read-only"
                    precision={0.1}
                    value={parseFloat(review.rating)}
                    readOnly
                  />
                </Box>
                <h2>{review.rating}</h2>
              </div>
              <h1 className="text-xs text-gray-500">
                {toJSONLocal(review.start_date)} –{' '}
                {toJSONLocal(review.end_date)}
              </h1>
              <h2 className="italic">{review.review}</h2>
              <h1 className="font-semibold">
                {review.pouname}
                <span className="font-normal"> — {review.petname}</span>
              </h1>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CTOverview;
