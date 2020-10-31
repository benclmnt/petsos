import React, { useState, useEffect } from "react";
import { client as fetch } from "../../utils/client";
import { useUser } from "../../context/auth-context";
import AddRating from "./AddRating";
import { toJSONLocal } from "../../utils/dateutils";

function PastOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const user = useUser();

  useEffect(async () => {
    // GET request using fetch inside useEffect React hook
    const link = "/users/getPastOrders/" + user.username;
    const result = await fetch(link);
    setOrders(Object.values(result));
    setIsLoaded(true);
  }, []);

  const [keyJobs, setKeyJobs] = useState({
    pouname: "",
    petname: "",
    start_date: new Date(),
    end_date: new Date(),
    tmethod: "",
  });

  let tableData;
  if (isLoaded) {
    tableData = orders.slice(0, orders.length - 2).map((item) => {
      //const index = pets.indexOf(item);
      var name = item.ctuname;
      var initials = name.match(/\b\w/g) || [];
      initials = (
        (initials.shift() || "") + (initials.pop() || "")
      ).toUpperCase();
      console.log(initials);
      return (
        <tr>
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
          <td colspan={item.rating == null ? "2" : "1"}>
            {item.rating == null ? (
              <button
                className="active:bg-pink-600 font-bold uppercase p-2 text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                style={{ transition: "all .15s ease" }}
                onClick={() => {
                  setShowModal(true);
                  setKeyJobs({
                    pouname: item.pouname,
                    petname: item.petname,
                    start_date: item.start_date,
                    end_date: item.end_date,
                    tmethod: item.transfer_method,
                  });
                }}
              >
                Add review and rating
              </button>
            ) : (
              item.rating
            )}
          </td>
          {item.rating == null ? null : <td>{item.review}</td>}
        </tr>
      );
    });
  }

  return (
    <div className="flex text-center justify-center bg-black h-screen">
      <div className="flex flex-col bg-white rounded-md p-10 mt-40">
        <div className="text-3xl font-semibold">
          <h1>Your Past Orders</h1>
        </div>

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
            <tbody>{tableData}</tbody>
          </table>
        </div>
        {showModal ? (
          <AddRating setShowModal={setShowModal} jobKeys={keyJobs} />
        ) : null}
      </div>
    </div>
  );
}

export default PastOrders;
