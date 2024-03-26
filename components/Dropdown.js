"use client";
import React, { useState } from "react";

const Dropdown = ({ options, text = "white" }) => {
  const [shown, setShown] = useState(false);
  return (
    <div className="relative">
      <button
        className={`sm:px-4 py-2 ${
          shown ? `text-black` : `text-${text}`
        } rounded-md focus:outline focus:text-primary-green bg-transparent ${
          shown && "bg-white"
        }`}
        onClick={() => setShown(!shown)}
      >
        Businesses for Sale
      </button>

      <div
        className={`absolute top-full mt-2 w-40 bg-white rounded-md shadow-lg z-10 ${
          !shown && "hidden"
        }`}
      >
        {options.map((option) => (
          <a
            href={option.link}
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            {option.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
