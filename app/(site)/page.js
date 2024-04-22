import React from "react";

import BottomContactForm from "@/components/BottomContactForm";

import SearchBar from "@/components/reso/SearchBar";
import { getCommercialData } from "@/actions/fetchCommercialActions";
import PopularCities from "@/components/PopularCities";
import RealEstateNews from "@/components/RealEstateNews";
import SuggestedCity from "@/components/SuggestedCity";

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
            className="container-fluid relative flex flex-col items-center w-screen justify-center md:max-md:mt-10 sm:h-[85vh]"
            id="hero"
          >
            <div>
              <h1 className="text-[1.3rem] sm:text-[3rem] font-extrabold pb-0 mb-0 mt-2 mt-md-0 relative text-center">
                <span className="d-block mb-2 text-white">Find Your Next </span>{" "}
                <span className="text-white">Commercial Property </span>
              </h1>
              {/* <p className="text-center mt-0 pt-3 text-white text-xl font-semibold text-shadow">
                Explore Endless Possibilities in Finding Your Dream Home with
                us.
              </p> */}

              <div className="pb-1 pt-3">
                <div className="pb-1 ww d-flex justify-content-center">
                  <SearchBar />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 sm:mt-24">
            <SuggestedCity defaultCitiesData={defaultCitiesData} />
          </div>
          <div className="container-fluid mt-4 sm:mt-24">
            <PopularCities />
          </div>
          <div className="container-fluid mt-4 sm:mt-24">
            <RealEstateNews />
          </div>
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
