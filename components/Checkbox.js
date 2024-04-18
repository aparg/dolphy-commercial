import React, { useState } from "react";

const Checkbox = ({ ...props }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div className="flex items-center mb-3">
      <div
        className={`w-5 h-5 mr-2 rounded-md border-2 ${
          checked ? `bg-primary-green border-0` : "bg-white"
        } flex items-center justify-center cursor-pointer`}
        onClick={handleChange}
      >
        {checked && (
          <svg
            className={`w-4 h-4 text-black`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default Checkbox;
