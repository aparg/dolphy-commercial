"use client";
import React, { useState, useMemo, useEffect } from "react";

import SalesList from "@/components/reso/SalesList";
import Filters from "@/components/reso/Filters";

//HELPERS
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";

//CONSTANT
import { saleLease, listingType } from "@/constant";
import { getFilteredRetsData } from "@/actions/fetchCommercialActions";

import useDeviceView from "@/helpers/useDeviceView";
import ResoCard from "./ResoCard";
import { ImSpinner } from "react-icons/im";
import { useInView } from "react-intersection-observer";
import CityResoCard from "./CityResoCard";

const FilteredCommercialList = ({
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
    type: type ? capitalizeFirstLetter(type) : type,
  });
  const [salesData, setSalesData] = useState([]);
  const [offset, setOffset] = useState(0);
  const { isMobileView } = useDeviceView();
  const [loading, setLoading] = useState(true);

  const fetchFilteredData = async (payload) => {
    const queryParams = {
      city: city ? capitalizeFirstLetter(city) : undefined,
      limit: INITIAL_LIMIT,
      houseType: Object.values(listingType).find(
        (type) => type.name === filterState.type
      )?.value,
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
      ...payload,
    };
    setLoading(true);
    const filteredSalesData = await getFilteredRetsData(queryParams);
    setSalesData([...filteredSalesData]);
    setLoading(false);
    setOffset(INITIAL_LIMIT);
    // setOffset((prev) => {
    //   return prev + INITIAL_LIMIT;
    // });
  };

  useEffect(() => {
    fetchFilteredData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="filter-container flex">
        <Filters {...{ filterState, setFilterState, fetchFilteredData }} />
      </div>
      <h2
        className={`city-headline d-flex text-capitalize ${
          isMobileView ? "pt-3" : "pt-4"
        }`}
      >
        Find {filterState.type ? filterState.type : "Commercial Real Estate"}{" "}
        {filterState.saleLease || "For Sale"} in {city || "Ontario"}{" "}
        {filterState.priceRange.max
          ? `under $${filterState.priceRange.max}`
          : ``}
      </h2>
      <p
        className="fw-light"
        style={isMobileView ? { fontSize: "0.9rem" } : {}}
      >
        {/* Streamline your {filterState.type}{" "}
        {city ? capitalizeFirstLetter(city) : ""} commercial real estate search
        by price, or listing type. Explore the latest MLS® listings for
        up-to-date information. */}
        Explore top {filterState.type}s in {city || "Ontario"} and select the
        best ones.
      </p>

      <div
        className={`${
          isMobileView ? "pt-1" : "pt-3"
        } row row-cols-1 row-cols-md-3 row-cols-xs-1 row-cols-sm-1 row-cols-lg-4 row-cols-xl-5 g-y-2 g-md-3`}
      >
        {!loading ? (
          <SalesList
            {...{
              salesData,
              city,
              INITIAL_LIMIT,
              setSalesData,
              offset,
              setOffset,
              filterState,
            }}
          />
        ) : (
          <div className="w-full flex justify-center">
            <ImSpinner size={24} />
          </div>
        )}
        {/* <div ref={ref} className="flex w-screen items-center justify-center">
          {" "}
          {isLoading && <ImSpinner size={24} />}
        </div> */}
      </div>
    </div>
  );
};

export default FilteredCommercialList;
