"use client";
import React, { useEffect, useRef } from "react";

import CityResoCard from "@/components/reso/CityResoCard";

//ICONS
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { plural } from "@/constant/plural";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import { saleLease } from "@/constant";

const AdditionalListing = ({
  city,
  newSalesData,
  listingType = null,
  saleLeaseValue = null,
}) => {
  const scrollRef = useRef(null); //used to hold scroll value
  const cardRef = useRef(null); //used to hold card width value
  const formattedCity = city.toLowerCase();
  // const slideLeft = () => {
  //   const dynamicWidthOfCard = cardRef.current.offsetWidth;
  //   // @ts-ignore
  //   scrollRef.current.scrollLeft = slider.scrollLeft - dynamicWidthOfCard;
  // };
  // const slideRight = () => {
  //   const dynamicWidthOfCard = cardRef.current.offsetWidth;
  //   // @ts-ignore
  //   scrollRef.current.scrollLeft = slider.scrollLeft + dynamicWidthOfCard;
  // };

  //business is returned as Sale of business so we need to modify it to Business
  const modifyType = (type) => {
    console.log(type);
    if (type == "Sale Of Business") return "business";
    return type;
  };

  const slideLeft = () => {
    const scrollContainer = scrollRef.current;
    const cardWidth = cardRef.current.offsetWidth;
    const scrollAmount = cardWidth * 3; // Adjust the scroll amount as needed
    scrollContainer.scrollLeft -= scrollAmount;
  };

  const slideRight = () => {
    const scrollContainer = scrollRef.current;
    const cardWidth = cardRef.current.offsetWidth;
    const scrollAmount = cardWidth * 3; // Adjust the scroll amount as needed
    scrollContainer.scrollLeft += scrollAmount;
  };

  return (
    <div className="position-relative">
      <div className="d-flex justify-content-between pt-5 explore-container my-0 sm:my-4">
        <div className="w-full flex flex-row justify-between">
          {!listingType ? (
            <h3 className="main-title fs-1 fs-sm-2 ">
              Explore New {listingType ? `${listingType}` : ``} Listings in{" "}
              {city}
            </h3>
          ) : (
            <h3 className="main-title fs-1 fs-sm-2 ">
              Continue searching for{" "}
              {capitalizeFirstLetter(modifyType(listingType))}
              {`${
                plural[capitalizeFirstLetter(modifyType(listingType))] || ""
              }`}{" "}
              in {city} {console.log(saleLeaseValue)}
              {saleLeaseValue &&
                `${
                  Object.values(saleLease).find((data) => {
                    console.log(data.value, saleLeaseValue);
                    return data.value == saleLeaseValue;
                  })?.name
                }`}
            </h3>
          )}
          <a
            href={`/ontario/${formattedCity}${
              listingType ? `/${listingType}` : ""
            }${
              saleLeaseValue
                ? `/${Object.keys(saleLease).find(
                    (key) => saleLease[key].value == saleLeaseValue
                  )}`
                : ``
            }`}
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
