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
    <div className="mt-3 container-fluid position-relative">
      <div className=" d-flex justify-content-between pt-5 explore-container">
        <div>
          <h3 className="main-title fs-2">
            Explore New {listingType ? `${listingType}` : ``} Listings in {city}
          </h3>
        </div>

        <div>
          <a
            href={`/ontario/${formattedCity}`}
            className="btn btn-outline-primary float-end btn-explore"
          >
            Explore All
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
        className="row row-cols-lg-5 row-cols-md-3 row-cols-1 g-3"
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
