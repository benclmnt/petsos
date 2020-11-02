import React, { useState, useEffect } from "react";
import { client as fetch } from "../../utils/client";
import { useUser } from "../../context/auth-context";
import AddRating from "./AddRating";
import { toJSONLocal } from "../../utils/dateutils";

function Orders() {
  const [orders, setOrders] = useState([]);
  const user = useUser();

  const fetchData = async () => {
    const result = await fetch(`/users/${user.username}/orders`);
    setOrders(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div class="bg-black min-h-screen">
      <div class="flex md:mx-64 flex-col text-center ">
        <div className="bg-white rounded-md p-10 mt-40">
          <h1 className="text-3xl font-semibold">Your Upcoming Orders</h1>
          <DisplayOrders tableData={orders?.future_orders} />
        </div>
        <div className="bg-white rounded-md p-10 mt-4">
          <h1 className="text-3xl font-semibold">Your Past Orders</h1>
          <DisplayOrders tableData={orders?.past_orders} canEdit={true} />
        </div>
        <div className="bg-white rounded-md p-10 mt-4">
          <h1 className="text-3xl font-semibold">Your Pending Bids</h1>
          <DisplayOrders tableData={orders?.pending_bids} />
        </div>
        <div className="bg-white rounded-md p-10 mt-4">
          <h1 className="text-3xl font-semibold">Your Past Bids</h1>
          <DisplayOrders tableData={orders?.failed_bids} />
        </div>
      </div>
    </div>
  );
}

function DisplayOrders({ tableData = [], canEdit = false }) {
  const [showModal, setShowModal] = useState(false);
  const [keyJobs, setKeyJobs] = useState();
  return (
    <div>
      <table className="mt-5">
        <thead>
          <tr>
            <th className="border-t-2 border-b-2 border-gray-400 px-5 py-2 text-gray-800">
              Caretaker Name
            </th>
            <th className="border-t-2 border-b-2 border-gray-400 px-5 py-2 text-gray-800">
              Pet Name
            </th>
            <th className="border-t-2 border-b-2 border-gray-400 px-5 py-2 text-gray-800">
              Payment Method
            </th>
            <th className="border-t-2 border-b-2 border-gray-400 px-5 py-2 text-gray-800">
              Transfer Method
            </th>
            <th className="border-t-2 border-b-2 border-gray-400 px-5 py-2 text-gray-800">
              Period
            </th>
            <th className="border-t-2 border-b-2 border-gray-400 px-5 py-2 text-gray-800">
              Price
            </th>
            <th className="border-t-2 border-b-2 border-gray-400 px-5 py-2 text-gray-800">
              Rating
            </th>
            <th className="border-t-2 border-b-2 border-gray-400 px-5 py-2 text-gray-800">
              Review
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, idx) =>
            generateRow(item, idx, canEdit, setKeyJobs, setShowModal)
          )}
        </tbody>
      </table>
      {showModal ? (
        <AddRating setShowModal={setShowModal} jobKeys={keyJobs} />
      ) : null}
    </div>
  );
}

function generateRow(item, idx, canEdit, setKeyJobs, setShowModal) {
  let initials = item.ctuname.match(/\b\w/g) || [];
  initials = ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
  return (
    <tr key={idx}>
      <td className="px-5 py-4">
        <span
          className={
            initials.length == 2
              ? "text-center bg-gray-400 rounded-full p-2 mr-2"
              : "text-center bg-gray-400 rounded-full py-2 px-4 mr-2"
          }
        >
          <span className="relative">{initials}</span>
        </span>{" "}
        {item.ctuname}
      </td>
      <td>{item.petname}</td>
      <td>{item.payment_method}</td>
      <td>{item.transfer_method}</td>
      <td>
        {toJSONLocal(new Date(item.start_date))} -{" "}
        {toJSONLocal(new Date(item.end_date))}
      </td>
      <td>{item.price}</td>
      {canEdit && item.rating == null ? (
        <td colspan="2">
          <button
            className="active:bg-pink-600 font-bold uppercase p-2 text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
            type="button"
            style={{ transition: "all .15s ease" }}
            onClick={() => {
              setShowModal(true);
              setKeyJobs(item);
            }}
          >
            Add review and rating
          </button>
        </td>
      ) : (
        <>
          <td>{item.rating}</td>
          <td>{item.review}</td>
        </>
      )}
    </tr>
  );
}
export default Orders;
