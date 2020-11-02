import React, { useState } from "react";
import CaretakersCard from "./CaretakersCard";
import Button from "../button";

function SearchResult({ caretakerList, setShowSearchForm }) {
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <>
      <Button onClick={() => setShowSearchForm(true)}>Back to search</Button>
      <div class="flex flex-row justify-center">
        <div class="flex flex-col overflow-auto">
          {caretakerList.length > 0 ? (
            caretakerList.map((x, i) => (
              <CaretakersCard caretaker={x} key={i} />
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
