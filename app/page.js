import React from "react";

import BottomContactForm from "@/components/BottomContactForm";

import SearchBar from "@/components/reso/SearchBar";

import AdditionalListing from "@/components/reso/AdditionalListing";
import { getCommercialData } from "@/actions/fetchCommercialActions";
import FilterCard from "@/components/FilterCard";
import TextOverImageCard from "@/components/TextOverImageCard";
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
    { city: CITY, data: torontoData },
    { city: CAMBRIDGECITY, data: cambridgeData },
    { city: BRAMPTONCITY, data: bramptonData },
  ];
  return (
    <>
      <div className="">
        <div className="">
          <div
            className="container-fluid relative flex flex-col items-center w-screen justify-center md:max-md:mt-10"
            id="hero"
          >
            <div>
              <h1 className="main-titlee pb-0 mb-0 mt-2 mt-md-0 relative text-center">
                <span className="d-block mb-5">Find Your</span>{" "}
                <span className="hero-main-text text-white">Dream Home </span>
                with us
              </h1>
              {/* <p className="text-center mt-0 pt-3 text-white text-xl font-semibold text-shadow">
                Explore Endless Possibilities in Finding Your Dream Home with
                us.
              </p> */}

              <div className="pb-1 pt-3">
                <div className="pb-1 ww w-100 d-flex justify-content-center">
                  <SearchBar />
                </div>
              </div>
            </div>
            <div className="mt-5 md:mb-10 sm:mb-0 absolute bottom-[-30%] sm:bottom-[-10%] lg:bottom-[-15%] lg:w-[850px] rounded-lg w-screen shadow-md border-t-8 bg-primary-green border-primary-green w-5/6">
              <FilterCard />
            </div>
          </div>
          {/* {torontoData?.length > 0 ? (
            <div className="pt-5 pb-2 ">
              <section className="additonal__listing">
                <AdditionalListing city={CITY} newSalesData={torontoData} />
              </section>
            </div>
          ) : null}

          {cambridgeData.length > 0 ? (
            <div className="">
              <section className="additonal__listing">
                <AdditionalListing
                  city={CAMBRIDGECITY}
                  newSalesData={cambridgeData}
                />
              </section>
            </div>
          ) : null}

          {bramptonData.length > 0 ? (
            <div className="pt-2 pb-2 ">
              <section className="additonal__listing">
                <AdditionalListing
                  city={BRAMPTONCITY}
                  newSalesData={bramptonData}
                />
              </section>
            </div>
          ) : null} */}
          <div className="mt-80 sm:mt-44">
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
          {/* <div className="py-5">
            <h3 className="fs-2 text-mine fw-bold text-center mb-0">
              We bring you home from credible builders
            </h3>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <img
                src="/bottom-line.svg"
                alt="bottom design line"
                className="img-fluid underline-svg"
              />
              <img
                src="/builders.png"
                alt="builders in dolphy"
                className="img-fluid mt-3 w-100 w-md-75"
              />
            </div>
          </div> */}
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
