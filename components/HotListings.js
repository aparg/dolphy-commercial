"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";

//HELPERS
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";

//CONSTANT
import { saleLease, listingType, numberOfDays } from "@/constant";
import { getFilteredRetsData } from "@/actions/fetchCommercialActions";
import useDeviceView from "@/helpers/useDeviceView";
import CityResoCard from "./reso/CityResoCard";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Image } from "react-bootstrap";

const plural = {
  Retail: " Businesses",
  Industrial: " Businesses",
  Office: "",
  Land: "s",
  Business: "es",
};
const HotListings = ({ salesData }) => {
  const scrollRef = useRef(null); //used to hold scroll value
  const cardRef = useRef(null); //used to hold card width value
  // const formattedCity = city ? city.toLowerCase() : undefined;
  // const [salesData, setSalesData] = useState([]);
  // const [offset, setOffset] = useState(0);
  const { isMobileView } = useDeviceView();
  const scrollAmt = () => {
    if (isMobileView) {
      return 1;
    }
    return 3;
  };
  // useEffect(() => {
  //   fetchFilteredData();
  // }, []);

  return salesData?.length > 0 ? (
    <div
      className="position-relative rounded-xl px-2 mt-16 z-10 "
      style={{
        background:
          "linear-gradient(90deg, rgb(255,203,171) 0px, rgb(249,194,189))",
      }}
    >
      <div className="w-full absolute top-[-50px] z-[999]">
        <Image
          src="/hot-listings.png"
          alt="hot listing"
          className="mx-auto z-[20] w-20"
        />
      </div>
      {/* <div className="d-flex justify-content-between pt-3 explore-container my-1 z-0">
        <div className="w-full flex flex-row justify-between">
          <h3 className="main-title fs-2 fs-sm-2 text-white">
            Hot Listings Today!
          </h3>
        </div>
      </div> */}
      {/* <div className="absolute left-0 w-full h-full flex justify-between items-center">
        <button
          className="w-8 h-8 absolute top-40 left-0 border-gray-200 border-2 rounded-full flex justify-center items-center bg-white z-10"
          title="scroll left"
          onClick={slideLeft}
        >
          <SlArrowLeft size={16} />
        </button>
        <button
          className="w-8 h-8 absolute top-40 right-0 border-gray-200 border-2 rounded-full flex justify-center items-center bg-white z-10 "
          title="scroll right"
          onClick={slideRight}
        >
          <SlArrowRight size={16} />
        </button>
      </div> */}
      <div className="overflow-hidden">
        <div
          className="py-2 row row-cols-lg-5 row-cols-md-3 row-cols-1 gx-4 my-4"
          id="slider"
          ref={scrollRef}
        >
          {salesData?.map((curElem, index) => {
            // if (curElem.PhotoCount > 0) {
            return (
              <CityResoCard
                // city={formattedCity}
                key={index}
                curElem={curElem}
                ref={cardRef}
                small={true}
              />
            );
            // }
            // return null
          })}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default HotListings;
