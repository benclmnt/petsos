import React, { useState, useEffect } from 'react';
import PetCard from './PetCard';
import SearchResult from './SearchResult';
import SearchForm from './SearchForm';
import ReviewsCard from './ReviewsCard';
import './ctprofile.css';

function SearchCaretakers() {
  // const [selectedID, setSelected] = useState();
  const [showSearchForm, setShowSearchForm] = useState(true);
  const [showReviews, setReviews] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  return (
    <div className="h-screen w-screen">
      <img
        src="https://img4.goodfon.com/wallpaper/nbig/8/71/sobaka-vzgliad-brevno.jpg"
        className="min-h-screen w-full bg-cover bg-center fixed behind"
      />
      <div className="py-20 px-4">
        {showSearchForm ? (
          <SearchForm
            setShowSearchForm={setShowSearchForm}
            setSearchResult={setSearchResult}
          />
        ) : (
          <SearchResult
            setShowSearchForm={setShowSearchForm}
            caretakerList={searchResult}
          />
        )}

        <div>
          {showReviews ? (
            <ReviewsCard
              setShowSearchForm={setShowSearchForm}
              setSearchResult={setSearchResult}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default SearchCaretakers;
