import React from 'react';

function Address({ editProfile, address, handleChange }) {
  // Address
  const countryOptions = ['Singapore'];
  const cityOptions = ['Singapore'];

  const addressOptions = (choices, name) => (
    <select
      className="border border-grey-light w-auto p-3 rounded mb-4 block md:text-left md:mb-0 pr-4"
      name={name}
      id="2"
      required="required"
      onChange={handleChange}
      value={address[name]}
    >
      <option value="" disabled>
        Select {name}
      </option>
      {choices.map((x, y) => (
        <option key={y}>{x}</option>
      ))}
    </select>
  );

  const editAddressForm = (
    <div class="flex-col space-y-4">
      <input
        type="text"
        name="address"
        placeholder={address.address}
        onChange={handleChange}
        className="border border-grey-light w-auto p-3 rounded mb-4 block md:text-left md:mb-0 pr-4"
      ></input>
      <div class="flex space-x-4">
        {addressOptions(countryOptions, 'country')}
        {addressOptions(cityOptions, 'city')}
        <input
          type="number"
          name="postal_code"
          placeholder={address.postal_code}
          onChange={handleChange}
          className="border border-grey-light w-auto p-3 rounded mb-4 block md:text-left md:mb-0 pr-4"
        ></input>
      </div>
    </div>
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
