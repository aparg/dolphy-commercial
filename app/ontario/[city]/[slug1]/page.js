import React from "react";
import { listingType, saleLease } from "@/constant";
import SalesList from "@/components/reso/SalesList";
import { getCommercialData } from "@/actions/fetchCommercialActions";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import FilteredCommercialList from "@/components/reso/FilteredCommercialList";
import HotListings from "@/components/HotListings";

const page = async ({ params }) => {
  let saleLeaseValue = undefined;
  let type = undefined;
  if (Object.keys(saleLease).includes(params.slug1)) {
    console.log(params.slug1);
    saleLeaseValue = params.slug1;
  }
  if (Object.keys(listingType).includes(params.slug1)) {
    type = capitalizeFirstLetter(params.slug1);
  }
  const isValidSlug = saleLeaseValue || type;
  const city = params.city;
  const INITIAL_LIMIT = 30;
  const formattedSlug = capitalizeFirstLetter(city);
  const commercialListData = await getCommercialData(
    0,
    INITIAL_LIMIT,
    formattedSlug
  );
  if (isValidSlug)
    return (
      <div className="container-fluid">
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
