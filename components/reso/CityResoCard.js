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
    const streetAndMLS = curElem.StreetName
      ? `${curElem.Street}-${curElem.StreetName?.replace(" ", "-")}-${
          curElem.StreetAbbreviation
        }-${curElem.MLS}`
      : curElem.MLS;
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
                    className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110 rounded-md"
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
                    <div
                      className="text-black text-[0.8rem] p-1 px-2 rounded-md mx-1"
                      style={{
                        background: "white",
                        // "linear-gradient(90deg, #ff924d 0, #ff6a5b)",
                      }}
                    >
                      {curElem.TypeOwn1Out}{" "}
                    </div>

                    <div className="flex items-center text-black text-xs p-1 px-2 rounded-md mx-1 bg-white">
                      <TimeAgo modificationTimestamp={curElem.TimestampSql} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 sm:px-3 py-2 px-2">
                <h2 className="price fw-bold mb-1 fw-bold d-flex align-items-center justify-content-start">
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
                </h2>
                <p className="mb-0 fs-mine text-limit fw-normall pb-0">
                  {" "}
                  MLS® #{curElem.MLS}
                </p>
                <div className="flex flex-row justify-between">
                  <div className="text-black truncate text-ellipsis">
                    <div className="text-dark bva">
                      {curElem.StreetName ? (
                        `${curElem.Street} ${curElem.StreetName}${" "}
                    ${curElem.StreetAbbreviation} ${
                          curElem.Municipality
                        }, Ontario`
                      ) : (
                        <span className="p-4"></span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-black font-medium truncate text-ellipsis text-xs">
                  Listed by {curElem.ListBrokerage}
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
