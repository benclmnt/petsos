import React from "react";
import { client as fetch } from "../../utils/client";
import { useUser } from "../../context/auth-context";
import { toJSONLocal } from "../../utils/dateutils";

function CTOverview() {
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
        <p className="border-b-2 border-black pb-3">Ratings and Reviews</p>
        <div className="mt-3">
          <p>Average Rating: {profile.avg_rating}</p>
        </div>
        <p className="border-b-2 border-black py-3">Past reviews</p>
        {profile.reviews?.map((review) => (
          <div className="py-2 border-b-2">
            <p>Rating: {review.rating}</p>
            <p>Review: {review.review}</p>
            <p>
              Pet Owner: {review.pouname} (pet name: {review.petname})
            </p>
            <p>Start Date: {toJSONLocal(review.start_date)}</p>
            <p>End Date: {toJSONLocal(review.end_date)}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default CTOverview;
