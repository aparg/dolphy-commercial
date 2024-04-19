"use client";
import React from "react";
import { useRef, useState, useEffect } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import BookingDateOption from "./BookingDateOption";
import TimingList from "./TimingList";
const BookingDate = ({ bannerImage }) => {
  // const [scrollPosition, setScrollPosition] = useState(0);
  // const [maxScroll, setMaxScroll] = useState(0);
  const cardRef = useRef(null);

  //slide right and left code for cardref and containerref
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [timing, setTiming] = useState({
    type: "",
    date: "",
    time: "",
  });
  const slideLeft = (e) => {
    e.preventDefault();
    const scrollContainer = scrollRef.current;
    const cardWidth = cardRef.current.offsetWidth;
    const scrollAmount = cardWidth * 3; // Adjust the scroll amount as needed
    scrollContainer.scrollLeft -= scrollAmount;
  };

  const slideRight = (e) => {
    e.preventDefault();
    const scrollContainer = scrollRef.current;
    const cardWidth = cardRef.current.offsetWidth;
    const scrollAmount = cardWidth * 3; // Adjust the scroll amount as needed
    scrollContainer.scrollLeft += scrollAmount;
  };
  function getDaysInMonth(year, month) {
    // Get the number of days in a month
    return new Date(year, month + 1, 0).getDate();
  }

  function getDaysArrayInMonth(year, month) {
    const daysInMonth = getDaysInMonth(year, month);
    const daysArray = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const day = date.getDate();
      const dayName = date
        .toLocaleDateString("en-US", { weekday: "long" })
        .slice(0, 3);
      const monthName = date
        .toLocaleDateString("default", { month: "long" })
        .slice(0, 3);
      daysArray.push({
        day,
        dayName,
        month: monthName,
        monthNumber: month + 1,
        year,
        selected: false,
      }); // Month is 0-indexed, so we add 1 to get the correct month
    }
    daysArray.unshift({
      day: "Any",
      month: "",
      dayName: "",
      selected: false,
      time: "",
    });
    return daysArray;
  }
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const [daysArray, setDaysArray] = useState(getDaysArrayInMonth(year, month));
  const selectOption = (e, data) => {
    e.preventDefault();
    const updatedDaysArray = daysArray.map((day) => {
      if (day.day === data.day) {
        return { ...day, selected: true };
      } else {
        return { ...day, selected: false };
      }
    });
    setDaysArray(updatedDaysArray);
    handleChange(e);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setTiming((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const submitData = () => {};

  return (
    <div className="relative w-full rounded-md bg-gray-200 flex items-center mt-24">
      <div className="flex overflow-hidden">
        <div className="w-1/2">
          <img
            src={bannerImage}
            alt="property-img"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-1/2 mx-2 p-4 flex flex-col justify-center">
          {/**Schedule a viewing form */}
          <h1 className="font-bold text-3xl my-2 text-center">
            Schedule a viewing
          </h1>
          <div className="flex justify-center">
            <span className="tour-type rounded-pill bg-lime-200 px-1 py-1">
              <button
                className="rounded-pill py-1 px-4 focus:bg-lime-100 focus:border-black"
                onClick={(e) => handleChange(e)}
              >
                In person
              </button>
              <button
                className="rounded-pill py-1 px-4 focus:bg-lime-100 focus:border-black"
                onClick={(e) => handleChange(e)}
              >
                Video Tour
              </button>
            </span>
          </div>
          <div className="relative my-2">
            <div className="w-full flex absolute z-[999] translate-y-[-50%] top-[50%] items-center justify-between">
              <button
                className="w-6 h-6 left-0 border-gray-200 border-2 rounded-full flex justify-center items-center bg-white z-10"
                title="scroll left"
                onClick={slideLeft}
              >
                <SlArrowLeft size={8} />
              </button>
              <button
                className="w-6 h-6 right-0 border-gray-200 border-2 rounded-full flex justify-center items-center bg-white z-10 flex justify-center"
                title="scroll right"
                onClick={slideRight}
              >
                <SlArrowRight size={8} />
              </button>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="flex z-0 scroll-container relative w-full overflow-x-scroll p-2"
                style={{ transform: `translateX(${scrollPosition}px) z-0` }}
                id="slider"
                ref={scrollRef}
              >
                {daysArray.map((data) => (
                  <BookingDateOption
                    ref={cardRef}
                    data={data}
                    key={data.day}
                    handleChange={(e) => selectOption(e, data)}
                    selected={data.selected}
                    year={year}
                  />
                ))}
              </div>
            </div>
          </div>
          <TimingList handleChange={handleChange} />
          <div className="text-md text-center my-2 text-gray-700">
            No obligation or purchase necessary, cancel at any time
          </div>
          <input
            type="submit"
            value="Schedule Tour"
            className="btn bg-primary-green text-white btn-md w-100 mb-3 rounded-pill"
            id="subbtn"
            onClick={submitData}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingDate;
