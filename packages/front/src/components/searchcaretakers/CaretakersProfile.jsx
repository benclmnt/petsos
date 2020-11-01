import * as React from 'react';
import { useParams } from 'react-router-dom';
import ReviewsCard from './ReviewsCard';
import { client as fetch } from '../../utils/client';

function CaretakersProfile() {
  const { ctuname } = useParams();

  const [ctInfo, setCtInfo] = React.useState({});
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
    }
  };

  const fetchCaretakerInfo = async () => {
    try {
      const ct = await fetch(`/users/${ctuname}`);
      setCtInfo(ct);
    } catch (err) {
      console.error(err);
      setErrorMsg(err?.error);
    }
  };

  React.useEffect(() => {
    fetchReviews();
    fetchCaretakerInfo();
  }, []);

  return (
    <>
      {errorMsg && <p>{errorMsg}</p>}
      <div className="h-10"></div>
      <div className="grid grid-cols-2 w-1/2 align-middle">
        <h1 className="font-bold">Username:</h1>
        <h1>{ctInfo.username}</h1>
        <h1 className="font-bold">City:</h1>
        <h1>{ctInfo.city}</h1>
        <h1 className="font-bold">Postal Code:</h1>
        <h1>{ctInfo.postal_code}</h1>
        <h1 className="font-bold">Commitment Type:</h1>
        <h1>{ctInfo.ct_type}</h1>
      </div>
      <h1>Reviews: </h1>
      {reviews?.map((x, i) => (
        <ReviewsCard review={x} key={i} />
      ))}
      <button className="bg-orange-600 rounded-md text-white px-2 py-2 text-right tracking-wide uppercase text-sm font-bold">
        Bid for this guy
      </button>
    </>
  );
}

export default CaretakersProfile;
