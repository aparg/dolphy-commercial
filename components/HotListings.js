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

const plural = {
  Retail: " Businesses",
  Industrial: " Businesses",
  Office: "",
  Land: "s",
  Business: "es",
};
const HotListings = ({
  INITIAL_LIMIT,
  city = undefined,
  type = undefined,
  saleLeaseValue = undefined,
}) => {
  const [filterState, setFilterState] = useState({
    saleLease: saleLeaseValue ? saleLease[saleLeaseValue].name : "For Sale",
    priceRange: {
      min: 0,
      max: 0,
    },
    type: type && capitalizeFirstLetter(type),
    minTimestampSql: undefined,
  });

  const scrollRef = useRef(null); //used to hold scroll value
  const cardRef = useRef(null); //used to hold card width value
  const formattedCity = city ? city.toLowerCase() : undefined;
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

  const [salesData, setSalesData] = useState([]);
  const [offset, setOffset] = useState(0);
  const { isMobileView } = useDeviceView();
  const [loading, setLoading] = useState(true);

  const fetchFilteredData = async (payload) => {
    const queryParams = {
      city: city ? capitalizeFirstLetter(city) : undefined,
      limit: INITIAL_LIMIT,
      houseType: undefined,
      // Object.values(listingType).find(
      //   (type) => type.name === filterState.type
      // )?.value || undefined,
      offset: 0,
      hasBasement: undefined,
      maxListPrice: 0,
      minListPrice: 0,
      sepEntrance: undefined,
      washroom: undefined,
      saleLease:
        Object.values(saleLease).filter(
          (state) => state.name === filterState.saleLease
        )[0].value || undefined,
      minTimestampSql: numberOfDays.Today.value,
      ...payload,
    };
    console.log(numberOfDays.Today.value);
    setLoading(true);
    console.log(queryParams);
    const filteredSalesData = await getFilteredRetsData(queryParams);
    console.log(filteredSalesData);
    setSalesData([...filteredSalesData]);
    setLoading(false);
    setOffset(INITIAL_LIMIT);
  };

  useEffect(() => {
    fetchFilteredData();
  }, []);
  if (salesData.length > 0)
    return (
      <div
        className="position-relative rounded-xl px-2 sm:px-6 mt-4"
        style={{
          background: "linear-gradient(90deg, #ff924d 0, #ff6a5b)",
        }}
      >
        <div className="d-flex justify-content-between pt-5 explore-container my-0 sm:my-4">
          <div className="w-full flex flex-row justify-between">
            <h3 className="main-title fs-2 fs-sm-2 text-white">
              Hot Listings Today!
            </h3>
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
          {salesData?.map((curElem, index) => {
            // if (curElem.PhotoCount > 0) {
            return (
              <CityResoCard
                city={formattedCity}
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
    );
};

export default HotListings;
