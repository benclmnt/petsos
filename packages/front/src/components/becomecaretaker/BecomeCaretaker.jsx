import React, { useState } from "react";
import AnimalCapability from "./AnimalCapability";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { client as fetch } from "../../utils/client";
import { useUser } from "../../context/auth-context";

function BecomeCaretaker(props) {
  const dateFormat = "yyyy-MM-dd";
  const user = useUser();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [type, setType] = useState("");
  const [capability, setCapability] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("nani");
  const [petSize, setPetSize] = useState("Nan");
  const [petBtnSm, setPetBtnSm] = useState("petBtn-sm");
  const [petBtnMed, setPetBtnMed] = useState("petBtn");
  const [petBtnLg, setPetBtnLg] = useState("petBtn-lg");
  const params = { type, startDate, endDate, species, breed, petSize };
  // var anehlu = "po9";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: user,
      ct_type: type,
    };

    const availability = {
      ctuname: user,
      start_date: startDate,
      end_date: endDate,
    };

    const capability = {
      pc_species: species,
      pc_breed: breed,
      pc_size: petSize,
      ctuname: user,
    };

    try {
      const insertResults = await fetch("/caretakers/insert", { body: data });
      console.log(insertResults);
    } catch (err) {
      console.error(err);
    }

    try {
      const availResults = await fetch("/caretakers/availability", {
        body: availability,
      });
      console.log(availResults);
    } catch (err) {
      console.error(err);
    }

    try {
      const capabResults = await fetch("/caretakers/capability", {
        body: capability,
      });
      console.log(capabResults);
    } catch (err) {
      console.error(err);
    }
  };

  //   console.log(data);
  //   console.log(availability);
  //   console.log(capability);
  //   fetch("api/caretakers/insert", option)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Success:", data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     })
  //     .then(() => fetchAvailability(availabilityOption))
  //     .then(() => fetchCapability(capabilityOption));
  // };

  // function fetchAvailability(availabilityOption) {
  //   fetch("api/caretakers/availability", availabilityOption)
  //     .then((response) => response.json())
  //     .then((availability) => {
  //       console.log("Success:", availability);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }

  // function fetchCapability(capabilityOption) {
  //   fetch("api/caretakers/capability", capabilityOption)
  //     .then((response) => response.json())
  //     .then((capability) => {
  //       console.log("Success:", capability);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }

  const Startdatepicker = () => {
    return (
      <DatePicker
        selected={startDate}
        //locale = 'en-SG'
        //disableTime={true}
        onChange={(date) => setStartDate(toJSONLocal(date))}
        dateFormat="yyyy-MM-dd"
      />
    );
  };

  const Enddatepicker = () => {
    return (
      <DatePicker
        selected={endDate}
        //locale = 'en-SG'
        //disableTime={true}
        onChange={(date) => setEndDate(toJSONLocal(date))}
        dateFormat="yyyy-MM-dd"
      />
    );
  };

  function toJSONLocal(date) {
    var local = date;
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    //local.toJSON().substring(0, 10);
    //console.log(local);
    return local;
  }

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
                  <div class="md:flex md:items-center">
                    <select
                      onChange={(e) => setType(e.target.value)}
                      class="border border-grey-light w-full p-3 rounded mb-4 block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                      name="caretaker_type"
                      id="1"
                    >
                      <option value="part-time">Part-time</option>
                      <option value="full-time">Full-time</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Capabilities*/}
          <div class="mt-4">
            <h1 class="mb-2 text-sm">Please indicate your capabilities</h1>
            <form>
              <AnimalCapability onChange={(value) => setSpecies(value)} />
            </form>

            <div>
              <h1 class="font-semibold">Size</h1>
              <h2>Choose your pet size!</h2>
              <button
                class={petBtnLg}
                onClick={(e) => {
                  setPetSize("large");
                  setPetBtnSm("petBtn-sm");
                  setPetBtnMed("petBtn");
                  setPetBtnLg(
                    "petBtn-toggle m-2 w-1/3 px-6 py-2 border border-black rounded transition-all duration-300 opacity-100"
                  );
                }}
              >
                <img
                  alt="Large"
                  src="https://www.flaticon.com/svg/static/icons/svg/91/91544.svg"
                />
                <h3 class="mt-2">Large</h3>
              </button>

              <button
                class={petBtnMed}
                onClick={(e) => {
                  setPetSize("medium");
                  setPetBtnSm("petBtn-sm");
                  setPetBtnMed(
                    "petBtn-toggle m-2 w-1/4 px-6 py-2 border border-black rounded transition-all duration-300 opacity-100"
                  );
                  setPetBtnLg("petBtn-lg");
                }}
              >
                <img
                  alt="Medium"
                  src="https://www.flaticon.com/svg/static/icons/svg/2965/2965396.svg"
                  style={{ transform: "scaleX(-1)" }}
                />
                <h3 class="mt-2">Medium</h3>
              </button>

              <button
                class={petBtnSm}
                onClick={(e) => {
                  setPetSize("small");
                  setPetBtnSm(
                    "petBtn-toggle m-2 w-1/5 px-6 py-2 border border-black rounded transition-all duration-300 opacity-100"
                  );
                  setPetBtnMed("petBtn");
                  setPetBtnLg("petBtn-lg");
                }}
              >
                <img
                  alt="Small"
                  src="https://www.flaticon.com/svg/static/icons/svg/2881/2881761.svg"
                />
                <h3 class="mt-2">Small</h3>
              </button>
            </div>
          </div>

          {/* Dates */}
          <div class="flex mt-4">
            <div>
              <h1 class="mb-2 text-sm">Start date</h1>
              <div class="flex mb-4 space-x-8">
                <Startdatepicker />
              </div>
            </div>

            <div>
              <h1 class="mb-2 text-sm">End date</h1>
              <div class="flex mb-4 space-x-8">
                <Enddatepicker />
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
