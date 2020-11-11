import React, { useState, useEffect } from 'react';
import { getAllPetCategories } from '../../utils/fetchutils';
import AnimalCapability from './AnimalCapability';

function CapabilityForm(props) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const _tmp = await getAllPetCategories();
      setCategories(_tmp);
    })();
  }, []);

  const handleCapabilityChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...props.capabilityList];
    list[index][name] = value;
    props.setCapabilityList(list);
  };

  const addCapability = () => {
    props.setCapabilityList([
      ...props.capabilityList,
      { species: '', breed: '', size: '' },
    ]);
  };

  const removeCapability = (index) => {
    const list = [...props.capabilityList];
    list.splice(index, 1);
    props.setCapabilityList(list);
  };

  const removeButton = (
    <button onClick={removeCapability}>
      <svg
        className="w-8"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
        fill="#b82727"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );

  const addButton = (
    <button onClick={addCapability}>
      <svg
        className="w-8"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
        fill="#0fa30a"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );

  return (
    <div>
      {props.capabilityList.map((capability, i) => (
        <div className="md:flex">
          <AnimalCapability
            categories={categories}
            capability={capability}
            setCapability={(e) => handleCapabilityChange(e, i)}
          />
          <div className="w-1/6">
            {props.capabilityList.length > 1 && removeButton}
            {props.capabilityList.length - 1 === i && addButton}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CapabilityForm;
