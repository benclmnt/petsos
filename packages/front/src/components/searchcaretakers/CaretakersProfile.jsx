import * as React from 'react';
import { useParams } from 'react-router-dom';
import ReviewsCard from './ReviewsCard';
import bg from '../../resources/wallpaper2.jpg';
import { client as fetch } from '../../utils/client';
import './ctprofile.css';
import { toJSONLocal } from '../../utils/dateutils';

function CaretakersProfile() {
  const { ctuname } = useParams();

  const [ctInfo, setCtInfo] = React.useState({});
  const [capabilityList, setCapabilityList] = React.useState([]);
  const [availabilityList, setAvailabilityList] = React.useState([]);
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

  const fetchDetails = async () => {
    const getCapability = fetch('/caretakers/' + ctuname + '/capabilities');
    const getAvailability = fetch('/caretakers/' + ctuname + '/availabilities');
    // triggering 2 parallel requests then waiting for all of them to finish.
    const result = await Promise.all([getCapability, getAvailability]);
    setCapabilityList(result[0]);
    setAvailabilityList(result[1]);
  };

  React.useEffect(() => {
    fetchReviews();
    fetchCaretakerInfo();
    fetchDetails();
  }, []);

  return (
    <div class="h-screen">
      <img src={bg} className="min-h-screen bg-cover fixed p-0 behind" />
      {errorMsg && <p>{errorMsg}</p>}
      {/* <div className="h-10"></div> */}
      <div class="px-48 py-16">
        <div className=" text-white grid grid-cols-2 w-1/2 align-middle">
          <h1 className="font-bold">Username:</h1>
          <h1>{ctInfo.username}</h1>
          <h1 className=" font-bold">City:</h1>
          <h1>{ctInfo.city}</h1>
          <h1 className=" font-bold">Postal Code:</h1>
          <h1>{ctInfo.postal_code}</h1>
          <h1 className=" font-bold">Commitment Type:</h1>
          <h1>{ctInfo.ct_type}</h1>
        </div>
        <div class="text-white">
          <h1 class="text-white font-bold mt-4 ">Capabilities: </h1>
          <div class="mt-2 flex flex-cols space-x-2">
            {capabilityList.map((capability, i) => (
              <div class="p-2 bg-orange-700 items-center font-semibold py-0 lg:rounded-full">
                {capability.breed}
              </div>
            ))}
          </div>

          <h1 class="text-white font-bold mt-4 ">Availabilities: </h1>
          <div class="mt-2 flex flex-cols space-x-2">
            {availabilityList.map((availability, i) => (
              <div class="p-2 bg-orange-700 items-center font-semibold text-indigo-100 py-0 lg:rounded-full">
                {toJSONLocal(availability.start_date).replaceAll('-', '/')} -{' '}
                {toJSONLocal(availability.end_date).replaceAll('-', '/')}
              </div>
            ))}
          </div>
        </div>

        <h1 class="text-white font-bold mb-2 mt-8 ">
          Reviews from another pet owners :{' '}
        </h1>
        <div class="grid grid-cols-2 gap-4 ">
          {reviews?.map((x, i) => (
            <ReviewsCard review={x} key={i} />
          ))}
        </div>
        <button className="mt-4 bg-orange-600 rounded-md text-white px-2 py-2 text-right tracking-wide uppercase text-sm font-bold">
          Bid for this guy
        </button>
      </div>
    </div>
  );
}

export default CaretakersProfile;
