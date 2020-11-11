import React from 'react';

function Address({ editProfile, address, handleChange }) {
  // Address
  const countryOptions = ['Singapore'];
  const cityOptions = ['Singapore'];

  const addressOptions = (choices, name) => (
    <select
      className="border border-grey-light w-auto p-3 rounded mb-4 block md:text-left md:mb-0 pr-4"
      name={name}
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
    <div class="flex-col space-y-2">
      <input
        type="text"
        name="address"
        placeholder={address.address}
        onChange={handleChange}
        className="border border-grey-light w-1/2 p-3 rounded mb-4 block md:text-left md:mb-0 pr-4"
      ></input>
      <div class="flex space-x-4">
        {addressOptions(cityOptions, 'city')}
        <input
          type="number"
          name="postal_code"
          placeholder={address.postal_code}
          onChange={handleChange}
          className="border border-grey-light w-1/2 p-3 rounded mb-4 block md:text-left md:mb-0 pr-4"
        ></input>
      </div>
      {addressOptions(countryOptions, 'country')}
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
    <>
      <h1 className="text-2xl font-semibold mb-4 border-b-2 border-orange-900 py-2">
        Address
      </h1>
      {editProfile ? editAddressForm : addressView}
    </>
  );
}

export default Address;
