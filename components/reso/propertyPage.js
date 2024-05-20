"use client";
import React, { useState, useEffect } from "react";

import CompareButton from "@/components/CompareButton";
import { Image } from "react-bootstrap";

import TimeAgo from "@/components/TimeAgo";

//CUSTOM HOOKS
import useDeviceView from "@/helpers/useDeviceView";

//CONSTANT
import Collapse from "@/components/reso/Collapse";

//ICONS
import { IoBedOutline } from "react-icons/io5";
import { LuBath } from "react-icons/lu";
// import MortCalc from "../MortgageCalc";

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

  const dashedStreetName = [
    main_data.Street,
    main_data.StreetName,
    main_data.StreetAbbreviation,
  ]
    .filter((value) => value !== null && value !== undefined)
    .join("-");

  console.log(dashedStreetName);
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
    <>
      <div className="screenshot col-12">
        <div
          className={`border-0  rounded-3 ${
            isMobileView ? "sm:p-4 pt-3 mt-3" : "mt-5"
          }`}
        >
          <div className="w-full">
            <div
              className={`flex flex-col flex-wrap${
                isMobileView ? "gap-3" : "gap-0"
              }`}
            >
              <div className="flex items-center">
                <div className="flex flex-col">
                  <div className="flex flex-col items-start">
                    <div className="flex flex-row items-center">
                      <h3 className="main-title fs-1">C{price}</h3>

                      {/* {main_data.SaleLease.toLowerCase() === "sale" && (
                        <p className="cardd-subtitle ml-4">
                          est. {formatCurrency(MortCalc(main_data.ListPrice))} /
                          month
                        </p>
                      )} */}
                    </div>
                    <h1 className="fs-6 mb-2 cardd-subtitle text-lg">
                      {main_data.Street} {main_data.StreetName}{" "}
                      {main_data.StreetAbbreviation}, {main_data.Municipality},{" "}
                      {main_data.Province}, {main_data.PostalCode}
                    </h1>
                    {/* <div>
                      <div className="rounded-md flex items-center">
                        <div className="d-flex justify-content-center align-items-center gap-1 text-lg">
                          <img
                            src="/bedrooms.svg"
                            alt="bedrooms"
                            className="w-4"
                          />{" "}
                          {main_data.Bedrooms} Bedroom
                        </div>
                        <span className="text-lg mx-1">|</span>
                        <div className="d-flex justify-content-center align-items-center gap-1 text-lg">
                          <img
                            src="/bathrooms.svg"
                            alt="washrooms"
                            className="w-4"
                          />{" "}
                          {main_data.Washrooms} Bathroom
                        </div>
                        {main_data.GarageSpaces && (
                          <>
                            <span className="text-lg">|</span>
                            <div className="d-flex justify-content-center align-items-center gap-1 text-lg ">
                              <img
                                src="/garage.svg"
                                alt="garages"
                                className="w-3"
                              />{" "}
                              {Math.trunc(main_data.GarageSpaces)} Garage
                            </div>
                          </>
                        )}
                      </div>
                    </div> */}
                    <span className="text-dark font-bold my-2 sm:my-0">
                      <TimeAgo modificationTimestamp={main_data.TimestampSql} />
                    </span>
                  </div>
                </div>
                <div></div>
              </div>
              {/* <CompareButton main_data={main_data} width={8} /> */}
              {/* <div className="flex flex-col font-md mt-2 text-lg">
                <p class className="">
                  {main_data.Municipality}, {main_data.Province},{" "}
                  {main_data.PostalCode}
                </p>
              </div> */}
            </div>
          </div>
          <div className="d-flex align-items-center flex-wrap mt-2">
            <div className="flex">
              <p className="card-subtitle my-0 mb-0 fw-mine font-thin text-limit text-lg">
                MLS - #{main_data.MLS}
              </p>
            </div>
            <div className="tet-s d-flex"></div>
          </div>
          <h1 className="vmain-title">
            <div className="uppercase bannerSection text-lg">
              {/* <div className="listingStatus"></div> */}
              FOR {main_data.SaleLease}
              {/* tailwind style classname for bottom dashed border gray*/}
              {/* <span className="border-gray-500 border-dotted border-b">
                ACTIVE
              </span> */}
            </div>
          </h1>
        </div>
        {/* <div className="border-b border-[0.5px] border-gray-200 mt-2 sm:mt-0 sm:ml-4"></div> */}
        {/* Description */}
        <div className={`${isMobileView ? "pt-4 mt-8" : "mt-16 pt-4"}`}>
          <div className="border border-0 rounded-3 bg-light p-4">
            <h2 className="font-extrabold pb-3 text-lg sm:text-4xl">
              Description
            </h2>
            <p className="pty-description pt-4 text-lg">
              {main_data.RemarksForClients}
            </p>
            <div
              className={`row row-cols-2  row-cols-md-4 w-100 ${
                isMobileView ? "flex-wrap" : "flex-nowrap prp-gap"
              }`}
            >
              <div className="col-7 col-md border-bottom py-2 py-md-3">
                <p className="cardd-subtitle_bg-black">
                  Last check for updates
                </p>
              </div>
              <div className="col-5 col-md border-bottom py-2 py-md-3">
                <p className="cardd-subtitle_bg-black">
                  <TimeAgo modificationTimestamp={main_data.TimestampSql} />
                </p>
              </div>
              <div className="col-7 col-md border-bottom py-2 py-md-3">
                <p className="cardd-subtitle_bg-black">Property type</p>
              </div>
              <div className="col-5 col-md border-bottom py-2 py-md-3">
                <p className="cardd-subtitle_bg-black">
                  {main_data.TypeOwn1Out}
                </p>
              </div>
            </div>

            <div
              className={`row row-cols-2  row-cols-md-4 w-100 ${
                isMobileView ? "flex-wrap" : "flex-nowrap prp-gap"
              }`}
            >
              <div className="col-7 col-md border-bottom py-2 py-md-3">
                <p className="cardd-subtitle_bg-black">Style </p>
              </div>
              <div className="col-5 col-md border-bottom py-2 py-md-3">
                <p className="cardd-subtitle_bg-black">{main_data.Style}</p>
              </div>
              <div className="col-7 col-md border-bottom py-2 py-md-3">
                <p className="cardd-subtitle_bg-black">Community</p>
              </div>
              <div className="col-5 col-md border-bottom py-2 py-md-3">
                <p className="cardd-subtitle_bg-black">{main_data.Community}</p>
              </div>
            </div>

            <div
              className={`row row-cols-2  row-cols-md-4 w-100 ${
                isMobileView ? "flex-wrap" : "flex-nowrap prp-gap"
              }`}
            >
              <div className="col-7 col-md border-bottom border-sm   py-2 py-md-3">
                <p className="cardd-subtitle_bg-black">Lot size</p>
              </div>
              <div className="col-5 col-md border-bottom border-sm py-2 py-md-3">
                <p className="cardd-subtitle_bg-black">
                  {formatNumber(
                    (main_data.LotDepth * main_data.LotFront).toFixed(0)
                  )}{" "}
                  Sqft
                </p>
              </div>
              <div className="col-7 col-md border-bottom py-2 py-md-3">
                <p className="cardd-subtitle_bg-black">Garage spaces</p>
              </div>
              <div className="col-5 col-md border-bottom py-2 py-md-3">
                <p className="cardd-subtitle_bg-black">
                  {formatNumber(main_data.GarageSpaces)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/*Home Overview  */}
        <div
          className={`${isMobileView ? "pt-4 pb-4 mt-8" : "mt-16 pt-4 pb-4"}`}
        >
          <div className="row row-cols-1 bg-light p-4">
            <div className="col-12 px-0">
              <div className="container rounded-3 border-0">
                <h2 className="font-extrabold pb-3 text-lg sm:text-4xl">
                  Business Overview
                </h2>
                <div
                  className={`row row-cols-2  row-cols-md-4 w-100 ${
                    isMobileView ? "flex-wrap" : "flex-nowrap prp-gap"
                  }`}
                >
                  {/* <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">
                      Basement information
                    </p>
                  </div> */}
                  {/* <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">
                      {main_data?.Basement1
                        ? `${main_data?.Basement1}, ${main_data?.Basement2}`
                        : "None"}
                    </p>
                  </div> */}
                  <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">Virtual tour</p>
                  </div>
                  <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">
                      <a href={main_data.VirtualTourURL} target="_blank">
                        Tour Now
                      </a>
                    </p>
                  </div>
                  <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">Mls® #</p>
                  </div>
                  <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">{main_data.MLS}</p>
                  </div>
                </div>

                <div
                  className={`row row-cols-2  row-cols-md-4 w-100 ${
                    isMobileView ? "flex-wrap" : "flex-nowrap prp-gap"
                  }`}
                >
                  <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">Building size</p>
                  </div>
                  <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">
                      {main_data.ApproxSquareFootage}
                    </p>
                  </div>
                  <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">Status</p>
                  </div>
                  <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">
                      {main_data.Status === "A" ? "Active" : "In-Active"}
                    </p>
                  </div>
                </div>

                <div
                  className={`row row-cols-2  row-cols-md-4 w-100 ${
                    isMobileView ? "flex-wrap" : "flex-nowrap prp-gap"
                  }`}
                >
                  {/* <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">Property sub type</p>
                  </div> */}
                  {/* <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">
                      {main_data.PropertySubType}
                    </p>
                  </div> */}
                  <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">Taxes</p>
                  </div>
                  <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">{TaxAnnualAmount}</p>
                  </div>
                  <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">Tax year</p>
                  </div>
                  <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">
                      {main_data.TaxYear}
                    </p>
                  </div>
                </div>

                <div
                  className={`row row-cols-2  row-cols-md-4 w-100 ${
                    isMobileView ? "flex-wrap" : "flex-nowrap prp-gap"
                  }`}
                >
                  <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">Maintenance fee</p>
                  </div>
                  <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">{AssociationFee}</p>
                  </div>
                  <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">Year built</p>
                  </div>
                  <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">
                      {main_data.AssessmentYear || "--"}
                    </p>
                  </div>
                </div>

                <div
                  className={`row row-cols-2  row-cols-md-4 w-100 ${
                    isMobileView ? "flex-wrap" : "flex-nowrap prp-gap"
                  }`}
                ></div>

                <div className="collapse" id="collapseExample">
                  {/* Interior */}
                  <h5 className="py-2 fw-bold pt-5">Interior</h5>
                  <div
                    className={`row row-cols-2  row-cols-md-4 w-100 ${
                      isMobileView ? "flex-wrap" : "flex-nowrap prp-gap"
                    }`}
                  >
                    <div className="col-7 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">
                        # total bathrooms
                      </p>
                    </div>
                    <div className="col-5 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">
                        {main_data.Washrooms}
                      </p>
                    </div>
                    <div className="col-7 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black"># Full baths</p>
                    </div>
                    <div className="col-5 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">
                        {main_data.Washrooms}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`row row-cols-2  row-cols-md-4 w-100 ${
                      isMobileView ? "flex-wrap" : "flex-nowrap prp-gap"
                    }`}
                  >
                    <div className="col-7 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">
                        # of above grade bedrooms
                      </p>
                    </div>
                    <div className="col-5 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">
                        {main_data.Bedrooms}
                      </p>
                    </div>
                    <div className="col-7 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black"># of rooms</p>
                    </div>
                    <div className="col-5 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">
                        {Number(main_data.Rooms) + Number(main_data.RoomsPlus)}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`row row-cols-2  row-cols-md-4 w-100 ${
                      isMobileView ? "flex-wrap" : "flex-nowrap prp-gap"
                    }`}
                  >
                    <div className="col-7 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">
                        Family room available
                      </p>
                    </div>
                    <div className="col-5 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">
                        {Boolean(Number(main_data.FamilyRoom) > 0)
                          ? "Yes"
                          : "No"}
                      </p>
                    </div>
                  </div>

                  {/* Exterior */}
                  <h5 className="py-2 fw-bold pt-5">Exterior</h5>
                  <div
                    className={`row row-cols-2  row-cols-md-4 w-100 ${
                      isMobileView ? "flex-wrap" : "flex-nowrap prp-gap"
                    }`}
                  >
                    <div className="col-7 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">
                        Construction materials
                      </p>
                    </div>
                    <div className="col-5 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">
                        {main_data.Exterior1}
                      </p>
                    </div>
                    <div className="col-7 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">
                        Other structures
                      </p>
                    </div>
                    <div className="col-5 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">
                        {main_data.OtherStructures1}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`row row-cols-2  row-cols-md-4 w-100 ${
                      isMobileView ? "flex-wrap" : "flex-nowrap prp-gap"
                    }`}
                  >
                    <div className="col-7 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black"># garage spaces</p>
                    </div>
                    <div className="col-5 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">
                        {formatNumber(main_data.GarageSpaces)}
                      </p>
                    </div>
                    <div className="col-7 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">
                        # parking spaces
                      </p>
                    </div>
                    <div className="col-5 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">
                        {main_data.ParkingSpaces}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`row row-cols-2  row-cols-md-4 w-100 ${
                      isMobileView ? "flex-wrap" : "flex-nowrap prp-gap"
                    }`}
                  >
                    <div className="col-7 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">Garage features</p>
                    </div>
                    <div className="col-5 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">
                        {main_data.GarageType}
                      </p>
                    </div>
                    <div className="col-7 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">
                        Has basement (y/n)
                      </p>
                    </div>
                    <div className="col-5 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">
                        {main_data.Basement1 ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`row row-cols-2  row-cols-md-4 w-100 ${
                      isMobileView ? "flex-wrap" : "flex-nowrap prp-gap"
                    }`}
                  >
                    <div className="col-7 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">
                        Has garage (y/n)
                      </p>
                    </div>
                    <div className="col-5 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">
                        {main_data.GarageType ? "Yes" : "No"}
                      </p>
                    </div>
                    <div className="col-7 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">Drive</p>
                    </div>
                    <div className="col-5 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">
                        {main_data.Drive}
                      </p>
                    </div>
                  </div>

                  {/* Amenities / Utilities */}
                  <h5 className="py-2 fw-bold pt-5">Amenities / Utilities</h5>
                  <div
                    className={`row row-cols-2  row-cols-md-4 w-100 ${
                      isMobileView ? "flex-wrap" : "flex-nowrap prp-gap"
                    }`}
                  >
                    <div className="col-7 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">Cooling</p>
                    </div>
                    <div className="col-5 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">
                        {main_data.AirConditioning}
                      </p>
                    </div>
                    <div className="col-7 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">Heat source</p>
                    </div>
                    <div className="col-5 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">
                        {main_data?.HeatSource}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`row row-cols-2  row-cols-md-4 w-100 ${
                      isMobileView ? "flex-wrap" : "flex-nowrap prp-gap"
                    }`}
                  >
                    <div className="col-7 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">Heat type</p>
                    </div>
                    <div className="col-5 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">
                        {main_data?.HeatType}
                      </p>
                    </div>
                    <div className="col-7 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">Sewers</p>
                    </div>
                    <div className="col-5 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">
                        {main_data?.Sewers}
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <h5 className="py-2 fw-bold pt-5">Location</h5>
                  <div
                    className={`row row-cols-2  row-cols-md-4 w-100 ${
                      isMobileView ? "flex-wrap" : "flex-nowrap prp-gap"
                    }`}
                  >
                    <div className="col-7 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">Water source</p>
                    </div>
                    <div className="col-5 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">
                        {main_data.Water}
                      </p>
                    </div>
                    <div className="col-7 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">Area</p>
                    </div>
                    <div className="col-5 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">
                        {main_data.Area}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`row row-cols-2  row-cols-md-4 w-100 ${
                      isMobileView ? "flex-wrap" : "flex-nowrap prp-gap"
                    }`}
                  >
                    <div className="col-7 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">Community</p>
                    </div>
                    <div className="col-5 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">
                        {main_data.Community}
                      </p>
                    </div>
                    <div className="col-7 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">
                        Community features
                      </p>
                    </div>
                    <div className="col-5 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">
                        {getCommunityFeatures()}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`row row-cols-2  row-cols-md-4 w-100 ${
                      isMobileView ? "flex-wrap" : "flex-nowrap prp-gap"
                    }`}
                  >
                    <div className="col-7 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">Directions</p>
                    </div>
                    <div className="col-5 col-md border-bottom py-2 py-md-3">
                      <p className="cardd-subtitle_bg-black">
                        {main_data.DirectionsCrossStreets}
                      </p>
                    </div>
                  </div>
                </div>
                {/* see more */}

                <div className="pt-3">
                  <Collapse> </Collapse>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>

      {/* Extras */}
      {main_data?.Extras && (
        <div className={`${isMobileView ? "pt-4 pb-4" : "pt-4 pb-4"}`}>
          <div className="row row-cols-1 row-cols-md-2">
            <div className="col-md-12">
              <div className="container bg-light rounded-3 p-4 border-0">
                <h2 className="fw-bold pb-3 text-lg sm:text-xl">Extras</h2>
                <div className="flex flex-row text-lg py-1">
                  {main_data.Extras}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={isMobileView ? `mt-8 col-12` : `mt-24 col-12`}>
        <h2 className="fw-bold pb-3 text-lg sm:text-2xl">
          <Image
            alt="walking  "
            className="w-8 sm:w-10 inline mr-2"
            src="/walking.svg"
          />
          Walk Score for {main_data.Street} {main_data.StreetName}{" "}
          {main_data.StreetAbbreviation}
        </h2>

        <div className="">
          <div className="">
            <div className="walkscore-container mt-2 rounded-mine">
              <script type="text/javascript"></script>
              {/* <div id="ws-walkscore-tile" className="ham2 w-full"> */}
              <iframe
                height="500px"
                title="Walk Score"
                className="ham p-0"
                width="100%"
                src={`https://www.walkscore.com/serve-walkscore-tile.php?wsid=&amp&s=${dashedStreetName},${main_data.Municipality}&amp;o=h&amp;c=f&amp;h=500&amp;fh=0&amp;w=737`}
              ></iframe>
              {/* </div> */}
              <script
                type="text/javascript"
                src="https://www.walkscore.com/tile/show-walkscore-tile.php"
              ></script>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyPage;
