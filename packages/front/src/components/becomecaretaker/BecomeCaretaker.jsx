import React, { useState } from "react";
import AnimalCapability from "./AnimalCapability";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";
import { client as fetch } from "../../utils/client";
import { useUser } from "../../context/auth-context";

function BecomeCaretaker() {
  const dateFormat = "yyyy-MM-dd";
  const user = useUser();
  const [type, setType] = useState();

  // Capabilities
  const [capabilityList, setCapabilityList] = useState([
    { species: "", breed: "", size: "" },
  ]);

  const [availabilityList, setAvailabilityList] = useState([
    { start_date: "", end_date: "" },
  ]);

  const handleCapabilityChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...capabilityList];
    list[index][name] = value;
    setCapabilityList(list);
  };

  const handleAvailabilityChange = (name, value, index) => {
    const list = [...availabilityList];
    list[index][name] = value;
    setAvailabilityList(list);
  };

  const addCapability = () => {
    setCapabilityList([
      ...capabilityList,
      { species: "", breed: "", size: "" },
    ]);
  };

  const addAvailability = () => {
    setAvailabilityList([
      ...availabilityList,
      { start_date: "", end_date: "" },
    ]);
  };

  const removeCapability = (index) => {
    const list = [...capabilityList];
    list.splice(index, 1);
    setCapabilityList(list);
  };

  const removeAvailability = (index) => {
    const list = [...availabilityList];
    list.splice(index, 1);
    setAvailabilityList(list);
  };

  // Datepickers
  var StartDatepicker = (index) => {
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

  var EndDatepicker = (index) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: user.username,
      ct_type: type,
    };

    try {
      const insertResults = await fetch("/caretakers/insert", { body: data });
      console.log(insertResults);
    } catch (err) {
      console.error(err);
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
      }
    }

    for (let i = 0; i < availabilityList.length; i++) {
      const availability = {
        pc_species: availabilityList[i]["start_date"],
        pc_breed: availabilityList[i]["end_date"],
        ctuname: user.username,
      };

      try {
        const availResults = await fetch("/caretakers/availability", {
          body: availability,
        });
        console.log(availResults);
      } catch (err) {
        console.error(err);
      }
    }
  };

  function toJSONLocal(date) {
    var local = date;
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    //local.toJSON().substring(0, 10);
    //console.log(local);
    return local;
  }

  return (
    <div>
      <br class="mt-16" />
      <form
        class="flex-col max-h-screen max-w-4xl mx-auto bg-white px-20"
        action=""
        onSubmit={handleSubmit}
      >
        <div class="rounded shadow text-black px-12 py-8 space-y-2">
          <h1 class="text-3xl font-bold mb-6">Become a Caretaker!</h1>
          <div>
            {/* Caretaker Type */}
            <h1 class="mb-2 text-sm">What's your commitment?</h1>
            <div class="md:w-1/3">
              <select
                onChange={(e) => setType(e.target.value)}
                required="required"
                class="border border-gray-300 w-full py-2 px-3 rounded mb-4 text-gray-500 font-bold"
                name="caretaker_type"
                id="0"
              >
                <option value="" disabled selected>
                  Select commitment
                </option>
                <option value="part-time">Part-time</option>
                <option value="full-time">Full-time</option>
              </select>
            </div>
          </div>

          {/* Capabilities*/}
          <div>
            <h1 class="text-sm mb-2">Please indicate your capabilities</h1>
            {capabilityList.map((x, i) => {
              return (
                <div class="flex">
                  <AnimalCapability
                    capability={capabilityList[i]}
                    setCapability={(e) => handleCapabilityChange(e, i)}
                  />
                  <div class="w-10">
                    {capabilityList.length > 1 && (
                      <button onClick={(i) => removeCapability(i)}>
                        Remove
                      </button>
                    )}
                    {capabilityList.length - 1 === i && (
                      <button onClick={addCapability}>Add</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Availabilities */}
          <div>
            <h1 class="text-sm mb-2">Please indicate your availabilities!</h1>
            {availabilityList.map((x, i) => {
              return (
                <div class="flex space-x-4">
                  {StartDatepicker(i)}
                  {EndDatepicker(i)}

                  <div class="flex justify-items-end">
                    {availabilityList.length > 1 && (
                      <button onClick={(i) => removeAvailability(i)}>
                        Remove
                      </button>
                    )}
                    {availabilityList.length - 1 === i && (
                      <button onClick={addAvailability}>Add</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submit Button */}
          <div class="items-right">
            <button
              type="submit"
              class="px-6 py-3 rounded-lg hover:bg-orange-500 hover:text-white text-orange-500 border border-orange-500 text-base font-semibold uppercase mt-8 duration-300 ease-in-out"
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
