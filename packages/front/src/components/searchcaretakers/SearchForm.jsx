import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/datepicker.css';
import { client as fetch } from '../../utils/client';
import { useUser } from '../../context/auth-context';
import { toJSONLocal } from '../../utils/dateutils';
import PetCard from './PetCard';
import { getAllPetCategories } from '../../utils/fetchutils';
import moment from 'moment';

function SearchForm({ setShowSearchForm, setSearchResult }) {
  const user = useUser();
  const [capabilities, setCapabilities] = useState([]);
  const [address, setAddress] = useState({
    country: 'Singapore', //user.country,
    city: 'Singapore',
    postal_code: user == null ? '10000' : user.postal_code,
  });

  const [formState, setFormState] = useState(
    user == null
      ? {
          start_date: new Date(),
          end_date: new Date(),
          species: '',
          breed: '',
          size: '',
          postal_code: '', // TODO: to change to user.postal_code
          country: 'Singapore',
          city: 'Singapore',
        }
      : {
          start_date: new Date(),
          end_date: new Date(),
          species: '',
          breed: '',
          size: '',
          postal_code: user.postal_code, // TODO: to change to user.postal_code
          country: user.country,
          city: user.city,
          ctuname: user.username,
        }
  );

  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  // Pets
  const [pets, setPets] = useState([]);
  const [selected, setSelected] = useState();

  const fetchPets = async () => {
    if (user) {
      try {
        let link = '/users/';
        link += user.username + '/pets';
        const tmp = await fetch(link);
        setPets(Object.values(tmp));
      } catch (err) {
        console.error(err);
        setErrorMsg(err?.error);
        return;
      }
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handlePetChange = (obj) => {
    setFormState({
      ...formState,
      ...obj,
    });
  };

  const petChoices = (
    <div className="md:flex md:space-x-4">
      <select
        name="species"
        required="required"
        className="border border-grey-light w-full md:w-auto p-3 rounded mb-4 block text-gray-500 font-bold md:text-left md:mb-0 pr-4 capitalize"
        onChange={handleChange}
        value={formState.species}
      >
        <option value="" disabled>
          Select species
        </option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
      </select>

      <select
        name="breed"
        required="required"
        className="border border-grey-light w-full md:w-auto p-3 rounded mb-4 block text-gray-500 font-bold md:text-left md:mb-0 pr-4 capitalize"
        onChange={handleChange}
        value={formState.breed}
      >
        <option value="" disabled>
          Select breed
        </option>
        {capabilities[formState.species]?.map((item, idx) => (
          <option value={item} key={idx}>
            {item}
          </option>
        ))}
      </select>

      <select
        name="size"
        required="required"
        className="border border-grey-light w-full md:w-auto p-3 rounded mb-4 block text-gray-500 font-bold md:text-left md:mb-0 pr-4 capitalize"
        onChange={handleChange}
        value={formState.size}
      >
        <option value="" disabled>
          Select size
        </option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
    </div>
  );

  const selectUsersPet = (
    <div className="flex flex-wrap">
      {pets.map((pet, i) => (
        <PetCard
          onClick={() => {
            handlePetChange(pet);
          }}
          Pet={pet}
          setPet={() => {
            handlePetChange(pet);
          }}
          // handlePetChange={() => handlePetChange(pet)}
          key={i}
          id={i}
          selectedID={selected}
          setSelected={setSelected}
        />
      ))}
    </div>
  );

  // Address
  var countryOptions = ['Singapore'];
  var cityOptions = ['Singapore'];

  var addressOptions = (choices, name) => (
    <select
      className="border border-grey-light w-full md:w-auto p-3 rounded mb-4 block text-gray-500 font-bold md:text-left md:mb-0 pr-4"
      name={name}
      id="2"
      required="required"
      onChange={handleAddressChange}
      value={address.name}
    >
      <option value="" disabled>
        Select {name === 'postal_code' ? 'postal code' : name}
      </option>
      {choices.map((x, y) => (
        <option key={y}>{x}</option>
      ))}
    </select>
  );

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // Datepickers
  const dateFormat = 'dd-MM-yyyy';
  const twoYearsFromNow = new Date(moment().add(2, 'years'));

  const StartDatepicker = () => {
    return (
      <DatePicker
        onChange={(date) => setFormState({ ...formState, start_date: date })}
        selected={formState.start_date}
        required="required"
        minDate={moment().toDate()}
        maxDate={twoYearsFromNow}
        dateFormat={dateFormat}
        placeholderText="Start Date"
      />
    );
  };

  const EndDatepicker = () => {
    return (
      <DatePicker
        required="required"
        minDate={formState.start_date}
        maxDate={twoYearsFromNow}
        onChange={(date) => setFormState({ ...formState, end_date: date })}
        selected={formState.end_date}
        dateFormat={dateFormat}
        placeholderText="End Date"
      />
    );
  };

  useEffect(() => {
    (async () => {
      const _tmp = await getAllPetCategories();
      setCapabilities(_tmp);
    })();
  }, []);

  //Search
  const handleSearch = async (e) => {
    e.preventDefault();

    const searchParams = {
      ...formState,
      start_date: toJSONLocal(formState.start_date),
      end_date: toJSONLocal(formState.end_date),
    };

    // generate the query params
    let link = '/caretakers/searchct?';
    const paramsKeyValue = [];
    Object.entries(searchParams).forEach(([key, value]) =>
      paramsKeyValue.push(`${key}=${value}`)
    );
    link += paramsKeyValue.join('&');

    try {
      const tmp = await fetch(link);
      console.log(tmp);
      setSearchResult((_) =>
        tmp?.filter((ct) => ct.ctuname !== user?.username)
      );
      setShowSearchForm(false);
    } catch (err) {
      console.error(err);
      setErrorMsg(err?.error);
      return;
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex-col md:w-1/2 m-auto">
      <div className="bg-white text-black px-10 py-8 rounded-lg shadow-lg space-y-4">
        {errorMsg && <p className="py-3 text-orange-700">{errorMsg}</p>}
        <h1 className="text-3xl text-left font-bold">Find the Perfect Match</h1>

        {/* Pets */}
        {pets.length > 0 && (
          <>
            <div> {selectUsersPet} </div>
            <div class="text-center text-gray-600">or </div>
          </>
        )}

        {petChoices}

        {/* Address */}
        <div>
          <h1 className="mb-2 text-sm">
            What's your address or cross-streets?
          </h1>
          <div className="md:flex md:space-x-4">
            {addressOptions(countryOptions, 'country')}
            {addressOptions(cityOptions, 'city')}
            <input
              class="border p-2"
              type="number"
              name="postal_code"
              defaultValue={formState.postal_code}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Dates */}
        <div>
          <h1 className="mb-2 text-sm">Which dates do you need?</h1>
          <div className="md:flex mb-4 md:space-x-8">
            <StartDatepicker />
            <EndDatepicker />
          </div>
        </div>

        {/* Next Button */}
        <button
          type="submit"
          className="px-8 py-4 rounded-lg bg-orange-500 text-white border border-orange-500 text-base md:text-lg font-semibold hover:bg-orange-600 hover:border-orange-600 duration-300 ease-in-out"
        >
          Search Now!
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
