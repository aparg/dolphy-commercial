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
import HotListings from "../HotListings";
import { prependToLocalStorageArray } from "@/helpers/handleLocalStorageArray";
import { plural } from "@/constant/plural";
import is from "date-fns/esm/locale/is/index.js";

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
    minTimestampSql: undefined,
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
      minTimestampSql: filterState.minTimestampSql,
      ...payload,
    };
    try {
      prependToLocalStorageArray("recentSearch", {
        city: queryParams.city
          ? capitalizeFirstLetter(queryParams.city)
          : undefined,
        saleLeaseSearch:
          queryParams.saleLease && capitalizeFirstLetter(queryParams.saleLease),
        searchType: Object.keys(listingType).find(
          (key) => listingType[key]?.value === queryParams.houseType
        ),
      });
    } catch (err) {
      localStorage.removeItem("recentSearch");
    }
    setLoading(true);
    const filteredSalesData = await getFilteredRetsData(queryParams);
    setSalesData([...filteredSalesData]);
    setLoading(false);
    setOffset(INITIAL_LIMIT);
    // setOffset((prev) => {
    //   return prev + INITIAL_LIMIT;
    // });
  };

  const { hotSales, remainingSales } = useMemo(() => {
    // Get today's date in YYYY-MM-DD format
    // const today = new Date().toISOString().split("T")[0];

    // // Separate sales data for today and remaining days
    // const hotSales = [];
    // const remainingSales = [];

    // salesData.forEach((data) => {
    //   // Extract the date part from timestampSql
    //   const datePart = data.TimestampSql.split(" ")[0];
    //   console.log(datePart);

    //   // Check if the datePart matches today's date and only push 5 data to hot sales array
    //   if (datePart === today && hotSales.length < 5) {
    //     hotSales.push(data);
    //   } else {
    //     remainingSales.push(data);
    //   }
    // });

    // return { hotSales, remainingSales };

    // Get the current date and time
    const currentDate = new Date();

    // Calculate the date and time 24 hours ago
    const twentyFourHoursAgo = new Date(
      currentDate.getTime() - 24 * 60 * 60 * 1000
    );

    // Function to check if the data is from 24 hours ago
    const is24HoursAgo = (timestampSql) => {
      const timestampDate = new Date(timestampSql);
      return timestampDate > twentyFourHoursAgo && timestampDate <= currentDate;
    };

    // Separate sales data for 24 hours ago and remaining days
    const hotSales = [];
    const remainingSales = [];

    salesData.forEach((data) => {
      if (is24HoursAgo(data.TimestampSql) && hotSales.length < 5) {
        hotSales.push(data);
      } else {
        remainingSales.push(data);
      }
    });
    return { hotSales, remainingSales };
  }, [salesData]);
  useEffect(() => {
    fetchFilteredData();

    //save in local storage about the filter recently used
  }, []);

  return (
    <div className="container-fluid">
      <h3 className={`main-title fs-2 ${isMobileView ? "pt-3" : "pt-4"}`}>
        Find {filterState.type ? filterState.type : "Commercial Real Estate"}
        {plural[filterState.type]} {filterState.saleLease || "For Sale"} in{" "}
        {capitalizeFirstLetter(city) || "Ontario"}{" "}
        {filterState.priceRange.max
          ? `under $${filterState.priceRange.max}`
          : ``}
      </h3>
      <p
        className="fw-light mb-2"
        style={isMobileView ? { fontSize: "0.9rem" } : {}}
      >
        {/* Streamline your {filterState.type}{" "}
        {city ? capitalizeFirstLetter(city) : ""} commercial real estate search
        by price, or listing type. Explore the latest MLS® listings for
      up-to-date information. */}
        Explore top{" "}
        {filterState.type
          ? `${filterState.type}${plural[filterState.type]}`
          : "Commercial Real Estate"}{" "}
        in {capitalizeFirstLetter(city) || "Ontario"} and select the best ones.
      </p>
      <div className="filter-container flex">
        <Filters {...{ filterState, setFilterState, fetchFilteredData }} />
      </div>
      <HotListings
        // INITIAL_LIMIT={10}
        // saleLeaseValue={saleLeaseValue}
        // city={city}
        // type={type}
        salesData={hotSales}
      />
      <div
        className={`${
          isMobileView ? "pt-3" : "pt-5"
        } row row-cols-1 row-cols-md-3 row-cols-xs-1 row-cols-sm-1 row-cols-lg-4 row-cols-xl-5 g-4 g-md-3`}
      >
        {!loading ? (
          <SalesList
            {...{
              salesData: remainingSales,
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
