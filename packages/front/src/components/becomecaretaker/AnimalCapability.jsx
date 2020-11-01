import React from 'react';

function AnimalCapability({ capability, setCapability }) {
  var breedOptions;
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [capabilities, setCapabilities] = useState([]);
  // const [pet, setPet] = useState({ species: "", breed: "", size: "" });
  // const [species, setSpecies] = useState(0  );

  var makeOptions = () => (
    <select
      className="border border-grey-light w-auto p-3 rounded mb-4 block text-gray-500 font-bold md:text-left md:mb-0 pr-4"
      name="breed"
      id="2"
      required="required"
      onChange={(e) => setCapability(e)}
      value={capability['breed']}
    >
      <option value="" disabled>
        Select breed
      </option>
      {breedOptions.map((x, y) => (
        <option key={y}>{x}</option>
      ))}
    </select>
  );

  // useEffect(async () => {
  //   // GET request using fetch inside useEffect React hook
  //   const link = "/caretakers/categories";
  //   const result = await fetch(link);
  //   setCapabilities(Object.values(result));
  //   setIsLoaded(true);
  //   console.log(capabilities);
  // }, []);

  // let table;

  // if(isLoaded) {
  //   console.log(capabilities[species]);
  //   table = capabilities[species].map((item) => {
  //     return (
  //       <option>{item}</option>
  //     );
  //   })
  // }

  function ShowBreed() {
    switch (capability['species']) {
      case 'dog':
        breedOptions = ['doggy', 'husky', 'shiba inu', 'golden retriever'];
        return makeOptions();

      case 'cat':
        breedOptions = [
          'kitty',
          'morganissa',
          'kucing jalanan',
          'kucing botak',
        ];
        return makeOptions();

      default:
        return null;
    }
  }

  return (
    <div className="flex space-x-4 mb-4 w-full">
      {/* Size */}
      <select
        className="border border-grey-light w-1/5 p-3 rounded mb-4 block text-gray-500 font-bold md:text-left md:mb-0 pr-4"
        name="size"
        id="3"
        required="required"
        onChange={(e) => setCapability(e)}
        defaultValue={capability.size}
      >
        <option value="" disabled>
          Select size
        </option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="big">Large</option>
      </select>

      {/* Species */}
      <select
        className="border border-grey-light w-1/4 p-3 rounded mb-4 block text-gray-500 font-bold md:text-left md:mb-0 pr-4"
        name="species"
        id="1"
        required="required"
        onChange={(e) => setCapability(e)}
        defaultValue={capability.species}
      >
        <option value="" disabled>
          Select species
        </option>
        {/* <option value="0">dog</option>
            <option value="1">cat</option>
              
            <select>
              {table}
            </select> */}
      </select>

      <ShowBreed />
    </div>
  );
}

export default AnimalCapability;
