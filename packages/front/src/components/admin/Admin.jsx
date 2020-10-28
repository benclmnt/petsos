import React, { useState, useEffect } from "react";
import "./admin.css";
import { client as fetch } from "../../utils/client";

function Admin() {
  const [petCategoryTable, setPetCategoryTable] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [addOrEdit, setAddOrEdit] = useState("Add Pet Category");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [size, setSize] = useState("");
  const [basePrice, setBasePrice] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [startItem, setStartItem] = useState("");
  const [endItem, setEndItem] = useState(itemsPerPage);
  const [queryLink, setQueryLink] = useState("/pets/addNewPetCategory");

  useEffect(async () => {
    // GET request using fetch inside useEffect React hook
    const link = "/pets/getPetCategoriesTable";
    const result = await fetch(link);
    setPetCategoryTable(Object.values(result));
    setIsLoaded(true);
    console.log(petCategoryTable);
  }, []);

  const tableLength = petCategoryTable.length - 2;
  let table;

  function pages(length) {
    let a = [];
    for (var i = 0; i < Math.ceil(length / itemsPerPage); i++) {
      a[i] = i + 1;
    }
    return a;
  }

  let tablePages = pages(tableLength).map((item) => {
    const start = (item - 1) * itemsPerPage;
    const end = item * itemsPerPage;
    return (
      <a
        href=""
        onClick={(e) => {
          e.preventDefault();
          setStartItem(start);
          setEndItem(end);
        }}
      >
        {item}
      </a>
    );
  });

  const addPetCategory = async () => {
    const body = {
      species: species,
      breed: breed,
      size: size,
      base_price: parseInt(basePrice),
    };

    console.log(body);

    try {
      const result = await fetch(queryLink, {
        body: body,
      });
    } catch (error) {
      console.error(error);
    }
    window.location.reload(false);
  };

  if (isLoaded) {
    console.log(petCategoryTable);
    if (endItem > tableLength) {
      setEndItem(tableLength);
    }
    table = petCategoryTable.slice(startItem, endItem).map((item) => {
      return (
        <tr>
          <td class="border border-gray-600 px-4 py-2">{item.species}</td>
          <td class="border border-gray-600 px-4 py-2">{item.breed}</td>
          <td class="border border-gray-600 px-4 py-2">{item.size}</td>
          <td class="border border-gray-600 px-4 py-2">{item.base_price}</td>
          <td class="border border-gray-600 px-1 py-2">
            <button
              onClick={() =>
                edit(item.species, item.breed, item.size, item.base_price)
              }
            >
              Edit
            </button>
          </td>
          <td class="border border-gray-600 px-1 py-2">
            <button
              onClick={() => onDelete(item.species, item.breed, item.size)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  const onDelete = async (sp, br, sz) => {
    const link = "/pets/deletePetCategoryBySpciesBreedSize";
    const body = {
      species: sp,
      breed: br,
      size: sz,
    };
    try {
      const result = await fetch(link, {
        body: body,
        method: "DELETE",
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
    window.location.reload(false);
  };

  const edit = (sp, br, sz, bp) => {
    setSpecies(sp);
    setBreed(br);
    setSize(sz);
    setBasePrice(bp.toString());
    setAddOrEdit("Edit Pet Category");
    setQueryLink("/pets/updatePetCategory");
  };

  return (
    <div className="admin h-screen flex justify-center">
      <div class=" text-gray-700 text-center bg-white px-4 py-2 mt-20 rounded-lg w-1/2">
        <h1 class="font-bold text-4xl">Set pet category</h1>

        <div className="flex flex-col justify-center">
          <div className="flex flex-row mt-10 space-x-6 text-left p-5 ">
            <div>
              <h1 class="font-semibold">Species</h1>
              <input
                type="text"
                name="Pet Name"
                value={species}
                placeholder="Pet Name"
                className="flex-shrink-0 rounded-md border-2 border-black p-2"
                onChange={(e) => setSpecies(e.target.value)}
              />
            </div>

            <div>
              <h1 class="font-semibold">Breed</h1>
              <input
                type="text"
                name="Pet Name"
                value={breed}
                placeholder="Pet Name"
                className="flex-shrink-0 rounded-md border-2 border-black p-2"
                onChange={(e) => setBreed(e.target.value)}
              />
            </div>

            <div>
              <h1 class="font-semibold">Size</h1>
              <select
                className="flex-shrink-0 rounded-md border-2 border-black p-2"
                onChange={(e) => setSize(e.target.value)}
              >
                <option value="">Size</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>

            <div>
              <h1 class="font-semibold">Base Price</h1>
              <input
                type="text"
                placeholder="Base Price"
                values={basePrice}
                className="flex-shrink-0 rounded-md border-2 border-black p-2"
                onChange={(e) => {
                  setBasePrice(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col justify-center px-5">
            <button
              className="border-2 border-gray-600"
              onClick={() => addPetCategory()}
            >
              {addOrEdit}
            </button>
            <table className="border-collapse border-2 border-gray-500 mt-5">
              <thead>
                <tr>
                  <th class="border border-gray-600 px-4 py-2 text-gray-800">
                    Species
                  </th>
                  <th class="border border-gray-600 px-4 py-2 text-gray-800">
                    Breed
                  </th>
                  <th class="border border-gray-600 px-4 py-2 text-gray-800">
                    Size
                  </th>
                  <th class="border border-gray-600 px-4 py-2 text-gray-800">
                    Base Price
                  </th>
                  <th class="border border-gray-600 px-4 py-2 text-gray-800">
                    <a
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        setItemsPerPage(itemsPerPage - 1);
                        setStartItem(0);
                        setEndItem(itemsPerPage - 1);
                      }}
                    >
                      {" "}
                      -{" "}
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
                      {" "}
                      +{" "}
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

export default Admin;
