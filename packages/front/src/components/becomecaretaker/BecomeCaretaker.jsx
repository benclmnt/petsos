import React, { useState } from "react";
import AnimalCapability from "./AnimalCapability";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../css/datepicker.css";
import { client as fetch } from "../../utils/client";
import { useUser } from "../../context/auth-context";

function _toJSONLocal(date) {
  var local = date;
  local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  console.log(date, local);
  return local.toJSON().substring(0, 10);
}

function BecomeCaretaker() {
  const dateFormat = "dd-MM-yyyy";
  const user = useUser();
  const [type, setType] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  // Capabilities
  const [capabilityList, setCapabilityList] = useState([
    { species: "", breed: "", size: "" },
  ]);

  // capabilities
  const handleCapabilityChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...capabilityList];
    list[index][name] = value;
    setCapabilityList(list);
  };

  const addCapability = () => {
    setCapabilityList([
      ...capabilityList,
      { species: "", breed: "", size: "" },
    ]);
  };

  const removeCapability = (index) => {
    const list = [...capabilityList];
    list.splice(index, 1);
    setCapabilityList(list);
  };

  // Availabilities
  const [availabilityList, setAvailabilityList] = useState([
    { start_date: "", end_date: "" },
  ]);

  const handleAvailabilityChange = (name, value, index) => {
    const list = [...availabilityList];
    list[index][name] = value;
    setAvailabilityList(list);
  };

  const addAvailability = () => {
    setAvailabilityList([
      ...availabilityList,
      { start_date: "", end_date: "" },
    ]);
  };

  const removeAvailability = (index) => {
    const list = [...availabilityList];
    list.splice(index, 1);
    setAvailabilityList(list);
  };

  // Datepickers
  const StartDatepicker = (index) => {
    return (
      <DatePicker
        selected={availabilityList[index]["start_date"]}
        required="required"
        //locale = 'en-SG'
        //disableTime={true}
        onChange={(date) => handleAvailabilityChange("start_date", date, index)}
        dateFormat={dateFormat}
        placeholderText="Start Date"
      />
    );
  };

  const EndDatepicker = (index) => {
    return (
      <DatePicker
        selected={availabilityList[index]["end_date"]}
        required="required"
        //locale = 'en-SG'
        //disableTime={true}
        onChange={(date) => handleAvailabilityChange("end_date", date, index)}
        dateFormat={dateFormat}
        placeholderText="End Date"
      />
    );
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: user.username,
      ct_type: type,
    };

    try {
      const insertResults = await fetch("/caretakers", { body: data });
      console.log(insertResults);
    } catch (err) {
      setErrorMsg(err.error);
      return;
    }

    for (let i = 0; i < availabilityList.length; i++) {
      const availability = {
        ctuname: user.username,
        start_date: _toJSONLocal(availabilityList[i]["start_date"]),
        end_date: _toJSONLocal(availabilityList[i]["end_date"]),
      };

      try {
        const availResults = await fetch("/caretakers/availability", {
          body: availability,
        });
        console.log(availResults);
      } catch (err) {
        console.error(err);
        setErrorMsg(err.error);
      }
    }

    for (let i = 0; i < capabilityList.length; i++) {
      const capability = {
        pc_species: capabilityList[i]["species"],
        pc_breed: capabilityList[i]["breed"],
        pc_size: capabilityList[i]["size"],
        ctuname: user.username,
      };

      try {
        const capabResults = await fetch("/caretakers/capability", {
          body: capability,
        });
        console.log(capabResults);
      } catch (err) {
        console.error(err);
        setErrorMsg(err.error);
      }
    }
  };

  return (
    <div>
      <br className="mt-16" />
      <form
        className="flex-col max-h-screen max-w-4xl mx-auto bg-white px-20"
        action=""
        onSubmit={handleSubmit}
      >
        <div className="rounded shadow text-black px-12 py-8 space-y-2">
          <h1 className="text-3xl font-bold mb-6">Become a Caretaker!</h1>
          <div>
            {/* Caretaker Type */}
            <h1 className="mb-2 text-sm">What's your commitment?</h1>
            <div className="md:w-1/3">
              <select
                onChange={(e) => setType(e.target.value)}
                required="required"
                className="border border-gray-300 w-full py-2 px-3 rounded mb-4 text-gray-500 font-bold"
                name="caretaker_type"
                defaultValue=""
                id="0"
              >
                <option value="" disabled>
                  Select commitment
                </option>
                <option value="part-time">Part-time</option>
                <option value="full-time">Full-time</option>
              </select>
            </div>
          </div>

          {/* Capabilities*/}
          <div>
            <h1 className="text-sm mb-2">Please indicate your capabilities</h1>
            {capabilityList.map((capability, i) => {
              return (
                <div className="flex" key={i}>
                  <AnimalCapability
                    capability={capability}
                    setCapability={(e) => handleCapabilityChange(e, i)}
                  />
                  <div className="w-10">
                    {capabilityList.length > 1 && (
                      <button onClick={removeCapability}>
                        <svg
                          className="h-8 w-8"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 30 30"
                          fill="#b82727"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    )}
                    {capabilityList.length - 1 === i && (
                      <button onClick={addCapability}>
                        <svg
                          className="h-8 w-8"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 30 30"
                          fill="#0fa30a"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Availabilities */}
          <div>
            <h1 className="text-sm mb-2">
              Please indicate your availabilities!
            </h1>
            {availabilityList.map((ignore, i) => {
              return (
                <div className="flex space-x-4" key={i}>
                  {StartDatepicker(i)}
                  {EndDatepicker(i)}

                  <div className="flex justify-items-end">
                    {availabilityList.length > 1 && (
                      <button onClick={(i) => removeAvailability(i)}>
                        <svg
                          className="h-8 w-8"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 30 30"
                          fill="#b82727"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    )}
                    {availabilityList.length - 1 === i && (
                      <button onClick={addAvailability}>
                        <svg
                          className="h-8 w-8"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 30 30"
                          fill="#0fa30a"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="w-full text-center inline-block align-baseline font-bold text-sm text-orange-700 pt-4">
            {errorMsg}
          </p>

          {/* Submit Button */}
          <div className="items-right">
            <button
              type="submit"
              className="px-6 py-3 rounded-lg hover:bg-orange-500 hover:text-white text-orange-500 border border-orange-500 text-base font-semibold uppercase mt-8 duration-300 ease-in-out"
            >
              <span>Submit</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default BecomeCaretaker;
