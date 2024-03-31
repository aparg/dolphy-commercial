"use client";
import React, { useEffect, useRef } from "react";

import CityResoCard from "@/components/reso/CityResoCard";

//ICONS
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const AdditionalListing = ({ city, newSalesData, listingType = null }) => {
  const scrollRef = useRef(null); //used to hold scroll value
  const cardRef = useRef(null); //used to hold card width value
  const formattedCity = city.toLowerCase();
  const slideLeft = () => {
    const dynamicWidthOfCard = cardRef.current.offsetWidth;
    // @ts-ignore
    scrollRef.current.scrollLeft = slider.scrollLeft - dynamicWidthOfCard;
  };
  const slideRight = () => {
    const dynamicWidthOfCard = cardRef.current.offsetWidth;
    // @ts-ignore
    scrollRef.current.scrollLeft = slider.scrollLeft + dynamicWidthOfCard;
  };

  return (
    <div className="position-relative">
      <div className="d-flex justify-content-between pt-5 explore-container my-0 sm:my-4">
        <div className="w-full flex flex-row justify-between">
          <h3 className="main-title fs-1 fs-sm-2 ">
            Explore New {listingType ? `${listingType}` : ``} Listings in {city}
          </h3>
          <a
            href={`/commercial/ontario/${formattedCity}`}
            className="btn btn-outline-primary float-end btn-explore px-2 sm:px-2 py-0 sm:py-2 h-6 sm:h-11"
          >
            <span className="hidden sm:inline">Explore </span>All
          </a>
        </div>
      </div>
      <div className="btns d-flex justify-space-between">
        <button
          className="scroll-left position-absolute start-0"
          title="scroll left"
          onClick={slideLeft}
        >
          <SlArrowLeft size={16} />
        </button>
        <button
          className="scroll-right position-absolute end-0"
          title="scroll right"
          onClick={slideRight}
        >
          <SlArrowRight size={16} />
        </button>
      </div>
      <div
        className="row row-cols-lg-5 row-cols-md-3 row-cols-1 g-4"
        id="slider"
        ref={scrollRef}
      >
        {newSalesData?.map((curElem, index) => {
          // if (curElem.PhotoCount > 0) {
          return (
            <CityResoCard
              city={formattedCity}
              key={index}
              curElem={curElem}
              ref={cardRef}
            />
          );
          // }
          // return null
        })}
      </div>
    </div>
  );
};

export default AdditionalListing;
