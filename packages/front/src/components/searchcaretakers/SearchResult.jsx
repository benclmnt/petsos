import React, { useState } from 'react';
import CaretakersCard from './CaretakersCard';
import Button from '../button';

function SearchResult({ caretakerList, setShowSearchForm }) {
  const [errorMsg, setErrorMsg] = useState('');

  return (
    <>
      <div class="h-screen justify-center px-48">
        <button
          class="mx-0 mb-10 px-5 py-2 rounded-lg bg-orange-600 text-white text-xl font-regular uppercase shadow-md hover:shadow-lg"
          onClick={() => setShowSearchForm(true)}
        >
          Back to search
        </button>
        <div class="grid grid-cols-2 gap-4">
          {caretakerList.length > 0 ? (
            caretakerList.map((x, i) => (
              <CaretakersCard class="col-span-1" caretaker={x} key={i} />
            ))
          ) : (
            <div class="text-white">Sorry, no caretakers found</div>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchResult;
