import React, { useState, useEffect } from 'react';
import { client as fetch } from '../../utils/client';
import { toJSONLocal } from '../../utils/dateutils';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

function AddRating({ setShowModal, jobKeys }) {
  const [rating, setRating] = useState();
  const [review, setReview] = useState('');

  const onSubmit = async () => {
    const body = {
      pouname: jobKeys.pouname,
      petname: jobKeys.petname,
      start_date: toJSONLocal(jobKeys.start_date),
      end_date: toJSONLocal(jobKeys.end_date),
      rating: parseFloat(rating),
      review: review,
    };
    // console.log(body);

    try {
      const result = await fetch('/users/setRatingAndReview', {
        body: body,
        redirectTo: '/profile/orders',
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                <h3 className="text-3xl font-semibold">Review order</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="flex flex-col text-left relative p-6 flex-auto">
                <p>Caretaker : {jobKeys.pouname}</p>
                <p>Pet name : {jobKeys.petname}</p>
                <p>Transfer method : {jobKeys.transfer_method}</p>
                <p>
                  Period : {toJSONLocal(jobKeys.start_date)} to{' '}
                  {toJSONLocal(jobKeys.end_date)}
                </p>
                <div>
                  <span>Rating :</span>
                  <Box component="fieldset" borderColor="transparent">
                    {/* <Typography component="legend">Rating</Typography> */}
                    <Rating
                      className="inline-block"
                      name="rating"
                      defaultValue={rating}
                      precision={0.5}
                      onChange={(e) => setRating(e.target.value)}
                    />
                  </Box>
                </div>
                <h1 className="">Review :</h1>
                <input
                  type="text"
                  name="Review"
                  placeholder="Review"
                  className="px-2 py-1 mt-2 text-black"
                  onChange={(e) => setReview(e.target.value)}
                />
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  style={{ transition: 'all .15s ease' }}
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  style={{ transition: 'all .15s ease' }}
                  onClick={() => {
                    setShowModal(false);
                    onSubmit();
                  }}
                >
                  Submit rating and review
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    </div>
  );
}

export default AddRating;
