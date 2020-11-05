import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewsCard from './ReviewsCard';
import bg from '../../resources/wallpaper2.jpg';
import { useUser } from '../../context/auth-context';
import { client as fetch } from '../../utils/client';
import './ctprofile.css';
import { toJSONLocal } from '../../utils/dateutils';

function CaretakersProfile() {
  const user = useUser();

  const { ctuname } = useParams();

  const [ctInfo, setCtInfo] = React.useState({});
  const [capabilityList, setCapabilityList] = React.useState([]);
  const [petList, setPetList] = React.useState([]);
  const [availabilityList, setAvailabilityList] = React.useState([]);
  const [reviews, setReviews] = React.useState([]);
  const [resultMsg, setResultMsg] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');
  const [creatingJob, setCreatingJob] = React.useState(false);
  const [caretakerAvailable, setCaretakerAvailable] = React.useState(false);
  const [availForm, setAvailForm] = React.useState({
    start_date: '',
    end_date: '',
  });
  const [petForm, setPetForm] = React.useState({
    petname: '',
  });
  const [petEligible, setPetEligible] = React.useState(false);
  const [jobForm, setJobForm] = React.useState({
    payment_method: '',
    transfer_method: '',
  });

  const fetchData = async () => {
    const getCapabilities = fetch('/caretakers/' + ctuname + '/capabilities');
    const getPets = fetch('/users/' + user.username + '/pets');
    const result = await Promise.all([getCapabilities, getPets]);
    setCapabilityList(result[0]);
    setPetList(result[1]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAvailChange = (e) => {
    setCaretakerAvailable(false);
    setAvailForm({
      ...availForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvailSubmit = async (e) => {
    e.preventDefault();
    setResultMsg('');
    setErrorMsg('');
    // IMPORTANT: Javascript months are 0-indexed so January is month 0. Why? You tell me.
    try {
      let start_date_obj = new Date(availForm.start_date);
      let end_date_obj = new Date(availForm.end_date);
      if (+start_date_obj > +end_date_obj) {
        setErrorMsg('Start date must be before end date.');
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
      let availResults = result[0];
      let maxJobRestriction = result[1];
      let available =
        availResults.some(
          (daterange) =>
            +new Date(daterange.start_date.toString()) <= +start_date_obj &&
            +new Date(daterange.end_date.toString()) >= +end_date_obj
        ) && maxJobRestriction.length === 0;
      setResultMsg(
        available ? 'Caretaker is available.' : 'Caretaker is unavailable.'
      );
      if (available) {
        setCaretakerAvailable(true);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err?.error);
    }
  };

  const handlePetChange = (e) => {
    setPetEligible(false);
    setErrorMsg('');
    console.log(capabilityList);
    setPetForm({
      ...petForm,
      [e.target.name]: e.target.value,
    });
    if (e.target.value.localeCompare('') === 0) {
      setErrorMsg('Must select a pet.');
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
      setResultMsg('Pet is eligible.');
      setPetEligible(true);
    } else {
      setErrorMsg('Caretaker incapable of taking care of pet.');
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
    setResultMsg('');
    setErrorMsg('');
    if (
      jobForm.payment_method.localeCompare('') === 0 ||
      jobForm.transfer_method.localeCompare('') === 0
    ) {
      setErrorMsg('Payment or transfer methods missing.');
    } else if (!caretakerAvailable) {
      setErrorMsg('Cannot submit job request when caretaker is unavailable.');
    } else if (!petEligible) {
      setErrorMsg(
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
            if (response.status === 401) {
            }
          }
        );
      } catch (err) {
        console.error(err);
        setErrorMsg(err?.error);
      }
    }
  };

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

  function toggleCreatingJob() {
    setCreatingJob(!creatingJob);
  }
}

export default CaretakersProfile;
