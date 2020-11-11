import React, { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/datepicker.css';

function AvailabilityForm(props) {
  const dateFormat = 'dd-MM-yyyy';

  const handleAvailabilityChange = (name, value, index) => {
    const list = [...props.availabilityList];
    list[index][name] = value;
    props.setAvailabilityList(list);
  };

  const addAvailability = () => {
    props.setAvailabilityList([
      ...props.availabilityList,
      { start_date: '', end_date: '' },
    ]);
  };

  const removeAvailability = (index) => {
    const list = [...props.availabilityList];
    list.splice(index, 1);
    props.setAvailabilityList(list);
  };

  // Datepickers
  const StartDatepicker = (index) => {
    return (
      <DatePicker
        selected={Date.parse(props.availabilityList[index]['start_date'])}
        required="required"
        onChange={(date) => handleAvailabilityChange('start_date', date, index)}
        dateFormat={dateFormat}
        placeholderText="Start Date"
      />
    );
  };

  const EndDatepicker = (index) => {
    return (
      <DatePicker
        selected={Date.parse(props.availabilityList[index]['end_date'])}
        required="required"
        onChange={(date) => handleAvailabilityChange('end_date', date, index)}
        dateFormat={dateFormat}
        placeholderText="End Date"
      />
    );
  };

  // Buttons
  const removeButton = (
    <button onClick={(i) => removeAvailability(i)}>
      <svg
        className="h-8 w-8"
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
    <button onClick={addAvailability}>
      <svg
        className="h-8 w-8"
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

  return props.availabilityList.map((x, i) => (
    <div className="md:flex md:space-x-4" key={i}>
      {StartDatepicker(i)}
      {EndDatepicker(i)}

      <div className="flex justify-items-end">
        {console.log(props.availabilityList)}
        {props.availabilityList.length > 1 && removeButton}
        {props.availabilityList.length - 1 === i && addButton}
      </div>
    </div>
  ));
}

export default AvailabilityForm;
