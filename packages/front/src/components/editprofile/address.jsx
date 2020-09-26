import React, { Component } from 'react';

class Address extends Component {
  state = {};
  render() {
    return (
      <div className="mx-48 mt-20 text-left">
        <p className="font-semibold ">Add your address</p>
        <form>
          <label>
            <p className="mt-2 font-semibold ">Address Line 1</p>
            <input
              type="text"
              name="name"
              className="border-gray-400 border-2 h-full w-full rounded-md p-1"
            />
            <br />
          </label>
          <label>
            <p className="mt-2 font-semibold">Address Line 2</p>
            <input
              type="text"
              name="name"
              className="border-gray-400 border-2 w-full rounded-md p-1"
            />
            <br />
          </label>
          <div className="flex justify-between mt-2">
            <label>
              <p className="mt-2 font-semibold">City</p>
              <input
                type="text"
                name="name"
                className="border-gray-400 border-2 w-full rounded-md p-1"
              />
            </label>
            <label>
              <p className="mt-2 font-semibold">State or province</p>
              <input
                type="text"
                name="name"
                className="border-gray-400 border-2 w-full rounded-md p-1"
              />
            </label>
            <label>
              <p className="mt-2 font-semibold">ZIP/postal/postcode</p>
              <input
                type="text"
                name="name"
                className="border-gray-400 border-2 w-full rounded-md p-1"
              />
            </label>
          </div>
          <label>
            <p className="mt-2 font-semibold">Country</p>
            <input
              type="text"
              name="name"
              className="border-gray-400 border-2 rounded-md p-1"
            />
          </label>
        </form>
      </div>
    );
  }
}

export default Address;
