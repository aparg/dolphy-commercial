"use client";
import React from "react";

const BookingDateOption = React.forwardRef(
  ({ data, handleChange, selected, year }, ref) => {
    return (
      <button
        className={`flex flex-col text-black justify-center px-8 py-0 border-black border-2 items-center mr-1 rounded-md cursor-pointer ${
          selected && `bg-lime-200 `
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
        <span className="font-thin uppercase text-sm">{data.dayName}</span>
        <span className="font-bold text-xl">{data.day} </span>
        <span className="font-bold text-sm">{data.month} </span>
      </button>
    );
  }
);

export default BookingDateOption;
