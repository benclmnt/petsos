import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function SuccessfulBid() {
  return (
    <div className="text-left border-2 border-black rounded-md p-5">
      <p>Caretaker : Drake</p>
      <p>Payment method :</p>
      <p>Period : 18-08-2020 - 19-08-2020</p>
      <p>Price : $15</p>
      <p>Rating : 4.5</p>
      <p>Review : Nice service thank you</p>
    </div>
  );
}

export default SuccessfulBid;
