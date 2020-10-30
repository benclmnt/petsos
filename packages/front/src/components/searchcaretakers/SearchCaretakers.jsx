import React, { useState, useEffect } from "react";
import PetCard from "./PetCard";
import SearchResult from "./SearchResult";
import SearchForm from "./SearchForm";

function SearchCaretakers() {
  // const [selectedID, setSelected] = useState();
  const [showSearchForm, setShowSearchForm] = useState(true);
  const [searchResult, setSearchResult] = useState([]);

  return (
    <div
      class="py-20 h-screen my-auto"
      style={{
        backgroundSize: "cover",
        backgroundImage:
          "url(https://img4.goodfon.com/wallpaper/nbig/8/71/sobaka-vzgliad-brevno.jpg)",
        backgroundPosition: "center center",
      }}
    >

      {showSearchForm === true ? (
        <SearchForm
          setShowSearchForm={setShowSearchForm}
          setSearchResult={setSearchResult}
        />
      ) : (
        <SearchResult caretakerList={searchResult} />
      )}
    </div>
  );
}

export default SearchCaretakers;
