import React from "react";
import { listingType, saleLease } from "@/constant";
import SalesList from "@/components/reso/SalesList";
import { getCommercialData } from "@/actions/fetchCommercialActions";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import FilteredCommercialList from "@/components/reso/FilteredCommercialList";
import { plural } from "@/constant/plural";
import HotListings from "@/components/HotListings";

const page = async ({ params }) => {
  let saleLeaseValue = undefined;
  let type = undefined;
  if (Object.keys(saleLease).includes(params.slug1)) {
    saleLeaseValue = params.slug1;
  } else if (Object.keys(saleLease).includes(params.slug2)) {
    saleLeaseValue = params.slug2;
  }
  if (Object.keys(listingType).includes(decodeURIComponent(params.slug1))) {
    type = capitalizeFirstLetter(decodeURIComponent(params.slug1));
  } else if (
    Object.keys(listingType).includes(decodeURIComponent(params.slug2))
  ) {
    type = capitalizeFirstLetter(decodeURIComponent(params.slug2));
  }
  const isValidSlug = saleLeaseValue || type;
  const INITIAL_LIMIT = 30;
  const commercialListData = await getCommercialData(0, INITIAL_LIMIT);
  if (isValidSlug)
    return (
      <div className="">
        <FilteredCommercialList
          {...{
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

export async function generateMetadata({ params }, parent) {
  let saleLeaseValue = undefined;
  let type = undefined;
  if (Object.keys(saleLease).includes(params.slug1)) {
    saleLeaseValue = params.slug1;
  } else if (Object.keys(saleLease).includes(params.slug2)) {
    saleLeaseValue = params.slug2;
  }
  if (Object.keys(listingType).includes(decodeURIComponent(params.slug1))) {
    type = capitalizeFirstLetter(decodeURIComponent(params.slug1));
  } else if (
    Object.keys(listingType).includes(decodeURIComponent(params.slug2))
  ) {
    type = capitalizeFirstLetter(decodeURIComponent(params.slug2));
  }
  return {
    ...parent,
    alternates: {
      canonical: `https://dolphy-commercial-two.vercel.app/ontario/filter/${params.slug}`,
    },
    openGraph: {
      images: "/logo/logo-black.svg",
    },
    title: `Looking for ${type}${
      plural[capitalizeFirstLetter(type)]
    } in ontario? `,
    description: `Find ${
      type ? type + plural[type] : "Commercial Real Estate"
    } ${
      saleLease[Object.keys(saleLease).find((key) => key == saleLeaseValue)]
        .name || "For Sale"
    } in Ontario`,
  };
}
