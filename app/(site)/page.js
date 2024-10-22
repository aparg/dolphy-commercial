import React from "react";

import BottomContactForm from "@/components/BottomContactForm";

import SearchBar from "@/components/reso/SearchBar";
import {
  getCommercialData,
  getFilteredRetsData,
} from "@/actions/fetchCommercialActions";
import PopularCities from "@/components/PopularCities";
import RealEstateNews from "@/components/RealEstateNews";
import SuggestedCity from "@/components/SuggestedCity";
import PopularCategories from "@/components/PopularCategories";
import RecentListings from "@/components/RecentListings";

const INITIAL_OFFSET = 0;
const INITIAL_LIMIT = 20;
const CITY = "Toronto";
const CAMBRIDGECITY = "Cambridge";
const BRAMPTONCITY = "Brampton";

export default async function Home() {
  const torontoData = await getCommercialData(
    INITIAL_OFFSET,
    INITIAL_LIMIT,
    CITY
  );
  const cambridgeData = await getCommercialData(
    INITIAL_OFFSET,
    INITIAL_LIMIT,
    CAMBRIDGECITY
  );
  const bramptonData = await getCommercialData(
    INITIAL_OFFSET,
    INITIAL_LIMIT,
    BRAMPTONCITY
  );
  const recentData = await getFilteredRetsData({ limit: 8 });
  const defaultCitiesData = [
    {
      city: CITY,
      data: torontoData,
      type: undefined,
      saleLeaseSearch: undefined,
    },
    {
      city: CAMBRIDGECITY,
      data: cambridgeData,
      type: undefined,
      saleLeaseSearch: undefined,
    },
    {
      city: BRAMPTONCITY,
      data: bramptonData,
      type: undefined,
      saleLeaseSearch: undefined,
    },
  ];
  return (
    <>
      <div className="">
        <div className="">
          <div
            className="relative flex h-[50vh] sm:h-[70vh] flex-col lg:flex-row items-center justify-center pt-10 gap-x-10 lg:pb-20 gap-y-12 sm:gap-y-0 px-2 sm:px-0 bg-bottom bg-no-repeat"
            // id="hero-section"
          >
            <div className="w-full z-10 pb-20 sm:w-screen flex flex-col items-center mb-10 lg:mb-0 order-2 sm:order-1 cover">
              <div>
                <h1 className="text-[1.3rem] sm:text-[3rem] font-extrabold pb-0 mb-0 mt-2 mt-md-0 relative text-center">
                  <span className="d-block mb-2 text-black">
                    Find Your Next{" "}
                  </span>{" "}
                  <span className="text-black">Commercial Property </span>
                </h1>
                {/* <p className="text-center mt-0 pt-3 text-white text-xl font-semibold text-shadow">
                Explore Endless Possibilities in Finding Your Dream Home with
                us.
              </p> */}
              </div>
              <div className="w-[90%] sm:w-[60%] mt-5 hidden sm:block">
                <SearchBar numberOfSuggestions={3} />
              </div>
              <div className="w-[90%] sm:w-[60%] mt-2 sm:mt-10 block sm:hidden">
                <SearchBar numberOfSuggestions={3} placeholder="Search" />
              </div>
              <div className="text-medium sm:text-xl mt-2 text-center">
                Find{" "}
                <span className="font-bold">
                  commercial properties for sale or lease
                </span>{" "}
                across Ontario!
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt-4 sm:mt-24">
          {/* <PopularCities /> */}
          <PopularCategories />
        </div>
        <div className="mt-4 sm:mt-24">
          <SuggestedCity defaultCitiesData={defaultCitiesData} />
        </div>
        <div className="mt-4 sm:mt-24">
          <RecentListings data={recentData} />
          {/* <div className="container-fluid mt-4 sm:mt-24">
            <RealEstateNews />
          </div> */}
        </div>
        <div className="">
          <div className="py-md-5"></div>
          <div className="py-5 my-5" id="mycontact">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <img
                  src="/contact-bottom-2.png"
                  alt="dce"
                  className="img-fluid w-25 w-smm-50 mb-3"
                />
              </div>
              <h2 className=" text-center px-md-4 fs-4 text-md mb-10 font-bold">
                Contact Dolphy now!
              </h2>
              <div className="row row-cols-1 row-cols-md-3 mt-5">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <BottomContactForm></BottomContactForm>
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>
          </div>
          <div className="pt-5 mt-5"></div>
        </div>
      </div>
    </>
  );
}
