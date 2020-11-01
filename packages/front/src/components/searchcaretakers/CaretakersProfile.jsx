import * as React from 'react';
import { useParams } from 'react-router-dom';
import ReviewsCard from './ReviewsCard';
import { client as fetch } from '../../utils/client';

function CaretakersProfile() {
  const { ctuname } = useParams();

  const [reviews, setReviews] = React.useState([]);
  const [errorMsg, setErrorMsg] = React.useState('');

  const fetchReviews = async () => {
    try {
      const tmp = await fetch(`/caretakers/reviews?ctuname=${ctuname}`);
      console.log(tmp);
      setReviews(tmp);
      setErrorMsg('');
    } catch (err) {
      console.error(err);
      setErrorMsg(err?.error);
      return;
    }
  };

  React.useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <>
      {errorMsg && <p>{errorMsg}</p>}
      {reviews?.map((x, i) => (
        <ReviewsCard review={x} key={i} />
      ))}
    </>
  );
}

export default CaretakersProfile;
