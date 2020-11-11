import React, { useState, useEffect } from 'react';
import { client as fetch } from '../../utils/client';
import { useUser } from '../../context/auth-context';
import AddRating from './AddRating';
import { toJSONLocal } from '../../utils/dateutils';
import bg from '../../resources/wallpaper2.jpg';
import '../searchcaretakers/ctprofile.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [bids, setBids] = useState([]);
  const [jobs, setJobs] = useState([]);
  const user = useUser();

  const fetchData = async () => {
    const orderQuery = await fetch(`/users/${user.username}/orders`);
    let bidsQueryPayload = {
      ctuname: user.username,
    };
    const bidsQuery = await fetch(`/jobs/getBids`, { body: bidsQueryPayload });
    const jobsQuery = await fetch(`/jobs/getUpcomingJobs`, {
      body: bidsQueryPayload,
    });
    const r = await Promise.all([orderQuery, bidsQuery, jobsQuery]);
    setOrders(r[0]);
    setBids(r[1]);
    setJobs(r[2]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      <img src={bg} className="min-h-screen object-cover fixed p-0 behind" />
      <div className="flex md:mx-64 flex-col text-center">
        <div className="bg-white rounded-md p-10 mt-20">
          <h1 className="text-3xl font-semibold">Your Upcoming Orders</h1>
          <DisplayOrders tableData={orders?.future_orders} />
        </div>
        <div className="bg-white rounded-md p-10 mt-4">
          <h1 className="text-3xl font-semibold">Your Past Orders</h1>
          <DisplayOrders tableData={orders?.past_orders} canEdit={true} />
        </div>
        <div className="bg-white rounded-md p-10 mt-4">
          <h1 className="text-3xl font-semibold">Your Pending Bids</h1>
          <DisplayOrders
            tableData={orders?.pending_bids}
            isPendingTable={true}
          />
        </div>
        <div className="bg-white rounded-md p-10 mt-4">
          <h1 className="text-3xl font-semibold">Your Past Bids</h1>
          <DisplayOrders tableData={orders?.failed_bids} />
        </div>
        {user?.is_caretaker && (
          <>
            <div className="bg-white rounded-md p-10 mt-4">
              <h1 className="text-3xl font-semibold">Your Job Requests</h1>
              <DisplayBids tableData={bids} user={user} />
            </div>
            <div className="bg-white rounded-md p-10 mt-4">
              <h1 className="text-3xl font-semibold">
                Your Active/Upcoming Jobs
              </h1>
              <DisplayJobs tableData={jobs} user={user} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function DisplayBids({ user, tableData = [], canEdit = false }) {
  const [acceptBidErr, setAcceptBidErr] = useState([]);
  return (
    <div>
      <table className="mt-5">
        <thead>
          <tr>
            <th className="border-t-2 border-b-2 border-gray-400 px-5 py-2 text-gray-800">
              Pet Owner
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
              Accept Bid
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, idx) =>
            generateBidRow(item, idx, canEdit, user, setAcceptBidErr)
          )}
          <td colSpan="7">{acceptBidErr}</td>
        </tbody>
      </table>
    </div>
  );
}

function DisplayJobs({ user, tableData = [], canEdit = false }) {
  const [cancelJobErr, setCancelJobErr] = useState([]);
  return (
    <div>
      <table className="mt-5">
        <thead>
          <tr>
            <th className="border-t-2 border-b-2 border-gray-400 px-5 py-2 text-gray-800">
              Pet Owner
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
              Cancel Job
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, idx) =>
            generateJobRow(item, idx, canEdit, user, setCancelJobErr)
          )}
          <td colSpan="7">{cancelJobErr}</td>
        </tbody>
      </table>
    </div>
  );
}

function DisplayOrders({
  isPendingTable = false,
  tableData = [],
  canEdit = false,
}) {
  const [showModal, setShowModal] = useState(false);
  const [keyJobs, setKeyJobs] = useState();
  const [cancelBidErr, setCancelBidErr] = useState('');
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
            {isPendingTable ? (
              <th className="border-t-2 border-b-2 border-gray-400 px-5 py-2 text-gray-800">
                Cancel Bid
              </th>
            ) : (
              <>
                <th className="border-t-2 border-b-2 border-gray-400 px-5 py-2 text-gray-800">
                  Rating
                </th>
                <th className="border-t-2 border-b-2 border-gray-400 px-5 py-2 text-gray-800">
                  Review
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, idx) =>
            generateRow(
              item,
              idx,
              canEdit,
              setKeyJobs,
              setShowModal,
              isPendingTable
            )
          )}
          {isPendingTable ? <td colSpan="9">{cancelBidErr}</td> : null}
        </tbody>
      </table>
      {showModal ? (
        <AddRating setShowModal={setShowModal} jobKeys={keyJobs} />
      ) : null}
    </div>
  );
}

