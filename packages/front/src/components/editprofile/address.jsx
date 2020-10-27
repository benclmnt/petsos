import React, { useState } from "react";

function Address({ user, editProfile }) {
  const [address, setAddress] = useState({
    address: user.address,
    city: user.city,
    country: user.country,
    postal_code: user.postal_code,
  });

  // Address
  var countryOptions = ["Singapore"];
  var cityOptions = ["Singapore"];
  var postalCodeOptions = [1, 2, 3, 4, 5, 6, 7];

  var addressOptions = (choices, name) => (
    <select
      className="border border-grey-light w-auto p-3 rounded mb-4 block md:text-left md:mb-0 pr-4"
      name="address"
      id="2"
      required="required"
      onChange={(e) => setAddress({ name: e.target.value })}
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
        placeholder={address.address}
        className="border border-grey-light w-auto p-3 rounded mb-4 block md:text-left md:mb-0 pr-4"
      ></input>
      <div class="flex space-x-4">
        {addressOptions(countryOptions, "country")}
        {addressOptions(cityOptions, "city")}
        {addressOptions(postalCodeOptions, "postal_code")}
      </div>
    </form>
  );

  const addressView = (
    <div>
      <h1>{address.address}</h1>
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
