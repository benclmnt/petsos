import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../css/datepicker.css";
import PetCard from "./PetCard";
import { client as fetch } from "../../utils/client";
import { useUser } from "../../context/auth-context";
import { BrowserRouter as Router, Link } from "react-router-dom";
import AnimalCapability from "../becomecaretaker/AnimalCapability";

function _toJSONLocal(date) {
  var local = date;
  local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  console.log(date, local);
  return local.toJSON().substring(0, 10);
}

function SearchCaretakers() {
  const user = useUser();
  const [serviceType, setServiceType] = useState("boarding");
  const [isLoaded, setIsLoaded] = useState(false);
  const [capabilities, setCapabilities] = useState([]);
  const [pet, setPet] = useState({ species: "", breed: "", size: "" });
  const [address, setAddress] = useState({
    country: user.country,
    city: user.city,
    postal_code: user.postal_code,
  });
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [species, setSpecies] = useState(0);
  const [size, setSize] = useState("");
  const [breed, setBreed] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedID, setSelected] = useState();

  // Pets
  var petOptions = [
    { species: "Dog", breed: "Husky", size: "Big" },
    { species: "Cat", breed: "Sphinx", size: "Medium" },
  ];

  // Address
  var countryOptions = ["Singapore"];
  var cityOptions = ["Singapore"];
  var postalCodeOptions = [1, 2, 3, 4, 5, 6, 7];

  var addressOptions = (choices, name) => (
    <select
      className="border border-grey-light w-auto p-3 rounded mb-4 block text-gray-500 font-bold md:text-left md:mb-0 pr-4"
      name={name}
      id="2"
      required="required"
      onChange={handleAddressChange}
      value={address.name}
    >
      <option value="" disabled>
        Select {name === "postal_code" ? "postal code" : name}
      </option>
      {choices.map((x, y) => (
        <option key={y}>{x}</option>
      ))}
    </select>
  );

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // Datepickers
  const dateFormat = "dd-MM-yyyy";

  const StartDatepicker = () => {
    return (
      <DatePicker
        selected={startDate}
        required="required"
        //locale = 'en-SG'
        //disableTime={true}
        onChange={(date) => setStartDate(date)}
        dateFormat={dateFormat}
        placeholderText="Start Date"
      />
    );
  };

  const EndDatepicker = (index) => {
    return (
      <DatePicker
        selected={endDate}
        required="required"
        //locale = 'en-SG'
        //disableTime={true}
        onChange={(date) => setEndDate(date)}
        dateFormat={dateFormat}
        placeholderText="End Date"
      />
    );
  };

  useEffect(async () => {
    // GET request using fetch inside useEffect React hook
    const link = "/caretakers/categories";
    const result = await fetch(link);
    setCapabilities(Object.values(result));
    setIsLoaded(true);
    console.log(capabilities);
  }, []);

  let table;

  if (isLoaded) {
    console.log(capabilities[species]);
    table = capabilities[species].map((item) => {
      return <option value={item}>{item}</option>;
    });
  }

  //Search
  const handleSearch = async (e) => {
    e.preventDefault();

    const searchParams = {
      uname: user.username,
      service_type: serviceType,
      country: address.country,
      city: address.city,
      postal_code: address.postal_code,
      start_date: _toJSONLocal(startDate),
      end_date: _toJSONLocal(endDate),
      species: pet.species,
      breed: pet.breed,
      size: pet.size,
    };

    try {
      const insertResults = await fetch("/caretakers", {
        body: searchParams,
        redirectTo: "/searchResults",
      });
      console.log(insertResults);
    } catch (err) {
      setErrorMsg(err.error);
      return;
    }
  };

  return (
    <div
      class="py-20 h-screen my-auto"
      style={{
        backgroundSize: "cover",
        backgroundImage:
          "url(https://img4.goodfon.com/wallpaper/nbig/8/71/sobaka-vzgliad-brevno.jpg)",
        backgroundPosition: "center center",
      }}
    >
      <form
        onSubmit={handleSearch}
        class="flex-col max-h-screen max-w-2xl mx-auto"
      >
        <div class="bg-white text-black px-10 py-8 rounded shadow space-y-3">
          <h1 class="text-3xl text-left font-bold">Find the Perfect Match</h1>

          {/* Pets */}
          <div>
            <h1 class="text-sm mb-4">I'm looking for services for:</h1>
            <div class="md:flex space-x-4">
              <select
                class="border border-grey-light w-auto p-3 rounded mb-4 block text-gray-500 font-bold md:text-left md:mb-0 pr-4"
                onChange={(e) => setSpecies(parseInt(e.target.value))}
              >
                {/* <option value="2" disabled>Select species</option> */}
                <option value="0">dog</option>
                <option value="1">cat</option>
              </select>

              <select
                class="border border-grey-light w-auto p-3 rounded mb-4 block text-gray-500 font-bold md:text-left md:mb-0 pr-4"
                onClick={(e) => {
                  setBreed(e.target.value);
                }}
              >
                {/* <option value="" disabled>Select breed</option> */}
                {table}
              </select>

              <select
                class="border border-grey-light w-auto p-3 rounded mb-4 block text-gray-500 font-bold md:text-left md:mb-0 pr-4"
                onClick={(e) => {
                  setSize(e.target.value);
                }}
              >
                {/* <option value="" disabled>Select size</option> */}
                <option value="big">big</option>
                <option value="medium">medium</option>
                <option value="small">small</option>
              </select>
            </div>
          </div>

          {/* Address */}
          <div>
            <h1 class="mb-2 text-sm">What's your address or cross-streets?</h1>
            <div class="flex space-x-4">
              {addressOptions(countryOptions, "country")}
              {addressOptions(cityOptions, "city")}
              {addressOptions(postalCodeOptions, "postal_code")}
            </div>
          </div>

          {/* Dates */}
          <div>
            <h1 class="mb-2 text-sm">Which dates do you need?</h1>
            <div class="flex mb-4 space-x-8">
              <StartDatepicker />
              <EndDatepicker />
            </div>
          </div>

          {/* Next Button */}
          <Link
            to="/ctresults"
            // onClick = {() => }
            type="submit"
            class="bg-orange-300 hover:bg-orange-400 text-orange-800 font-bold py-3 px-6 rounded"
          >
            Search Now!
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SearchCaretakers;
