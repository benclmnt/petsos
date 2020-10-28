import React from "react";
import CaretakersCard from "./CaretakersCard";

function SearchResult({ caretakerList }) {
  // let caretakerList = [{ctuname: "bego", ct_type: "full", avg_rating:"4.5", base_price: "100"},];
  let nani = Object.values(caretakerList);
  return (
    <div>
      {nani.map((x, i) => (
        <CaretakersCard caretaker={x} key={i} />
      ))}
    </div>
  );
}

export default SearchResult;
