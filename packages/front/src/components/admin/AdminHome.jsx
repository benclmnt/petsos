import React, { useState, useEffect } from 'react';
import { client as fetch } from '../../utils/client';

function AdminHome() {
  const [stats, setStats] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [startItem, setStartItem] = useState('');
  const [endItem, setEndItem] = useState(itemsPerPage);

  useEffect(() => {
    async function fetchData() {
      const result = await fetch('/admin/stats');
      console.log(result);
      setStats(result);
    }
    fetchData();
  }, []);

  const tableLength = stats.caretakerInsight?.length - 2;
  let table;
  const rowStyle = 'border-b border-orange-900 px-4 py-2 text-center';
  table = stats.caretakerInsight
    ?.slice(startItem, endItem)
    .map((insight, idx) => {
      return (
        <tr key={idx}>
          <td className={rowStyle}>{insight.ctuname}</td>
          <td className={rowStyle}>
            {insight.mon} {insight.yyyy}
          </td>
          <td className={rowStyle}>{insight.num_jobs}</td>
          <td className={rowStyle}>{insight.pet_days}</td>
        </tr>
      );
    });

  function pages(length) {
    let a = [];
    for (var i = 0; i < Math.ceil(length / itemsPerPage); i++) {
      a[i] = i + 1;
    }
    return a;
  }

  let tablePages = pages(tableLength).map((item, idx) => {
    const start = (item - 1) * itemsPerPage;
    const end = item * itemsPerPage;
    return (
      <button
        key={idx}
        onClick={(e) => {
          e.preventDefault();
          setStartItem(start);
          setEndItem(end);
        }}
        className="focus:font-bold focus:outline-none"
      >
        {item}
      </button>
    );
  });

  const addRowIcon = (
    <svg
      class="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
  );

  const removeRowIcon = (
    <svg
      class="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
  );

  const rowSettings = (
    <div className="inline-flex space-x-4 text-orange-900 opacity-75">
      <button
        className="hover:text-red-500"
        onClick={(e) => {
          e.preventDefault();
          setItemsPerPage(itemsPerPage - 1);
          setStartItem(0);
          setEndItem(itemsPerPage - 1);
        }}
      >
        {removeRowIcon}
      </button>
      <h2>Rows</h2>
      <button
        className="hover:text-green-500"
        onClick={(e) => {
          e.preventDefault();
          setItemsPerPage(itemsPerPage + 1);
          setStartItem(0);
          setEndItem(itemsPerPage + 1);
        }}
      >
        {addRowIcon}
      </button>
    </div>
  );

  const headerStyle =
    'border-b-2 border-t-2 border-orange-900 px-4 py-2 text-orange-900';

  return (
    <div className="flex mx-auto my-auto text-orange-900 w-full md:px-48">
      <div className="bg-white space-y-4 px-10 py-6 mx-auto mb-auto rounded-lg shadow-lg text-center">
        <h1 className="font-bold text-2xl">Caretaker Performances</h1>
        {rowSettings}
        <table className="justify-self-stretch border-collapse border-orange-900 border-r-0 border-b-0 my-5 capitalize">
          <thead>
            <tr>
              <th className={headerStyle}>Caretaker</th>
              <th className={headerStyle}>MM/YYYY</th>
              <th className={headerStyle}>Jobs Taken</th>
              <th className={headerStyle}>Pet Days</th>
            </tr>
          </thead>
          <tbody>{table}</tbody>
        </table>
        <div className="text-center space-x-4">{tablePages}</div>
      </div>

      <div className="bg-white px-10 py-6 mx-auto mb-auto rounded-lg shadow-lg">
        <h1 className="font-bold text-2xl text-center">Admin Stats</h1>
        <div className="font-semibold text-orange-800">
          <table className="justify-self-stretch border-collapse border-orange-900 border-r-0 border-b-0 my-5 capitalize">
            <thead>
              <tr>
                <th className="font-bold text-lg uppercase border-b-2 border-orange-900 text-left py-2">
                  Total
                </th>
                <th className="font-bold text-lg uppercase border-b-2 border-orange-900 text-left py-2"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-1">Users</td>
                <td className="py-1 font-bold text-right pr-4">
                  {stats.users}
                </td>
              </tr>
              <tr>
                <td className="py-1">Caretakers</td>
                <td className="py-1 font-bold text-right pr-4">
                  {parseInt(stats.fulltime_ct) + parseInt(stats.parttime_ct)}
                </td>
              </tr>
              <tr>
                <td className="py-1">Full-time</td>
                <td className="py-1 font-bold text-right pr-4">
                  {stats.fulltime_ct}
                </td>
              </tr>
              <tr>
                <td className="py-1">Part-time</td>
                <td className="py-1 font-bold text-right pr-4">
                  {stats.parttime_ct}
                </td>
              </tr>
              <tr>
                <td className="py-1 pr-4">
                  Profit <br />
                  (past 30 days)
                </td>
                <td
                  className={
                    parseInt(stats.total_profit) < 0
                      ? 'py-1 text-red-600 font-bold text-right pr-4'
                      : 'py-1 text-green-600 font-bold text-right pr-4'
                  }
                >
                  {parseInt(stats.total_profit) < 0 && '−'}$
                  {Math.abs(parseInt(stats.total_profit))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
