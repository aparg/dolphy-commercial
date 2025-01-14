"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TimeAgo from "../TimeAgo";

import { commercial } from "@/api/routes";
// import Image from "next/image";
import { listingType, saleLease } from "@/constant";
import CompareButton from "../CompareButton";
import { generateURL } from "@/helpers/generateURL";
import { usePathname } from "next/navigation";
import useDeviceView from "@/helpers/useDeviceView";
import MobileCityResoCard from "../MobileCityResoCard";
import { set } from "date-fns";
import ColoredBadge from "../ColoredBadge";
import { Image } from "react-bootstrap";

const CityResoCard = React.forwardRef(
  ({ curElem, small = false, city, embeddedSite }, ref) => {
    // const [address, setAddress] = useState("");
    // const [showFallbackImage, setShowFallbackImage] = useState(false);
    const { isMobileView } = useDeviceView();
    const pathname = usePathname();
    const price = Number(curElem.ListPrice).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

    const mapObj = {
      MLS: curElem.MLS,
      index: 1,
    };
    const imgSrc = commercial.photos.replace(/MLS|index/gi, function (matched) {
      return mapObj[matched];
    });

    const handleImageError = (e) => {
      e.target.onerror = null;
      e.target.src = `/noimage.webp`;
      // setShowFallbackImage(true);
    };
    // console.log(curElem.StreetName?.trim() + "asdkl");
    // const streetAndMLS = curElem.StreetName
    //   ? `${curElem.Street}-${curElem.StreetName?.trim().replaceAll(" ", "-")}-${
    //       curElem.StreetAbbreviation
    //     }-${curElem.MLS}`
    //   : curElem.MLS;
    const streetAndMLS = (() => {
      const parts = [];

      if (curElem.Street) {
        parts.push(curElem.Street);
      }

      if (curElem.StreetName) {
        const streetName = curElem.StreetName.trim().replace(/ /g, "-");
        parts.push(streetName);
      }

      if (curElem.StreetAbbreviation) {
        parts.push(curElem.StreetAbbreviation);
      }

      if (curElem.MLS) {
        parts.push(curElem.MLS);
      }

      return parts.filter(Boolean).join("-");
    })();
    return isMobileView ? (
      <MobileCityResoCard
        ref={ref}
        streetAndMLS={streetAndMLS}
        small={small}
        handleImageError={handleImageError}
        imgSrc={imgSrc}
        curElem={curElem}
        price={price}
        // showFallbackImage={showFallbackImage}
      />
    ) : (
      <section className="" ref={ref}>
        <Link
          href={generateURL({
            cityVal: curElem.Municipality,
            listingIDVal: streetAndMLS,
            embeddedSite: pathname.includes("embedded-site"),
          })}
          className="text-black"
        >
          <div className="lg:px-0 h-full w-full">
            <div
              className={`flex sm:flex-col flex-row overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow group rounded-xl p-0 hover:shadow-lg hover:-translate-y-1 relative`}
            >
              <div
                className={`${
                  small ? "h-44" : "sm:h-80 h-24"
                } overflow-hidden relative`}
              >
                <div className="h-full relative">
                  <img
                    className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110 rounded-t-md"
                    src={imgSrc}
                    alt="property image"
                    onError={handleImageError}
                  />
                  {/* {showFallbackImage ? (
                    <Image
                      fill={true}
                      className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110 rounded-md"
                      src="/noimage.webp" // Replace with the path to your fallback image
                      alt="Fallback Image"
                      sizes="30vw"
                    />
                  ) : (
                    <Image
                      fill={true}
                      className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110 rounded-md"
                      src={imgSrc}
                      alt="property image"
                      onError={handleImageError}
                      sizes="30vw"
                      loading="lazy"
                    />
                  )} */}
                  {/* <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50"></div> */}
                </div>
                <div className="absolute bottom-3 left-2">
                  <div className="flex flex-row items-center">
                    {curElem.Use && (
                      <div
                        className="text-black text-xs py-[2px] px-1 flex items-center rounded-md mx-1"
                        style={{
                          background: "white",
                          // "linear-gradient(90deg, #ff924d 0, #ff6a5b)",
                        }}
                      >
                        {/* {curElem.TypeOwn1Out}{" "} */}
                        {curElem.Use}
                      </div>
                    )}
                    {curElem.ApproxSquareFootage && (
                      <div
                        className="text-black text-xs py-[2px] px-1 flex items-center rounded-md mx-1"
                        style={{
                          background: "white",
                          // "linear-gradient(90deg, #ff924d 0, #ff6a5b)",
                        }}
                      >
                        {/* {curElem.TypeOwn1Out}{" "} */}
                        {curElem.ApproxSquareFootage}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-1 sm:px-3 py-2 px-2">
                {/* <h2 className="price fw-bold mb-1 fw-bold d-flex align-items-center justify-content-start">
                  {price}
                  {""}

                  {curElem.SaleLease === saleLease.lease.value && (
                    <span> /mo</span>
                  )}

                  <span
                    className={`shadow-lg p-1 ms-1 text-black text-xs card-data ${
                      small && "hidden"
                    }`}
                  >
                    {Math.floor(curElem.TotalArea)} ft<sup>2</sup>
                  </span>
                </h2> */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <h2 className="font-bold text-2xl sm:text-2xl items-center justify-start mt-2 sm:my-2">
                    <span className="font-bold text-black">{price}</span>
                    {curElem.SaleLease === saleLease.lease.value && (
                      <span> /mo</span>
                    )}
                  </h2>
                  <div className="text-xs font-medium text-[#CC0B0B] mb-1 sm:mb-0">
                    <TimeAgo modificationTimestamp={curElem.TimestampSql} />
                  </div>
                </div>
                <p className="mb-0 fs-mine text-limit text-sm pb-0">
                  {" "}
                  MLS® #{curElem.MLS}
                </p>
                <div className="flex flex-row justify-between py-1">
                  <div className="text-black truncate text-ellipsis">
                    <div className="text-dark bva">
                      {curElem.StreetName ? (
                        `${curElem.Street} ${curElem.StreetName}${" "}
                    ${curElem.StreetAbbreviation || ""} ${
                          curElem.Municipality
                        }, Ontario`
                      ) : (
                        <span className="p-4"></span>
                      )}
                    </div>
                  </div>
                </div>
                {/* <div className="text-black font-normal truncate text-ellipsis text-xs  py-1">
                  Listed by {curElem.ListBrokerage}
                </div> */}
                <div className="justify-center items-center my-2">
                  <div
                    className={`min-w-[50px] inline-flex item-center justify-center bg-[#3a88ef]/[0.08] hover:bg-[#3a88ef]/[0.2] rounded-md leading-7 py-[4px] px-[8px] text-xs mx-1`}
                  >
                    <Image
                      className="pr-1 w-5"
                      src="/mailOutline.svg"
                      alt="Email"
                    />
                    Email
                  </div>
                  <div
                    className={`min-w-[70px] inline-flex item-center justify-center bg-[#ffedea]/[0.5] hover:bg-[#ffdad4]/[0.8] rounded-md leading-7 py-[4px] px-[8px] text-xs mx-1`}
                  >
                    <Image className="pr-1 w-5" src="/phone.svg" alt="Phone" />
                    Phone
                  </div>
                  <div
                    className={`min-w-[70px] inline-flex item-center justify-center bg-[#43bb3f]/[0.1] hover:bg-[#43bb3f]/[0.2] rounded-md leading-7 py-[4px] px-[8px] text-xs mx-1`}
                  >
                    <Image
                      className="pr-1 w-5"
                      src="/whatsapp.svg"
                      alt="whatsapp"
                    />
                    Whatsapp
                  </div>
                  {/* <ColoredBadge
                    icon="./phone.svg"
                    text="Phone"
                    // color="rgba(255, 237, 234, 0.5)"
                    color="#ffedea"
                    opacity="0.5"
                    hoverColor="#ffdad4"
                    hoverOpacity="0.8"
                    // hoverColor="rgba(255, 218, 212, 0.8)"
                  />
                  <ColoredBadge
                    icon="./whatsapp.svg"
                    text="Whatsapp"
                    // color="rgba(67, 187, 63, 0.1)"
                    color="#43bb3f"
                    opacity="0.1"
                    // hoverColor="rgba(67, 187, 63, 0.2)"
                    hoverColor="#43bb3f"
                    hoverOpacity="0.2"
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>
    );
  }
);

export default CityResoCard;
