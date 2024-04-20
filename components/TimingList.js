"use client";
import React from "react";

const timings = [
  {
    name: "Morning",
    time: "8am-12pm",
  },
  {
    name: "Afternoon",
    time: "12pm-4pm",
  },
  {
    name: "Evening",
    time: "4pm-8pm",
  },
];
const TimingList = ({ handleChange }) => {
  return (
    <div className="w-full flex justify-between">
      {timings.map((timing) => (
        <button
          className={`flex flex-col text-black justify-center sm:px-5 px-2 sm:py-2 py-1 border-black border-2 items-center mr-1 rounded-md cursor-pointer focus:bg-lime-200`}
          onClick={(e) => handleChange(e)}
          id="date"
          value={timing.time}
        >
          <span className="font-bold text-md">{timing.name}</span>
          <span className="font-thin text-xs">{timing.time} </span>
        </button>
      ))}
    </div>
  );
};

export default TimingList;
