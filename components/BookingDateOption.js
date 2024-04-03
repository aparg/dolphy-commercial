"use client";
import React from "react";

const BookingDateOption = React.forwardRef(
  ({ data, handleChange, selected, year }, ref) => {
    return (
      <button
        className={`flex flex-col justify-center px-8 py-0 border-2 items-center mr-1 rounded-md hover:border-cyan-400 cursor-pointer ${
          selected ? `border-cyan-400` : `border-gray-500`
        }`}
        ref={ref}
        value={`${
          data.day === "Any"
            ? `any`
            : `${year}-${String(data.monthNumber).padStart(2, "0")}-${String(
                data.day
              ).padStart(2, "0")}`
        }`}
        onClick={(e) => handleChange(e)}
        id="date"
      >
        <span className="font-thin">{data.dayName}</span>
        <span className="font-bold">{data.day}</span>
        <span className="font-thinner">{data.month}</span>
      </button>
    );
  }
);

export default BookingDateOption;
