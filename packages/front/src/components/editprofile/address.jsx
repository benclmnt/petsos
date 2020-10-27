import React, { useState } from "react";

function Address({ user, editProfile, address, setAddress }) {
  // Address
  var countryOptions = ["Singapore"];
  var cityOptions = ["Singapore"];
  var postalCodeOptions = [1, 2, 3, 4, 5, 6, 7];

  var addressOptions = (choices, name, setFunction) => (
    <select
      className="border border-grey-light w-auto p-3 rounded mb-4 block md:text-left md:mb-0 pr-4"
      name="addr"
      id="2"
      required="required"
      onChange={(e) => setFunction(e.target.value)}
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

  const editAddressForm = (
    <form class="flex-col space-y-4">
      <input
        type="text"
        name="address"
        placeholder={address.addr}
        onChange={(e) =>
          setAddress({
            addr: e.target.value,
            country: address.country,
            city: address.city,
            postal_code: address.postal_code,
          })
        }
        className="border border-grey-light w-auto p-3 rounded mb-4 block md:text-left md:mb-0 pr-4"
      ></input>
      <div class="flex space-x-4">
        {addressOptions(countryOptions, "country", (e) =>
          setAddress({
            addr: address.addr,
            country: e,
            city: address.city,
            postal_code: address.postal_code,
          })
        )}
        {addressOptions(cityOptions, "city", (e) =>
          setAddress({
            addr: address.addr,
            country: address.country,
            city: e,
            postal_code: address.postal_code,
          })
        )}
        {addressOptions(postalCodeOptions, "postal_code", (e) =>
          setAddress({
            addr: address.addr,
            country: address.country,
            city: address.city,
            postal_code: e,
          })
        )}
      </div>
    </form>
  );

  const addressView = (
    <div>
      <h1>{address.addr}</h1>
      <h2>
        {address.city}, {address.postal_code}
      </h2>
      <h2>{address.country}</h2>
    </div>
  );

  return (
    <div className="md:mx-48 text-left">
      <h1 className="text-2xl font-semibold mb-4">Address</h1>
      {editProfile ? editAddressForm : addressView}
    </div>
  );
}

export default Address;
