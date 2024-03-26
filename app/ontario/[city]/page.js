import React from "react";
import { listingType, saleLease } from "@/constant";
import SalesList from "@/components/reso/SalesList";
import { getCommercialData } from "@/actions/fetchCommercialActions";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import FilteredCommercialList from "@/components/reso/FilteredCommercialList";

const page = async ({ params }) => {
  const city = params.city;
  const INITIAL_LIMIT = 30;
  // const saleLeaseValue = params.saleLease;
  return (
    <div className="">
      <FilteredCommercialList
        {...{
          city,
          INITIAL_LIMIT,
        }}
      />
    </div>
  );
};

export default page;
