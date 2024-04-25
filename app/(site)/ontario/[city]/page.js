import React from "react";
import { listingType, saleLease } from "@/constant";
import SalesList from "@/components/reso/SalesList";
import { getCommercialData } from "@/actions/fetchCommercialActions";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import FilteredCommercialList from "@/components/reso/FilteredCommercialList";
import HotListings from "@/components/HotListings";
import Link from "next/link";

const page = async ({ params }) => {
  const city = params.city;
  const INITIAL_LIMIT = 30;
  // const saleLeaseValue = params.saleLease;
  return (
    <>
      {/* <div className="fixed-breadcrumbs">
        <div className="container-fluid">
          <nav
            style={{
              "--bs-breadcrumb-divider":
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E\")",
            }}
            aria-label="breadcrumb"
          >
            <ol className="breadcrumb  ps-2">
              <li className="breadcrumb-item ">
                <Link href="/">Dolphy</Link>
              </li>
              <li className="breadcrumb-item ">
                <Link href="/ontario">ON</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {city}
              </li>
            </ol>
          </nav>
        </div>
      </div> */}
      <div className="">
        <FilteredCommercialList
          {...{
            city,
            INITIAL_LIMIT,
          }}
        />
      </div>
    </>
  );
};

export default page;

export async function generateMetadata({ params }, parent) {
  return {
    ...parent,
    alternates: {
      canonical: `https://dolphy-commercial-two.vercel.app/ontario/${params.city}`,
    },
    openGraph: {
      images: "/logo/logo-black.svg",
    },
    title: `Find Commercial Real Estate For Sale in ${params.city}`,
    description: `Explore top comercial real estates in ${params.city} and select the best ones`,
  };
}
