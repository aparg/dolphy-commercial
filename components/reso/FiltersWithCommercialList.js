"use client";
import React, { useState } from "react";

import SalesList from "@/components/reso/SalesList";
import Filters from "@/components/reso/Filters";

//HELPERS
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";

//CONSTANT
import { saleLease, listingType } from "@/constant";
import { getFilteredRetsData } from "@/actions/fetchCommercialActions";

import useDeviceView from "@/helpers/useDeviceView";

const FiltersWithCommercialList = ({
  commercialListData,
  INITIAL_LIMIT,
  city,
}) => {
  const [filterState, setFilterState] = useState({
    saleLease: saleLease.sale.name,
    priceRange: {
      min: 0,
      max: 0,
    },
    type: null,
  });
  const [salesData, setSalesData] = useState(commercialListData);
  const [offset, setOffset] = useState(INITIAL_LIMIT);

  const { isMobileView } = useDeviceView();

  const fetchFilteredData = async (payload) => {
    const queryParams = {
      city: capitalizeFirstLetter(city),
      limit: INITIAL_LIMIT,
      offset: 0,
      ...payload,
    };
    const filteredSalesData = await getFilteredRetsData(queryParams);
    setSalesData(filteredSalesData);
    setOffset(INITIAL_LIMIT);
  };

  return (
    <div>
      <div className="filter-container flex">
        <Filters {...{ filterState, setFilterState, fetchFilteredData }} />
      </div>
      <h2
        className={`city-headline d-flex text-capitalize ${
          isMobileView ? "pt-3" : "pt-4"
        }`}
      >
        Commercial Real Estate {city} {filterState.saleLease}
      </h2>
      <p
        className="fw-light"
        style={isMobileView ? { fontSize: "0.9rem" } : {}}
      >
        Streamline your {capitalizeFirstLetter(city)} commercial real estate
        search by price, or listing type. Explore the latest MLS® listings for
        up-to-date information.
      </p>

      <div
        className={`${
          isMobileView ? "pt-1" : "pt-3"
        } row row-cols-1 row-cols-md-3 row-cols-xs-1 row-cols-sm-1 row-cols-lg-4 row-cols-xl-5 g-3`}
      >
        <SalesList
          {...{
            city,
            INITIAL_LIMIT,
            salesData,
            setSalesData,
            offset,
            setOffset,
            filterState,
          }}
        />
      </div>
    </div>
  );
};

export default FiltersWithCommercialList;