function generateBidRow(item, idx, canEdit, user, setAcceptBidErr) {
  const handleAcceptOrder = async () => {
    let success = true;
    let jobResPayload = {
      ctuname: user.username,
      start_date: toJSONLocal(item.start_date),
      end_date: toJSONLocal(item.end_date),
    };
    let result = await fetch('/jobs/queryOverlap', {
      body: jobResPayload,
    });
    if (result.length === 0) {
      // able to take job
      let acceptBidPayload = {
        pouname: item.pouname,
        petname: item.petname,
        start_date: toJSONLocal(item.start_date),
        end_date: toJSONLocal(item.end_date),
        ctuname: item.ctuname,
      };
      console.log(acceptBidPayload);
      try {
        await fetch('/jobs/winBid', { body: acceptBidPayload });
      } catch (e) {
        console.log(e);
        setAcceptBidErr(e?.error);
        success = false;
      }
    } else {
      // job list is full
      setAcceptBidErr('Unable to accept bid: Concurrent job limit reached.');
      success = false;
    }
    if (success) {
      window.location.reload(false);
    }
  };
  let initials = item.pouname.match(/\b\w/g) || [];
  initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  return (
    <tr key={idx}>
      <td className="px-5 py-4">
        <span
          className={
            initials.length == 2
              ? 'text-center bg-gray-400 rounded-full p-2 mr-2'
              : 'text-center bg-gray-400 rounded-full py-2 px-4 mr-2'
          }
        >
          <span className="relative">{initials}</span>
        </span>{' '}
        {item.pouname}
      </td>
      <td>{item.petname}</td>
      <td>{item.payment_method}</td>
      <td>{item.transfer_method}</td>
      <td>
        {toJSONLocal(new Date(item.start_date))} -{' '}
        {toJSONLocal(new Date(item.end_date))}
      </td>
      <td>{item.price}</td>
      <td colSpan="2">
        <button
          className="active:bg-pink-600 font-bold uppercase p-2 text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
          type="button"
          style={{ transition: 'all .15s ease' }}
          onClick={handleAcceptOrder}
        >
          Accept
        </button>
      </td>
    </tr>
  );
}

function generateJobRow(item, idx, canEdit, user, setCancelJobErr) {
  const handleCancelJob = async () => {
    let cancelJobPayload = {
      pouname: item.pouname,
      petname: item.petname,
      start_date: toJSONLocal(item.start_date),
      end_date: toJSONLocal(item.end_date),
      ctuname: item.ctuname,
    };
    try {
      await fetch('/jobs/unwinBid', {
        body: cancelJobPayload,
        redirectTo: '/profile/orders',
      });
    } catch (e) {
      console.error(e);
      setCancelJobErr(e?.error);
    }
  };
  let initials = item.pouname.match(/\b\w/g) || [];
  initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  return (
    <tr key={idx}>
      <td className="px-5 py-4">
        <span
          className={
            initials.length == 2
              ? 'text-center bg-gray-400 rounded-full p-2 mr-2'
              : 'text-center bg-gray-400 rounded-full py-2 px-4 mr-2'
          }
        >
          <span className="relative">{initials}</span>
        </span>{' '}
        {item.pouname}
      </td>
      <td>{item.petname}</td>
      <td>{item.payment_method}</td>
      <td>{item.transfer_method}</td>
      <td>
        {toJSONLocal(new Date(item.start_date))} -{' '}
        {toJSONLocal(new Date(item.end_date))}
      </td>
      <td>{item.price}</td>
      <td colSpan="2">
        <button
          className="active:bg-pink-600 font-bold uppercase p-2 text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
          type="button"
          style={{ transition: 'all .15s ease' }}
          onClick={handleCancelJob}
        >
          Cancel Job
        </button>
      </td>
    </tr>
  );
}

function generateRow(
  item,
  idx,
  canEdit,
  setKeyJobs,
  setShowModal,
  isPendingTable,
  setCancelBidErr
) {
  const handleCancelBid = async () => {
    let success = true;
    let cancelBidPayload = {
      pouname: item.pouname,
      petname: item.petname,
      start_date: toJSONLocal(item.start_date),
      end_date: toJSONLocal(item.end_date),
      ctuname: item.ctuname,
    };
    console.log(cancelBidPayload);
    try {
      await fetch('/jobs/removeBid', { body: cancelBidPayload });
    } catch (e) {
      console.log(e);
      setCancelBidErr(e?.error);
      success = false;
    }
    if (success) {
      window.location.reload(false);
    }
  };

  let initials = item.ctuname.match(/\b\w/g) || [];
  initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  return (
    <tr key={idx}>
      <td className="px-5 py-4">
        <span
          className={
            initials.length == 2
              ? 'text-center bg-gray-400 rounded-full p-2 mr-2'
              : 'text-center bg-gray-400 rounded-full py-2 px-4 mr-2'
          }
        >
          <span className="relative">{initials}</span>
        </span>{' '}
        {item.ctuname}
      </td>
      <td>{item.petname}</td>
      <td>{item.payment_method}</td>
      <td>{item.transfer_method}</td>
      <td>
        {toJSONLocal(new Date(item.start_date))} -{' '}
        {toJSONLocal(new Date(item.end_date))}
      </td>
      <td>{item.price}</td>
      {canEdit &&
        (item.rating == null ? (
          <td colspan="2">
            <button
              className="active:bg-pink-600 font-bold uppercase p-2 text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              style={{ transition: 'all .15s ease' }}
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
        ))}
      {isPendingTable && (
        <td>
          <button
            className="active:bg-pink-600 font-bold uppercase p-2 text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
            type="button"
            style={{ transition: 'all .15s ease' }}
            onClick={handleCancelBid}
          >
            Cancel Bid
          </button>
        </td>
      )}
    </tr>
  );
}

export default Orders;
