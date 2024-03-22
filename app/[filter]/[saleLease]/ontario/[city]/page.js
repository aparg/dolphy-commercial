import React from "react";
import { listingType, saleLease } from "@/constant";
import SalesList from "@/components/reso/SalesList";
import { getCommercialData } from "@/actions/fetchCommercialActions";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import FilteredCommercialList from "@/components/reso/FilteredCommercialList";

const page = async ({ params }) => {
  const isValidSlug =
    Object.keys(listingType).includes(params.filter) &&
    Object.keys(saleLease).includes(params.saleLease);
  const city = params.city;
  const type = capitalizeFirstLetter(params.filter);
  const INITIAL_LIMIT = 30;
  const formattedSlug = capitalizeFirstLetter(city);
  const commercialListData = await getCommercialData(
    0,
    INITIAL_LIMIT,
    formattedSlug
  );
  const saleLeaseValue = params.saleLease;
  if (isValidSlug)
    return (
      <div className="">
        <FilteredCommercialList
          {...{
            city,
            INITIAL_LIMIT,
            commercialListData,
            type,
            saleLeaseValue,
          }}
        />
      </div>
    );
};

export default page;
