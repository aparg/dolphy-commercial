import ResoCard from "@/components/reso/ResoCard";
import Link from "next/link";
import React from "react";
import SearchBar from "@/components/reso/SearchBar";

//ENDPOINTS
import { commercial } from "@/api/routes";
import CityResoCard from "@/components/reso/CityResoCard";

const page = async () => {
  const province = "Ontario";

  const url = commercial.properties.replace(
    "$query",
    `?$limit=10&$skip=0&$select=Province=${province}`
  );

  const options = {
    method: "GET",
  };
  const res = await fetch(url, options);
  const data = await res.json();

  const main_data = data.results;

  return (
    <>
      <div className="container-fluid">
        <h1 className="main-title d-flex text-capitalize pt-4">
          Commercial properties for Sale in {province} | Real Estate Updated
          Daily Listings
        </h1>
        <p>
          Refine your <span className="text-capitalize">{province}</span> real
          estate search by price, bedroom, or type (house, townhouse, or condo).
          View up-to-date MLS® listings in{" "}
          <span className="text-capitalize">{province}</span> .
        </p>

        <div className="pt-3 row row-cols-md-4 ">
          {main_data.map((curElem, index) => {
            if (curElem.PhotoCount > 0) {
              return (
                <CityResoCard
                  city={curElem?.Municipality.toLowerCase()}
                  key={index}
                  curElem={curElem}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </>
  );
};

export default page;

export async function generateMetadata({ params }, parent) {
  return {
    ...parent,
    alternates: {
      canonical: `https://dolphy-commercial-two.vercel.app/ontario/ontario`,
    },
    openGraph: {
      images: "/logo/logo-black.svg",
    },
    title:
      "Discover Prime Commercial Real Estate Opportunities in Ontario | Your Gateway to Profitable Investments",
    description:
      "Explore a diverse range of commercial real estate opportunities in Ontario with our comprehensive listings. From bustling urban centers to serene suburban landscapes, find the perfect office, retail, or industrial space to meet your business needs. Our experienced agents provide expert guidance for investors seeking lucrative ventures in Ontario's dynamic commercial property market. Start your journey towards success today!",
  };
}
