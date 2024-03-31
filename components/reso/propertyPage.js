"use client";
import React, { useState, useEffect } from "react";

import TimeAgo from "@/components/TimeAgo";

//CUSTOM HOOKS
import useDeviceView from "@/helpers/useDeviceView";

import Collapse from "@/components/reso/Collapse";
import { saleLease } from "@/constant";
import { Button, Image } from "react-bootstrap";
import { Tooltip } from "@nextui-org/react";
import prependToLocalStorageArray from "@/helpers/handleLocalStorageArray";
import { generateImageURLs } from "@/helpers/generateImageURLs";
import { useComparisionFlag } from "../context/ComparisonFlagContext";
import CompareButton from "../CompareButton";
import BookShowingForm from "../BookShowingForm";

const PropertyPage = ({ main_data }) => {
  const [navbar, setNavbar] = useState(false);
  const { isMobileView } = useDeviceView();
  const getCommunityFeatures = () => {
    const {
      PropertyFeatures1,
      PropertyFeatures2,
      PropertyFeatures3,
      PropertyFeatures4,
      PropertyFeatures5,
      PropertyFeatures6,
    } = main_data;

    return [
      PropertyFeatures1,
      PropertyFeatures2,
      PropertyFeatures3,
      PropertyFeatures4,
      PropertyFeatures5,
      PropertyFeatures6,
    ].join(", ");
  };

  const formatNumber = (value) => {
    // Check if the value is not null or undefined
    if (value != null) {
      return Number(value).toLocaleString("en-US");
    } else {
      // Handle the case where the value is null or undefined
      return "N/A"; // or any default value or message you prefer
    }
  };

  function formatCurrency(value) {
    // Check if the value is not null or undefined
    if (value != null) {
      return Number(value).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      });
    } else {
      // Handle the case where the value is null or undefined
      return "N/A"; // or any default value or message you prefer
    }
  }

  const handleScrollToContactAgent = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const dashedStreetName = `${main_data.Street}-${main_data.StreetName}-${main_data.StreetAbbreviation}`;

  const price = formatCurrency(main_data?.ListPrice);
  const TaxAnnualAmount = formatCurrency(main_data?.Taxes);
  const AssociationFee = formatCurrency(main_data?.AddlMonthlyFees);
  useEffect(() => {
    if (window) {
      window.addEventListener("scroll", () => {
        if (window.scrollY >= 870) {
          setNavbar(true);
        } else {
          setNavbar(false);
        }
      });
    }
  }, []);

  return (
    <div className="col-12 col">
      <div className="screenshot">
        <div className="row row-cols-1 row-cols-sm-2">
          <div className="col-sm-12">
            <div className="d-flex justify-content-between align-items-md-center flex-column gap-2 flex-md-row">
              <h1 className="vmain-title mb-0 mt-4 mt-md-2">
                <div className="uppercase bannerSection">
                  <div className="listingStatus"></div>
                  FOR {main_data.SaleLease} -{" "}
                  {/* tailwind style classname for bottom dashed border gray*/}
                  <span className="border-gray-500 border-dotted border-b">
                    ACTIVE
                  </span>
                </div>
                {main_data.Street} {main_data.StreetName}{" "}
                {main_data.StreetAbbreviation}
                {/* {main_data.Municipality}, {main_data.Province},{" "}
                {main_data.PostalCode} */}
                {/* <p className="shadow-lg d-inline text-sm px-2 rounded-mine p-1 ms-1">
                  <span className="text-dark">For {main_data.SaleLease}</span>
                </p> */}
              </h1>
              <div className="flex flex-col items-center">
                <h3 className="main-title fs-3 pt-8">{price}</h3>
                {/* <Image
                  src="/add-btn.svg"
                  onClick={() => prependToLocalStorageArray(main_data.MLS)}
                  className="w-10 self-center"
                  alt="Compare"
                ></Image> */}
                <CompareButton main_data={main_data} width={8} />
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-start mb-0">
              {/* <h3 className="fw-bold me-2">
                <img alt="" className="w-6 mr-2" src="/icons/bedrooms.svg" alt="bed" className="w-5" />
              </h3>
              <span>bedrooms</span> */}
              {/* <h3 className="fw-bold mr-2">
                <img src="/bathrooms.svg" alt="washroom" className="w-5" />
              </h3>
              <span>{main_data.Washrooms}</span> */}
              {/* <h3 className="fw-bold mx-2">.</h3> */}
              <h3 className="fw-bold mr-2">
                <img src="/ruler.svg" alt="area" className="w-5" />
              </h3>
              <span>
                {parseInt(main_data.TotalArea).toFixed(0)}
                {main_data.TotalAreaCode}
              </span>
              <h3 className="fw-bold mx-2">.</h3>
              <span className="shadow-none bg-none">
                {main_data.TypeOwn1Out}
              </span>
              <h3 className="fw-bold mx-2 d-none d-md-inline">.</h3>
              <span className="shadow-none bg-none">
                {main_data.Municipality}
              </span>
              <h3 className="fw-bold mx-2 d-none d-md-inline">.</h3>

              {/* <span className="text-limit fw-bold d-none d-md-inline">
                <Link
                  activeSubClassName=" "
                  href={"/resale/" + route.query.city_name}
                >
                  <a> {props.post.house_detail.city.name}</a>
                </Link>
              </span> */}
            </div>
            {/* <span className="text-limit fw-bold d-inline d-md-none">
              <Link
                activeSubClassName=" "
                href={"/resale/" + route.query.city_name}
              >
                <a> {props.post.house_detail.city.name}</a>
              </Link>
            </span>*/}
            <p className="card-subtitle mb-0 fw-mine text-limit">
              MLS - #{main_data.MLS}
            </p>
          </div>
        </div>
        <div className="py-3 py-md-3">
          <div className="border-top"></div>
        </div>
        <div className="pb-3 pb-md-5 mt-20">
          <h2 className="text-4xl font-extrabold leading-10">
            <span className="aff2">About this property</span>
          </h2>
          <div className="flex flex-col">
            <div className="flex flex-row text-xl py-2">
              <Image alt="" className="w-6 mr-2" src="/property.svg" />
              Property Type: {main_data.PropertyType}
            </div>
            <div className="flex flex-row text-xl py-2">
              <Image alt="" className="w-6 mr-2" src="/property1.svg" />
              Primary Property Type: {main_data.TypeOwn1Out}
            </div>
            <div className="flex flex-row text-xl py-2">
              <Image alt="" className="w-6 mr-2" src="/property2.svg" />
              Primary Sub-Type: {main_data.Use}
            </div>
            <div className="flex flex-row text-xl py-2">
              <Image alt="" className="w-6 mr-2" src="/building.svg" />
              Building Size: {main_data.OfficeAptArea}
              {main_data.OfficeAptAreaCode}
            </div>
            <div className="flex flex-row text-xl py-2">
              <Image alt="" className="w-6 mr-2" src="/community.svg" />
              Community: {main_data.Community}
            </div>
            <div className="flex flex-row text-xl py-2">
              <Image alt="" className="w-6 mr-2" src="/people.svg" />
              Occupancy: {main_data.Occupancy}
            </div>
            <div className="flex flex-row text-xl py-2">
              <Image alt="" className="w-6 mr-2" src="/time.svg" />
              Approx. Age: {main_data.ApproxAge}
            </div>
            <div className="flex flex-row text-xl py-2">
              <Image alt="" className="w-6 mr-2" src="/garage.svg" />
              Garage Type: {main_data.GarageType}
            </div>
            <div className="flex flex-row text-xl py-2">
              <Image alt="" className="w-6 mr-2" src="/air-condition.svg" />
              Air Conditioning: {main_data.AirConditioning}
            </div>
          </div>
          {/* <div className="text-start my-3 text-inside">
            <div
              className="iframe-container"
              dangerouslySetInnerHTML={{
                __html: props.post.house_detail.description,
              }}
            ></div>
          </div> */}
        </div>
      </div>
      <div className="mt-4 sm:mt-24">
        <h2 className="fw-bold fs-4 pb-3">
          <Image
            alt="walking  "
            className="w-10 inline mr-2"
            src="/walking.svg"
          />
          Walk Score for {main_data.Street} {main_data.StreetName}{" "}
          {main_data.StreetAbbreviation}
        </h2>

        <div className="">
          <div className="p-1">
            <div className="walkscore-container mt-2 p-1 rounded-mine">
              <script type="text/javascript"></script>
              <div id="ws-walkscore-tile" className="ham2 w-full">
                <iframe
                  height="500px"
                  title="Walk Score"
                  className="ham"
                  width="100%"
                  src={`https://www.walkscore.com/serve-walkscore-tile.php?wsid=&amp&s=${dashedStreetName},${main_data.Municipality}&amp;o=h&amp;c=f&amp;h=500&amp;fh=0&amp;w=737`}
                ></iframe>
              </div>
              <script
                type="text/javascript"
                src="https://www.walkscore.com/tile/show-walkscore-tile.php"
              ></script>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="py-3 py-md-5 my-5">
        <h2 className="fs-2 fw-bold">
          <span className="aff2">Mortgage Calculator</span>
        </h2>
        <p>Quickly See What Your Mortgage Payments Might Look Like</p>
        <div>
          <MortCalc price={props.post.house_detail.price}></MortCalc>
        </div>
      </div>
      <div className="pt-3">
        <div className="d-flex justify-content-end smm">
          <span className="text-danger">*</span> Sponsored & Advertisement
        </div>
        <div className="roundddd p-r">
          <div className="d-flex justify-content-end flex-column align-items-end">
            <h5 className="fw-bold mb-0 fs-mmmmmv">
              Are you looking for a Mortgage Agent?
            </h5>
            <p>Are you pre-approved?</p>
          </div>
          <div className="d-flex align-items-center justify-content-between flex-column flex-md-row gap-2">
            <img
              src="/mortgage-agent.png"
              alt=""
              className="w-5 imagem"
            />
            <span className="mx-2"></span>
            <div>
              <ContactFormMort></ContactFormMort>
            </div>
          </div>
          <div className="d-flex justify-content-end opp mt-3">
            <div className="d-inline fs-5 fw-bold">
              <span>homebaba</span>
              <span>
                <img
                  src="/canadaleaf.svg"
                  alt="canada mapel leaf"
                  className="w-5 leaf-img ms-1"
                />
              </span>
            </div>
          </div>
        </div>
      </div> */}
      {/* <p className="pss">Mortgage Agent - Ashu Ohri</p>
      <div className="py-2">
        <div className="bg-white p-1 rounded-mine">
          <p className="sm-f">
            By submitting this form and providing your contact information, you
            authorize mortgage agents or brokerage advertised above to contact
            you about your inquiry. Homebaba does not provide any mortgage
            services or mortgage related services and is not responsible for any
            services offered by the advertiser on our platform.
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default PropertyPage;
