import * as React from 'react';
import { client as fetch } from '../../utils/client';

function AdminHome() {
  const [stats, setStats] = React.useState({});
  React.useEffect(() => {
    async function fetchData() {
      const result = await fetch('/admin/stats');
      console.log(result);
      setStats(result);
    }
    fetchData();
  }, []);

  return (
    <div className="m-auto">
      <h1 className="font-semibold text-3xl text-white text-center">
        <p>Total user: {stats.users}</p>
        <p>Total full time caretaker: {stats.fulltime_ct}</p>
        <p>Total part time caretaker: {stats.parttime_ct}</p>
        <p>Total profit past 30 days: ${stats.total_profit} </p>
        <p>Caretaker Performances</p>
        {stats.caretakerInsight?.map((insight) => (
          <div className="bg-white text-black text-sm rounded-md">
            <p>
              Mon, Year: {insight.mon}, {insight.yyyy}
            </p>
            <p>Caretaker Name: {insight.ctuname}</p>
            <p>Number of jobs taken: {insight.num_jobs}</p>
            <p>Number of pet days: {insight.pet_days}</p>
          </div>
        ))}
      </h1>
    </div>
  );
}

export default AdminHome;
