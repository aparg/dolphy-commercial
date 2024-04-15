"use client";
import React, { useState } from "react";

const Dropdown = ({ name, options, text = "white", isSticky, isHomePage }) => {
  const [shown, setShown] = useState(false);
  return (
    <div className="relative">
      <button
        className={`sm:px-4 py-2 font-medium ${
          shown ? `text-black` : `text-${text}`
        } rounded-md focus:outline focus:text-primary-green bg-transparent ${
          shown && "bg-white"
        } ${
          isSticky || !isHomePage
            ? `hover:text-primary-green`
            : `hover:text-green-200`
        }`}
        onClick={() => setShown(!shown)}
      >
        {name}
      </button>

      <div
        className={`absolute top-full mt-2 w-40 bg-white rounded-md shadow-lg z-[999] text-sm ${
          !shown && "hidden"
        }`}
      >
        {options.map((option) => (
          <a
            href={option.link}
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 hover:rounded-md"
            key={option.name}
          >
            {option.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
