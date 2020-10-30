import React, { useState, useEffect } from "react";
import CaretakersCard from "./CaretakersCard";
import ReviewsCard from "./ReviewsCard";
import { client as fetch } from "../../utils/client";

function SearchResult({ caretakerList }) {
  const [showReviews, setShowReviews] = useState(false);
  const [ctuname, setCtuname] = useState("");
  const [reviewsList, setReviewsList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [display, setDisplay] = useState();
  //let data;

  // useEffect(async (ctuname) => {
  //   let link = "/caretakers/reviews?";
  //   link += "ctuname=" + ctuname;
  //   data = await fetch(link);
  // }, []);

  const handleSeeReviews = async (ctuname) => {
    // e.preventDefault();
    // generate the query params
    let link = "/caretakers/reviews?";
    link += "ctuname=" + ctuname;

    try {
      const tmp = await fetch(link);
      console.log(tmp);
      //setReviewsList(Object.values(tmp));
      setDisplay(
        Object.values(tmp).map((x, i) => {
          return <ReviewsCard review={x} key={i} />;
        })
      );
    } catch (err) {
      console.error(err);
      setErrorMsg(err?.error);
      return;
    }
  };

  // let itemsToRender;
  // itemsToRender = reviewsList.map((x, i) => {
  //   return (
  //         <ReviewsCard review={x} key={i}
  //       />
  //     );
  // });

  let ctList = Object.values(caretakerList);
  return (
    <div class="flex flex-row justify-center">
      <div class="flex flex-col overflow-auto">
        {ctList.map((x, i) => (
          <CaretakersCard
            caretaker={x}
            key={i}
            handleSeeReviews={() => handleSeeReviews(x.ctuname)}
            setShowReviews={setShowReviews}
          />
        ))}
      </div>

      {/* {showReviews === true ( */}
      <div class="overflow-auto">{display}</div>
      {/* </div> ) : null} */}
    </div>
  );
}

export default SearchResult;
