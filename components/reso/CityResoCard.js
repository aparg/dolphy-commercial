"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TimeAgo from "../TimeAgo";

import { commercial } from "@/api/routes";
import { Image } from "react-bootstrap";

const CityResoCard = React.forwardRef(({ curElem, city }, ref) => {
  // const [address, setAddress] = useState("");
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
  };

  // const listingID = curElem.MLS;

  // const options = {
  //   method: "GET",
  // };
  // const urlToFetchMLSDetail = commercial.properties.replace(
  //   "$query",
  //   `?$select=MLS='${listingID}'`
  // );
  // useEffect(() => {
  //   fetchPropertyData();
  // }, []);

  // const fetchPropertyData = async () => {
  //   const resMLSDetail = await fetch(urlToFetchMLSDetail, options);
  //   const data = await resMLSDetail.json();
  //   const main_data = data.results[0];
  //   const address = `${main_data?.Street} ${main_data.StreetName} ${main_data.StreetAbbreviation}`;
  //   setAddress(address);
  // };
  // return (
  //   <>
  //     <div className="col additional_sales-card" ref={ref}>
  //       <Link
  //         href={`/ontario/${city}/${curElem.MLS}`}
  //         className="text-decoration-none text-dark"
  //       >
  //         <div className="afte-proj">
  //           <div className="img-text ">
  //             <p className="m-0 text-small">
  //               <TimeAgo modificationTimestamp={curElem.TimestampSql} />
  //             </p>
  //           </div>

  //           <img
  //             src={imgSrc}
  //             className="imghei img-responsive imghei-small"
  //             alt={curElem.MLS}
  //             onError={handleImageError}
  //           />

  //           <div className="card-textt card text-small">
  //             <p className="mb-0 card-price card-price-small">{price}</p>

  //             <p className="mb-0 text-s"> MLS® #{curElem.MLS}</p>
  //             <p className="mb-0 text-s">{curElem.UnparsedAddress}</p>

  //             <p className="mb-0 text-s"> Listed by {curElem.ListBrokerage}</p>
  //           </div>
  //         </div>
  //       </Link>
  //     </div>
  //   </>
  // )
  return (
    <section className="sm:py-16 h-96" ref={ref}>
      <Link href={`/ontario/${city}/${curElem.MLS}`}>
        <div className="lg:px-3 h-full w-full">
          {/* <div className="grid grid-cols-1 gap-6  mt-12 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:px-0"> */}
          <div className="flex flex-col overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow group rounded-xl p-2 hover:shadow-lg hover:-translate-y-1 relative">
            <div className="w-7/8 h-44 overflow-hidden">
              <img
                className="object-cover w-full h-full transition-all duration-200 transform rounded-xl group-hover:scale-110"
                src={imgSrc}
                alt=""
              />
            </div>
            <div className="flex-1 py-5 sm:p-1 px-2">
              <p className="text-xl font-bold text-gray-900 pt-3">{price}</p>
              <div className="flex flex-row justify-between">
                <div className="flex">
                  <Image
                    alt="bedrooms.png"
                    className="w-4 aspect-square"
                    src="/bedrooms.png"
                  ></Image>
                  <p className="font-bold text-gray-900">
                    <span className="pl-1 text-xs">2</span>
                  </p>
                </div>
                <div className="flex">
                  <Image
                    alt="bedrooms.png"
                    className="w-4 aspect-square"
                    src="/shower.png"
                  ></Image>
                  <p className="font-bold text-gray-900">
                    <span className="pl-1 text-xs">2</span>
                  </p>
                </div>
                <div className="flex">
                  <Image
                    alt="bedrooms.png"
                    className="w-4 aspect-square"
                    src="/square-ruler.png"
                  ></Image>
                  <p className="font-bold text-gray-900">
                    <span className="pl-1 text-xs">2</span>
                  </p>
                </div>
                <div className="flex">
                  <Image
                    alt="bedrooms.png"
                    className="w-5"
                    src="/family.png"
                  ></Image>
                  <p className="font-bold text-gray-900">
                    <span className="pl-1 text-xs">Single family</span>
                  </p>
                </div>
              </div>
              <div className="font-semibold truncate overflow-hidden overflow-ellipsis pt-2 text-black hover:text-black visited:text-black">
                Oakville
              </div>
            </div>

            {/* <div className="absolute w-1/6 h-2/6 top-2 left-2">
              {highlight[0]}
            </div>
            <div className="absolute w-1/6 h-2/6 top-2 left-2">
              {highlight[1]} */}
            {/* </div> */}
          </div>
          {/* </div> */}
        </div>
      </Link>
    </section>
  );
});

export default CityResoCard;
