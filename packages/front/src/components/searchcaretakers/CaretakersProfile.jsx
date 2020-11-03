import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewsCard from "./ReviewsCard";
import { client as fetch } from "../../utils/client";
import { useUser } from "../../context/auth-context";

function CaretakersProfile() {
  const user = useUser();

  const { ctuname } = useParams();

  const [ctInfo, setCtInfo] = React.useState({});
  const [capabilityList, setCapabilityList] = React.useState([]);
  const [petList, setPetList] = React.useState([]);
  const [reviews, setReviews] = React.useState([]);
  const [resultMsg, setResultMsg] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [creatingJob, setCreatingJob] = React.useState(false);
  const [caretakerAvailable, setCaretakerAvailable] = React.useState(false);
  const [availForm, setAvailForm] = React.useState({
    start_date: "",
    end_date: "",
  });
  const [petForm, setPetForm] = React.useState({
    petname: "",
  });
  const [petEligible, setPetEligible] = React.useState(false);
  const [jobForm, setJobForm] = React.useState({
    payment_method: "",
    transfer_method: "",
  });

  const fetchData = async () => {
    const getCapabilities = fetch("/caretakers/" + ctuname + "/capabilities");
    const getPets = fetch("/users/" + user.username + "/pets");
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
    setResultMsg("");
    setErrorMsg("");
    // IMPORTANT: Javascript months are 0-indexed so January is month 0. Why? You tell me.
    try {
      let start_date_obj = new Date(availForm.start_date);
      let end_date_obj = new Date(availForm.end_date);
      if (+start_date_obj > +end_date_obj) {
        setErrorMsg("Start date must be before end date.");
        return;
      }

      let getAvailResults = await fetch(
        "/caretakers/" + ctuname + "/availabilities"
      );
      let jobResPayload = {
        ctuname: ctuname,
        start_date: availForm.start_date,
        end_date: availForm.end_date,
      };
      let getMaxJobRestriction = await fetch("/jobs/queryOverlap", {
        body: jobResPayload,
      });
      const result = await Promise.all([getAvailResults, getMaxJobRestriction]);
      let availResults = result[0];
      let maxJobRestriction = result[1];
      let available = availResults.some(
        (daterange) =>
          +new Date(daterange.start_date.toString()) <= +start_date_obj &&
          +new Date(daterange.end_date.toString()) >= +end_date_obj
      );
      setResultMsg(
        available ? "Caretaker is available." : "Caretaker is unavailable."
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
    setErrorMsg("");
    console.log(capabilityList);
    setPetForm({
      ...petForm,
      [e.target.name]: e.target.value,
    });
    if (e.target.value.localeCompare("") === 0) {
      setErrorMsg("Must select a pet.");
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
      setResultMsg("Pet is eligible.");
      setPetEligible(true);
    } else {
      setErrorMsg("Caretaker incapable of taking care of pet.");
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
    setResultMsg("");
    setErrorMsg("");
    if (
      jobForm.payment_method.localeCompare("") === 0 ||
      jobForm.transfer_method.localeCompare("") === 0
    ) {
      setErrorMsg("Payment or transfer methods missing.");
    } else if (!caretakerAvailable) {
      setErrorMsg("Cannot submit job request when caretaker is unavailable.");
    } else if (!petEligible) {
      setErrorMsg(
        "Cannot submit job request when outside of caretaker capabilities"
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
        await fetch("/jobs/addBid", { body: payload }).then(
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
      setErrorMsg("");
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
      <div></div>
      <p> {errorMsg} </p>
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
          <h1 className="font-bold">Check Availability: </h1>
          <input type="date" name="start_date" onChange={handleAvailChange} />
          <p>to: </p>
          <input type="date" name="end_date" onChange={handleAvailChange} />
          <p>{resultMsg}</p>
          <button
            className="bg-orange-600 rounded-md text-white px-2 py-2 text-right tracking-wide uppercase text-sm font-bold"
            onClick={handleAvailSubmit}
          >
            Check
          </button>
          <select
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
          <select
            required="required"
            name="payment_method"
            default=""
            onChange={handleFormChange}
          >
            <option value="">Select payment method</option>
            <option value="cash">Cash</option>
            <option value="credit">Credit Card</option>
            <option value="gojek">Gojek</option>
          </select>
          <select
            required="required"
            name="transfer_method"
            default=""
            onChange={handleFormChange}
          >
            <option value="">Select Transfer method</option>
            <option value="pickup">Pickup</option>
            <option value="dropoff">Dropoff</option>
            <option value="gojek">Gojek</option>
            <option value="teleportation">Teleportation</option>
          </select>
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
      )}
    </>
  );

  function toggleCreatingJob() {
    setCreatingJob(!creatingJob);
  }
}

export default CaretakersProfile;
