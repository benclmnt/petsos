import React, { Component } from "react";

class Balance extends Component {
  state = {};
  render() {
    return (
      <div className="bg-white p-5 rounded-lg">
        <p className="border-b-2 border-black pb-3">Rover Balance</p>
        <div className="text-center mt-3">
          <p className="text-3xl">$0.00</p>
          <p className="font-3xl">REDEEMABLE</p>
          <p>Withdraw Money</p>
        </div>
      </div>
    );
  }
}

export default Balance;
