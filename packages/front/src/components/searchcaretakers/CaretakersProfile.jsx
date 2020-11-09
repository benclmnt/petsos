import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/datepicker.css';
import { toJSONLocal } from '../../utils/dateutils';
import moment from 'moment';
import ReviewsCard from './ReviewsCard';
import bg from '../../resources/wallpaper2.jpg';
import { useUser } from '../../context/auth-context';
import { client as fetch } from '../../utils/client';
import './ctprofile.css';

function CaretakersProfile() {
  const user = useUser();

  const { ctuname } = useParams();

  const [ctInfo, setCtInfo] = useState({});
  const [capabilityList, setCapabilityList] = useState([]);
  const [petList, setPetList] = useState([]);
  const [availabilityList, setAvailabilityList] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [availMsg, setAvailMsg] = useState('');
  const [petMsg, setPetMsg] = useState('');
  const [formMsg, setFormMsg] = useState('');
  // const [resultMsg, setResultMsg] = React.useState('');
  // const [errorMsg, setErrorMsg] = React.useState('');
  const [creatingJob, setCreatingJob] = useState(false);
  const [caretakerAvailable, setCaretakerAvailable] = useState(false);
  const [ctAvailability, setCtAvailability] = useState({
    start_date: '',
    end_date: '',
  });
  const [availForm, setAvailForm] = useState({
    start_date: '',
    end_date: '',
  });
  const [petForm, setPetForm] = useState({
    petname: '',
  });
  const [petEligible, setPetEligible] = useState(false);
  const [jobForm, setJobForm] = useState({
    payment_method: '',
    transfer_method: '',
  });

  // Datepickers
  const dateFormat = 'dd-MM-yyyy';
  const twoYearsFromNow = new Date(moment().add(2, 'years'));

  const StartDatepicker = () => {
    return (
      <DatePicker
        onChange={(date) => setAvailForm({ ...availForm, start_date: date })}
        selected={availForm.start_date}
        required="required"
        minDate={moment().toDate()}
        maxDate={twoYearsFromNow}
        dateFormat={dateFormat}
        placeholderText="Start Date"
      />
    );
  };

  const EndDatepicker = () => {
    return (
      <DatePicker
        required="required"
        minDate={availForm.start_date}
        maxDate={twoYearsFromNow}
        onChange={(date) => setAvailForm({ ...availForm, end_date: date })}
        selected={availForm.end_date}
        dateFormat={dateFormat}
        placeholderText="End Date"
      />
    );
  };

  const handleAvailChange = (e) => {
    setCaretakerAvailable(false);
    setCtAvailability({
      ...ctAvailability,
      [e.target.name]: e.target.value,
    });
    setAvailMsg('');
  };

  const handleAvailSubmit = async (e) => {
    e.preventDefault();
    setAvailMsg('');
    // if (
    //   availForm.start_date.localeCompare('') === 0 ||
    //   availForm.end_date.localeCompare('') === 0
    // ) {
    //   setAvailMsg('Select start and end date to create job.');
    //   return;
    // }
    // IMPORTANT: Javascript months are 0-indexed so January is month 0. Why? You tell me.
    try {
      let start_date_obj = new Date(availForm.start_date);
      let end_date_obj = new Date(availForm.end_date);
      if (+start_date_obj > +end_date_obj) {
        setAvailMsg('Start date must be before end date.');
        return;
      }

      let getAvailResults = await fetch(
        '/caretakers/' + ctuname + '/availabilities'
      );
      let jobResPayload = {
        ctuname: ctuname,
        start_date: availForm.start_date,
        end_date: availForm.end_date,
      };
      let getMaxJobRestriction = await fetch('/jobs/queryOverlap', {
        body: jobResPayload,
      });
      const result = await Promise.all([getAvailResults, getMaxJobRestriction]);
      let maxJobRestriction = result[1];

      let available =
        availabilityList.some(
          (daterange) =>
            new Date(toJSONLocal(daterange.start_date)) <=
              new Date(toJSONLocal(availForm.start_date)) &&
            new Date(toJSONLocal(daterange.end_date)) >=
              new Date(toJSONLocal(availForm.end_date))
        ) && maxJobRestriction.length === 0;

      setAvailMsg(
        available == true
          ? 'Caretaker is available.'
          : 'Caretaker is NOT available.'
      );

      if (available) {
        setCaretakerAvailable(true);
      }
    } catch (err) {
      console.error(err);
      setAvailMsg(err?.error);
    }
  };

  const handlePetChange = (e) => {
    setPetEligible(false);
    setPetMsg('');
    console.log(capabilityList);
    setPetForm({
      ...petForm,
      [e.target.name]: e.target.value,
    });
    if (e.target.value.localeCompare('') === 0) {
      setPetMsg('Must select a pet.');
      return;
    }
    let pet = petList.filter(
      (petItem) => petItem.name.localeCompare(e.target.value) === 0
    )[0];
    console.log(pet);
    if (
      capabilityList.some(
        (c) =>
          c.species.localeCompare(pet.species) === 0 &&
          c.breed.localeCompare(pet.breed) === 0
      )
    ) {
      setPetMsg('Pet is eligible.');
      setPetEligible(true);
    } else {
      setPetMsg('Caretaker incapable of taking care of pet.');
    }
  };

  const handleFormChange = (e) => {
    setJobForm({
      ...jobForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormMsg('');
    if (
      jobForm.payment_method.localeCompare('') === 0 ||
      jobForm.transfer_method.localeCompare('') === 0
    ) {
      setFormMsg('Payment or transfer methods missing.');
    } else if (!caretakerAvailable) {
      setFormMsg('Cannot submit job request when caretaker is unavailable.');
    } else if (!petEligible) {
      setFormMsg(
        'Cannot submit job request when outside of caretaker capabilities'
      );
    } else {
      const payload = {
        price: 0, // automatically determined
        payment_method: jobForm.payment_method,
        transfer_method: jobForm.transfer_method,
        start_date: availForm.start_date,
        end_date: availForm.end_date,
        ctuname: ctuname,
        pouname: user.username,
        petname: petForm.petname,
      };
      console.log(payload);
      try {
        await fetch('/jobs/addBid', { body: payload }).then(
          async (response) => {
            if (response.status === 200) {
              setFormMsg('Bid added. You may view all bids at your profile.');
            }
          }
        );
      } catch (err) {
        console.error(err);
        setFormMsg(err?.error);
      }
    }
  };

  function toggleCreatingJob() {
    console.log(creatingJob);
    setCreatingJob(!creatingJob);
  }

  const fetchReviews = async () => {
    try {
      const tmp = await fetch(`/caretakers/reviews?ctuname=${ctuname}`);
      console.log(tmp);
      setReviews(tmp);
      //setErrorMsg('');
    } catch (err) {
      console.error(err);
      //setErrorMsg(err?.error);
    }
  };

  const fetchPets = async () => {
    if (user != null) {
      const pets = await fetch('/users/' + user.username + '/pets');
      setPetList(pets);
    }
  };

  const fetchCaretakerInfo = async () => {
    try {
      const ct = await fetch(`/users/${ctuname}`);
      setCtInfo(ct);
    } catch (err) {
      console.error(err);
      //setErrorMsg(err?.error);
    }
  };

  const fetchDetails = async () => {
    const getCapability = fetch('/caretakers/' + ctuname + '/capabilities');
    const getAvailability = fetch('/caretakers/' + ctuname + '/availabilities');
    // triggering 2 parallel requests then waiting for all of them to finish.
    const result = await Promise.all([getCapability, getAvailability]);
    setCtAvailability(getAvailability);
    setCapabilityList(result[0]);
    setAvailabilityList(result[1]);
  };

  useEffect(() => {
    fetchReviews();
    fetchCaretakerInfo();
    fetchDetails();
    fetchPets();
  }, []);

  return (
    <div class="h-screen">
      <img src={bg} className="min-h-screen bg-cover fixed p-0 behind" />
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
          <h1 className="text-white font-bold mt-4 ">Capabilities: </h1>
          <div class="mt-2 flex flex-cols space-x-2">
            {capabilityList.map((capability, i) => (
              <div
                key={i}
                class="p-2 bg-orange-700 items-center font-semibold py-0 rounded-md"
              >
                {capability.breed} ({capability.size})
              </div>
            ))}
          </div>

          <h1 class="text-white font-bold mt-4 ">Availabilities: </h1>
          <div class="mt-2 flex flex-cols space-x-2">
            {availabilityList.map((availability, i) => (
              <div class="p-2 bg-orange-700 items-center font-semibold text-indigo-100 py-0 lg:rounded-full">
                {(e) => handleAvailChange(e)}
                {toJSONLocal(availability.start_date).replaceAll(
                  '-',
                  '/'
                )} - {toJSONLocal(availability.end_date).replaceAll('-', '/')}
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
        <br />

        {/* Jobs */}
        {user != null && (
          <>
            {!creatingJob && (
              <button
                className="bg-orange-600 rounded-md text-white px-2 py-2 text-right tracking-wide uppercase text-sm font-bold"
                onClick={toggleCreatingJob}
              >
                Create Job
              </button>
            )}

            {creatingJob && (
              <div>
                <h1 className="font-bold mb-2 text-white">
                  Check Availability:
                </h1>

                <div class="flex space-x-2">
                  <StartDatepicker />
                  <h1 className="font-bold text-white"> to </h1>
                  <EndDatepicker />
                  <button
                    className="h-10 bg-orange-600 rounded-md text-white px-2 uppercase text-sm font-bold"
                    onClick={handleAvailSubmit}
                  >
                    Check
                  </button>
                </div>
                <h1 className="font-bold text-white">{availMsg}</h1>

                {/* Select pets */}
                <h1 className="font-bold text-white">Select Pet: </h1>
                <select
                  class="rounded-md mt-2 py-2 px-2"
                  required="required"
                  name="petname"
                  default=""
                  onChange={handlePetChange}
                >
                  <option value="">Select pet</option>
                  {petList.map((pet, i) => (
                    <option value={pet.name} key={i}>
                      {pet.name}
                    </option>
                  ))}
                </select>
                <h1 className="font-bold text-white">{petMsg}</h1>

                {/* Payment Method */}
                <h1 className="mt-4 font-bold text-white">
                  Select Payment and Transfer Method:
                </h1>
                <div class="flex space-x-4 mt-2">
                  <select
                    class="rounded-md py-2 px-2"
                    required="required"
                    name="payment_method"
                    default=""
                    placeholder="Select payment method"
                    onChange={handleFormChange}
                  >
                    <option value="">Select payment method</option>
                    <option value="cash">Cash</option>
                    <option value="credit">Credit Card</option>
                  </select>

                  <select
                    class="rounded-md py-2 px-2"
                    required="required"
                    name="transfer_method"
                    default=""
                    onChange={handleFormChange}
                  >
                    <option value="">Select transfer method</option>
                    <option value="pickup">Pickup</option>
                    <option value="dropoff">Dropoff</option>
                    <option value="grab">Grab</option>
                  </select>
                </div>

                <div class="mt-4 flex space-x-4">
                  <button
                    className="bg-orange-600 rounded-md text-white px-2 py-2 text-right tracking-wide uppercase text-sm font-bold"
                    onClick={handleFormSubmit}
                  >
                    Submit Job Request
                  </button>

                  <button
                    className="bg-red-600 rounded-md text-white px-2 py-2 text-right tracking-wide uppercase text-sm font-bold"
                    onClick={toggleCreatingJob}
                  >
                    Cancel
                  </button>
                </div>
                <h1 className="font-bold text-white">{formMsg}</h1>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default CaretakersProfile;
