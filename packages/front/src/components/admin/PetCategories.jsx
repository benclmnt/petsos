import React, { useState, useEffect } from 'react';
import './admin.css';
import { client as fetch } from '../../utils/client';

function PetCategoriesAdmin() {
  const [petCategories, setPetCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [size, setSize] = useState('');
  const [basePrice, setBasePrice] = useState(0);
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
      <span
        key={idx}
        onClick={(e) => {
          e.preventDefault();
          setStartItem(start);
          setEndItem(end);
        }}
      >
        {item}
      </span>
    );
  });

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
          <td className="border border-gray-600 px-4 py-2">{item.species}</td>
          <td className="border border-gray-600 px-4 py-2">{item.breed}</td>
          <td className="border border-gray-600 px-4 py-2">{item.size}</td>
          <td className="border border-gray-600 px-4 py-2">
            {item.base_price}
          </td>
          <td className="border border-gray-600 px-1 py-2">
            <button
              onClick={() =>
                edit(item.species, item.breed, item.size, item.base_price)
              }
            >
              Edit
            </button>
          </td>
          <td className="border border-gray-600 px-1 py-2">
            <button
              onClick={(e) =>
                handleDelete(e, item.species, item.breed, item.size)
              }
            >
              Delete
            </button>
          </td>
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

  return (
    <div className="admin h-screen flex justify-center">
      <div className=" text-gray-700 text-center bg-white px-4 py-2 mt-20 rounded-lg w-1/2">
        <h1 className="font-bold text-4xl">Set pet category</h1>
        <p className="text-orange-700">
          {errorMsg !== '' && 'Error: ' + errorMsg}
        </p>
        <div className="flex flex-col justify-center">
          <div className="flex flex-row mt-10 space-x-6 text-left p-5 ">
            <div>
              <h1 className="font-semibold">Species</h1>
              <input
                type="text"
                name="Pet Name"
                value={species}
                placeholder="Pet Name"
                className="flex-shrink-0 rounded-md border-2 border-black p-2"
                onChange={(e) => setSpecies(e.target.value)}
                disabled={isEdit}
              />
            </div>

            <div>
              <h1 className="font-semibold">Breed</h1>
              <input
                type="text"
                name="Breed"
                value={breed}
                placeholder="Breed"
                className="flex-shrink-0 rounded-md border-2 border-black p-2"
                onChange={(e) => setBreed(e.target.value)}
                disabled={isEdit}
              />
            </div>

            <div>
              <h1 className="font-semibold">Size</h1>
              <input
                type="text"
                name="Size"
                value={size}
                placeholder="Size"
                className="flex-shrink-0 rounded-md border-2 border-black p-2"
                onChange={(e) => setBreed(e.target.value)}
                disabled={isEdit}
              />
            </div>

            <div>
              <h1 className="font-semibold">Base Price</h1>
              <input
                type="text"
                placeholder="Base Price"
                value={basePrice}
                className="flex-shrink-0 rounded-md border-2 border-black p-2"
                onChange={(e) => setBasePrice(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col justify-center px-5">
            <button className="border-2 border-gray-600" onClick={handleUpsert}>
              {isEdit ? 'Edit Pet Category' : 'Add Pet Category'}
            </button>
            <table className="border-collapse border-2 border-gray-500 mt-5">
              <thead>
                <tr>
                  <th className="border border-gray-600 px-4 py-2 text-gray-800">
                    Species
                  </th>
                  <th className="border border-gray-600 px-4 py-2 text-gray-800">
                    Breed
                  </th>
                  <th className="border border-gray-600 px-4 py-2 text-gray-800">
                    Size
                  </th>
                  <th className="border border-gray-600 px-4 py-2 text-gray-800">
                    Base Price
                  </th>
                  <th className="border border-gray-600 px-4 py-2 text-gray-800">
                    <a
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        setItemsPerPage(itemsPerPage - 1);
                        setStartItem(0);
                        setEndItem(itemsPerPage - 1);
                      }}
                    >
                      {' '}
                      -{' '}
                    </a>
                    <a
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        setItemsPerPage(itemsPerPage + 1);
                        setStartItem(0);
                        setEndItem(itemsPerPage + 1);
                      }}
                    >
                      {' '}
                      +{' '}
                    </a>
                  </th>
                </tr>
              </thead>
              <tbody>{table}</tbody>
            </table>

            <div className="text-right space-x-2">{tablePages}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetCategoriesAdmin;
