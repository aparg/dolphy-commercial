"use client";
import React from "react";
import { useRef, useState, useEffect } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
const BookingDate = () => {
  // const [scrollPosition, setScrollPosition] = useState(0);
  // const [maxScroll, setMaxScroll] = useState(0);
  const cardRef = useRef(null);
  // const containerRef = useRef(null);
  // useEffect(() => {
  //   const containerWidth = containerRef.current.offsetWidth;
  //   const cardsWidth = cardRef.current.scrollWidth;
  //   const maxScrollValue = cardsWidth - containerWidth;
  //   setMaxScroll(maxScrollValue);
  // }, []);

  // const slideLeft = () => {
  //   const newPosition = Math.min(scrollPosition + 100, 0);
  //   console.log(newPosition);
  //   setScrollPosition(newPosition);
  // };

  // const slideRight = () => {
  //   const newPosition = Math.max(scrollPosition - 100, -maxScroll);
  //   console.log(newPosition);
  //   setScrollPosition(newPosition);
  // };

  //give me a slide right and left code for cardref and containerref also set max values
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const slideRight = () => {
    const containerWidth = containerRef.current.offsetWidth;
    const cardsWidth = cardRef.current.scrollWidth;
    const maxScroll = cardsWidth - containerWidth;
    const newPosition = Math.min(scrollPosition - 20, -maxScroll);
    setScrollPosition(newPosition);
  };
  const slideLeft = () => {
    const containerWidth = containerRef.current.offsetWidth;
    const cardsWidth = cardRef.current.scrollWidth;
    const maxScroll = cardsWidth - containerWidth;
    // console.log(maxScroll);
    // console.log(scrollPosition - 20);
    const newPosition = Math.min(scrollPosition + 20, 0);
    console.log(newPosition);
    setScrollPosition(newPosition);
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
      }); // Month is 0-indexed, so we add 1 to get the correct month
    }

    return daysArray;
  }

  // Example usage:
  const year = 2024;
  const month = 3; // 0-based index, so 3 represents April
  const daysArray = getDaysArrayInMonth(year, month);

  return (
    <>
      <div
        className="scroll-container relative overflow-x-scroll"
        ref={containerRef}
      >
        <button
          className="scroll-left position-absolute start-0"
          title="scroll left"
          onClick={slideLeft}
        >
          <SlArrowLeft size={16} />
        </button>
        <button
          className="scroll-right position-absolute end-0"
          title="scroll left"
          onClick={slideRight}
        >
          <SlArrowRight size={16} />
        </button>
        <div
          className="flex"
          style={{ transform: `translateX(${scrollPosition}px)` }}
          ref={cardRef}
        >
          {daysArray.map((data) => (
            <div className="flex flex-col justify-center px-10 py-2 border-gray-500 border-2 items-center mr-1 rounded-md hover:border-cyan-400 cursor-pointer">
              <span className="font-thin">{data.dayName}</span>
              <span className="font-bold">{data.day}</span>
              <span className="font-thinner">{data.month}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BookingDate;
