import React, { useState, useEffect } from 'react';
import { client as fetch } from '../../utils/client';

function PetCategoriesAdmin() {
  const [petCategories, setPetCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [size, setSize] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [startItem, setStartItem] = useState('');
  const [endItem, setEndItem] = useState(itemsPerPage);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    async function fetchData() {
      const result = await fetch('/pets/categories');
      setPetCategories(result);
      setIsLoaded(true);
    }
    fetchData();
  }, []);

  const tableLength = petCategories.length - 2;
  let table;

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

  const editIcon = (
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
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      ></path>
    </svg>
  );

  const deleteIcon = (
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
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      ></path>
    </svg>
  );

  const handleUpsert = async (e) => {
    e.preventDefault();

    const body = {
      species: species,
      breed: breed,
      size: size,
      base_price: parseInt(basePrice),
    };

    try {
      const result = await fetch('/pets/categories', {
        body: body,
        method: isEdit ? 'PUT' : 'POST',
      });
      setPetCategories(result);
      setSpecies('');
      setBreed('');
      setSize('');
      setBasePrice('');
      setErrorMsg('');
    } catch (error) {
      console.error(error);
      setErrorMsg(error.error);
    }
  };

  if (isLoaded) {
    if (endItem > tableLength) {
      setEndItem(tableLength);
    }
    table = petCategories.slice(startItem, endItem).map((item, idx) => {
      return (
        <tr key={idx}>
          <td className="border-b border-orange-900 px-4 py-2">
            {item.species}
          </td>
          <td className="border-b border-orange-900 px-4 py-2">{item.breed}</td>
          <td className="border-b border-orange-900 px-4 py-2">{item.size}</td>
          <td className="border-b border-orange-900 px-4 py-2">
            {item.base_price}
          </td>

          <button
            className="border-none ml-4 my-1 hover:text-orange-600 font-semibold"
            onClick={() =>
              edit(item.species, item.breed, item.size, item.base_price)
            }
          >
            {editIcon}
          </button>
          <button
            className="border-none mx-2 my-1 hover:text-red-500 font-semibold"
            onClick={(e) =>
              handleDelete(e, item.species, item.breed, item.size)
            }
          >
            {deleteIcon}
          </button>
        </tr>
      );
    });
  }

  const handleDelete = async (e, sp, br, sz) => {
    e.preventDefault();
    const body = {
      species: sp,
      breed: br,
      size: sz,
    };
    try {
      const result = await fetch('/pets/categories', {
        body,
        method: 'DELETE',
      });
      setPetCategories(result);
      setErrorMsg('');
    } catch (error) {
      console.error(error);
      setErrorMsg(error.error);
    }
  };

  const edit = (sp, br, sz, bp) => {
    setSpecies(sp);
    setBreed(br);
    setSize(sz);
    setBasePrice(bp?.toString());
    setIsEdit(true);
  };

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

  const inputStyle =
    'rounded-md border-2 border-orange-900 border-opacity-25 p-2 capitalize';

  const headerStyle =
    'border-b-2 border-t-2 border-orange-900 px-4 py-2 text-orange-900';

  return (
    <div className="flex mx-auto my-auto text-orange-900 text-center w-full md:px-48">
      <div className="bg-white space-y-4 px-10 py-6 mx-auto rounded-lg shadow-lg">
        <h1 className="font-bold text-2xl uppercase">Pet Categories</h1>

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

        <table className="justify-self-stretch border-collapse border-orange-900 border-r-0 border-b-0 my-5 capitalize">
          <thead>
            <tr>
              <th className={headerStyle}>Species</th>
              <th className={headerStyle}>Breed</th>
              <th className={headerStyle}>Size</th>
              <th className={headerStyle}>Base Price</th>
            </tr>
          </thead>
          <tbody>{table}</tbody>
        </table>

        <div className="text-center space-x-4">{tablePages}</div>
      </div>

      <div className="flex flex-col md:w-1/3 mb-auto space-y-4 bg-white px-16 py-6 rounded-lg shadow-lg">
        <div>
          <h1 className="font-bold text-xl uppercase">Set Pet Category</h1>
          <p className="text-orange-700">
            {errorMsg !== '' && 'Error: ' + errorMsg}
          </p>
        </div>

        <select
          name="Pet Name"
          value={species}
          placeholder="Species"
          className={inputStyle}
          onChange={(e) => setSpecies(e.target.value)}
          disabled={isEdit}
          required="required"
        >
          <option value="" disabled="true">
            Select Species
          </option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
        </select>

        <input
          type="text"
          name="Breed"
          value={breed}
          placeholder="Breed"
          className={inputStyle}
          onChange={(e) => setBreed(e.target.value)}
          disabled={isEdit}
          required="required"
        />
        <select
          name="size"
          value={size}
          placeholder="Size"
          className={inputStyle}
          onChange={(e) => setSize(e.target.value)}
          disabled={isEdit}
          required="required"
        >
          <option value="" disabled="true">
            Select Size
          </option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
        <input
          type="text"
          placeholder="Base Price"
          value={basePrice}
          className={inputStyle}
          onChange={(e) => setBasePrice(e.target.value)}
        />

        <button
          className="px-6 py-3 rounded-lg hover:bg-orange-500 hover:text-white text-orange-500 border border-orange-500 text-sm font-semibold uppercase duration-300 ease-in-out"
          onClick={handleUpsert}
        >
          {isEdit ? 'Edit Pet Category' : 'Add Pet Category'}
        </button>
      </div>
    </div>
  );
}

export default PetCategoriesAdmin;
