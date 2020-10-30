import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../css/datepicker.css";
import { client as fetch } from "../../utils/client";
import { useUser } from "../../context/auth-context";
import { toJSONLocal } from "../../utils/dateutils";

function SearchForm({ setShowSearchForm, setSearchResult }) {
  const user = useUser();
  const [capabilities, setCapabilities] = useState([]);
  const [address, setAddress] = useState({
    country: user.country,
    city: user.city,
    postal_code: user.postal_code,
  });

  const [formState, setFormState] = useState({
    start_date: new Date(),
    end_date: new Date(),
    species: "dog",
    breed: "samoyed",
    size: "small",
    postal_code: user.postal_code, // TODO: to change to user.postal_code
    country: user.country,
    city: user.city,
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  // Pets
  var petOptions = [
    { species: "Dog", breed: "Husky", size: "Big" },
    { species: "Cat", breed: "Sphinx", size: "Medium" },
  ];

  // Address
  var countryOptions = ["Singapore"];
  var cityOptions = ["Singapore"];

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
        selected={formState.start_date}
        required="required"
        //locale = 'en-SG'
        //disableTime={true}
        onChange={(date) => setFormState({ ...formState, start_date: date })}
        dateFormat={dateFormat}
        placeholderText="Start Date"
      />
    );
  };

  const EndDatepicker = (index) => {
    return (
      <DatePicker
        selected={formState.end_date}
        required="required"
        //locale = 'en-SG'
        //disableTime={true}
        dateFormat={dateFormat}
        onChange={(date) => setFormState({ ...formState, end_date: date })}
        placeholderText="End Date"
      />
    );
  };

  useEffect(() => {
    (async () => {
      // GET request using fetch inside useEffect React hook
      const result = await fetch("/caretakers/categories");
      setCapabilities(result);
    })();
  }, []);

  console.log("cap", capabilities);

  //Search
  const handleSearch = async (e) => {
    e.preventDefault();

    const searchParams = {
      ...formState,
      start_date: toJSONLocal(formState.start_date),
      end_date: toJSONLocal(formState.end_date),
    };

    // generate the query params
    let link = "/caretakers/searchct?";
    const paramsKeyValue = [];
    Object.entries(searchParams).forEach(([key, value]) =>
      paramsKeyValue.push(`${key}=${value}`)
    );
    link += paramsKeyValue.join("&");

    try {
      const tmp = await fetch(link);
      console.log(tmp);
      setSearchResult((_) => tmp);
      setShowSearchForm(false);
    } catch (err) {
      console.error(err);
      setErrorMsg(err?.error);
      return;
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      class="flex-col max-h-screen max-w-2xl mx-auto"
    >
      <div class="bg-white text-black px-10 py-8 rounded shadow space-y-3">
        <p className="py-3 text-orange-700">{errorMsg}</p>
        <h1 class="text-3xl text-left font-bold">Find the Perfect Match</h1>

        {/* Pets */}
        <div>
          <h1 class="text-sm mb-4">I'm looking for services for:</h1>
          <div class="md:flex space-x-4">
            <select
              name="species"
              class="border border-grey-light w-auto p-3 rounded mb-4 block text-gray-500 font-bold md:text-left md:mb-0 pr-4"
              onChange={handleChange}
              defaultValue={formState.species}
            >
              {/* <option value="2" disabled>Select species</option> */}
              <option value="dog">dog</option>
              <option value="cat">cat</option>
            </select>

            <select
              name="breed"
              class="border border-grey-light w-auto p-3 rounded mb-4 block text-gray-500 font-bold md:text-left md:mb-0 pr-4"
              onChange={handleChange}
              defaultValue={formState.breed}
            >
              {/* <option value="" disabled>Select breed</option> */}
              {capabilities[formState.species]?.map((item, idx) => (
                <option value={item} key={idx}>
                  {item}
                </option>
              ))}
            </select>

            <select
              name="size"
              class="border border-grey-light w-auto p-3 rounded mb-4 block text-gray-500 font-bold md:text-left md:mb-0 pr-4"
              onChange={handleChange}
              defaultValue={formState.size}
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
            <input
              type="number"
              name="postal_code"
              defaultValue={formState.postal_code}
              onChange={handleChange}
            />
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
        <button
          type="submit"
          class="bg-orange-300 hover:bg-orange-400 text-orange-800 font-bold py-3 px-6 rounded"
        >
          Search Now!
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
