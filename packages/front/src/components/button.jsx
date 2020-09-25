// src/components/button.js
import React from 'react';

export default function Button({ children, ...buttonProps }) {
  return (
    <button
      className="px-5 py-2 rounded-lg bg-orange-700 text-white-1000 text-xl font-regular uppercase shadow-md hover:shadow-lg ml-8 mt-2"
      {...buttonProps}
    >
      {children}
    </button>
  );
}
