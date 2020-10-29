import React, { useState, useEffect } from "react";
import { client as fetch } from "../../utils/client";
import { useUser } from "../../context/auth-context";

function PastOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useUser();

  useEffect(async () => {
    // GET request using fetch inside useEffect React hook
    const link = "/users/getPastOrders/" + user.username;
    const result = await fetch(link);
    setOrders(Object.values(result));
    setIsLoaded(true);
  }, []);

  let tableData;
  if (isLoaded) {
    tableData = orders.slice(0, orders.length - 2).map((item) => {
      //const index = pets.indexOf(item);
      return (
        <tr>
          <td className="px-5 py-4">{item.ctuname}</td>
          <td>{item.petname}</td>
          <td>{item.payment_method}</td>
          <td>{item.transfer_method}</td>
          <td>
            {item.start_date} - {item.end_date}
          </td>
          <td>{item.price}</td>
          <td>{item.rating == null ? "Haha" : item.rating}</td>
          <td>{item.review == null ? "haha" : item.review}</td>
        </tr>
      );
    });
  }

  return (
    <div className="flex text-center justify-center bg-black h-screen">
      <div className="bg-white rounded-md p-10 mt-40">
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
      </div>
    </div>
  );
}

export default PastOrders;
