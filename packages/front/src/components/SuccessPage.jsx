import React from 'react';
import { Link } from 'react-router-dom';
import bg from '../css/success.css';
function SuccessPage() {
  return (
    <div class="success h-screen">
      <div className="md:grid grid-col md:flex-end md:justify-right md:justify-items-end inline">
        <h2 className="text-right mr-8 mt-64 text-xl text-white md:text-4xl font-bold">
          You have successfully registered as a caretaker!
        </h2>
        <Link to="/">
          <button class="mr-8 mt-4 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded duration-300 ease-in-out">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SuccessPage;
