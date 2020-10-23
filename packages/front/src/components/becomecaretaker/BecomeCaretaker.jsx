import React, { useState } from "react";
import AnimalCapability from "./AnimalCapability";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BecomeCaretaker() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [type, setType] = useState("");
  const [capability, setCapability] = useState("");
  const params = { type, startDate, endDate, capability };
  var anehlu = "po6";

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: anehlu,
      type: type,
    };

    const availability = {
      username: anehlu,
      startDate: startDate,
      endDate: endDate,
    };

    const capability = {
      breed: "husky",
      size: "big",
      species: "dog",
      username: anehlu,
    };

    const availabilityOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(availability),
    };

    const capabilityOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(capability),
    };

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    console.log(data);
    console.log(availability);
    console.log(capability);
    fetch("api/caretakers/insert", option)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .then(() => fetchAvailability(availabilityOption))
      .then(() => fetchCapability(capabilityOption));
  };

  //   function fetchData(option) {
  //     fetch("api/caretakers/insert", option)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Success:", data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     })
  //     .then(() => fetchAvailability(availabilityOption))
  //     .then(() => fetchCapability(capabilityOption))
  //   }

  function fetchAvailability(availabilityOption) {
    fetch("api/caretakers/availability", availabilityOption)
      .then((response) => response.json())
      .then((availability) => {
        console.log("Success:", availability);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function fetchCapability(capabilityOption) {
    fetch("api/caretakers/capability", capabilityOption)
      .then((response) => response.json())
      .then((capability) => {
        console.log("Success:", capability);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const Form = () => {
    return <AnimalCapability />;
  };

  const Startdatepicker = () => {
    return (
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    );
  };

  const Enddatepicker = () => {
    return (
      <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
    );
  };

  return (
    <div class="bg-grey-lighter min-h-screen flex flex-col">
      <div class="container max-h-screen max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center px-20">
        <div class="bg-white h-full w-full px-12 py-12 rounded shadow text-black">
          {/* Caretaker Type */}
          <div class="mt-8">
            <h1 class="mb-2 text-sm">What's your commitment?</h1>
            {/* <input 
                            type="text"
                            class="block border border-grey-light w-full p-3 rounded mb-4"
                            name="commitment" /> */}
            <form>
              <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                  <div class="md:flex md:items-center mb-6">
                    <select
                      onChange={(e) => setType(e.target.value)}
                      class="border border-grey-light w-full p-3 rounded mb-4 block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                      for="inline-full-name"
                      name="caretaker_type"
                      id="1"
                    >
                      <option value="part">Part-time</option>
                      <option value="full">Full-time</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Capabilities*/}
          <div class="mt-8">
            <h1 class="mb-2 text-sm">Please indicate your capabilities</h1>
            <form>
              <AnimalCapability />
            </form>
            <div class="items-right">
              <button
                onClick={() => Form}
                class="bg-orange-300 hover:bg-orange-400 text-orange-800 font-bold py-4 px-4 rounded inline-flex items-center justify-center"
              >
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Dates */}
          <div class="flex">
            <div class="mt-8">
              <h1 class="mb-2 text-sm">Start date</h1>
              <div class="flex mb-4 space-x-8">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
            </div>

            <div class="mt-8">
              <h1 class="mb-2 text-sm">End date</h1>
              <div class="flex mb-4 space-x-8">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                />
              </div>
            </div>
          </div>

          {/* Next Button */}
          <div class="items-right">
            <button
              onClick={handleSubmit}
              class="bg-orange-300 hover:bg-orange-400 text-orange-800 font-bold py-4 px-4 rounded inline-flex items-center justify-center"
            >
              <span>Submit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BecomeCaretaker;
