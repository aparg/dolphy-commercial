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
  const filterState = useMemo(() => {
    return {
      saleLease: saleLeaseValue ? saleLease[saleLeaseValue].value : "Sale",
      priceRange: {
        min: 0,
        max: 0,
      },
      type: capitalizeFirstLetter(type),
    };
  }, [type]);
  const [salesData, setSalesData] = useState([]);
  const [offset, setOffset] = useState(0);
  const { isMobileView } = useDeviceView();
  const [isLoading, setLoading] = useState(true);
  const { ref, inView } = useInView();

  const fetchFilteredData = async () => {
    const queryParams = {
      city: capitalizeFirstLetter(city),
      limit: INITIAL_LIMIT,
      houseType: Object.values(listingType).find(
        (type) => type.name === filterState.type
      )?.value,
      offset: offset,
      hasBasement: undefined,
      maxListPrice: 0,
      minListPrice: 0,
      sepEntrance: undefined,
      washroom: undefined,
      saleLease: filterState.saleLease || undefined,
    };
    setLoading(true);
    const filteredSalesData = await getFilteredRetsData(queryParams);
    setSalesData([...salesData, ...filteredSalesData]);
    setLoading(false);
    setOffset((prev) => {
      return prev + INITIAL_LIMIT;
    });
  };

  useEffect(() => {
    if (inView) {
      fetchFilteredData();
    }
  }, [inView]);

  return (
    <div className="container-fluid">
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
        } row row-cols-1 row-cols-md-3 row-cols-xs-1 row-cols-sm-1 row-cols-lg-4 row-cols-xl-5 g-0 g-md-2`}
      >
        {salesData.length > 0 && (
          <>
            {salesData.map((curElem, index) => {
              return <CityResoCard city={city} key={index} curElem={curElem} />;
            })}
          </>
        )}
        <div ref={ref} className="flex w-screen items-center justify-center">
          {" "}
          {isLoading && <ImSpinner size={24} />}
        </div>
      </div>
    </div>
  );
};

export default FilteredCommercialList;
