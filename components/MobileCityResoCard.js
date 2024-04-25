import React from "react";
import Link from "next/link";
import { generateURL } from "@/helpers/generateURL";
import { usePathname } from "next/navigation";
import TimeAgo from "./TimeAgo";
import { saleLease } from "@/constant";
import Image from "next/image";
const MobileCityResoCard = React.forwardRef(
  ({ curElem, streetAndMLS, small, handleImageError, imgSrc, price }, ref) => {
    const pathname = usePathname();
    return (
      <section className="mb-2" ref={ref}>
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
              className={`flex items-center sm:flex-col flex-row overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow group rounded-xl py-1 hover:shadow-lg hover:-translate-y-1 relative`}
            >
              <div
                className={`flex flex-col items-center h-30 min-w-24 max-w-24 mx-1 overflow-hidden relative`}
              >
                <div className="relative h-24 w-full">
                  <Image
                    fill={true}
                    className="object-cover rounded-md w-full h-full transition-all duration-200 transform group-hover:scale-110 "
                    src={imgSrc}
                    alt="property image"
                    onError={handleImageError}
                  />
                  {/* <div className="absolute inset-0  rounded-md bg-gradient-to-b from-black to-transparent opacity-50"></div> */}
                </div>
              </div>
              <div className="mx-2 w-full mx-2 text-ellipsis overflow-hidden">
                <div className="text-xs">{`For ${
                  curElem.saleLease || "Sale"
                }`}</div>
                <div className="flex w-full justify-between">
                  <h2 className="price fw-bold mb-1 fs-6 fw-bold d-flex align-items-center justify-content-start">
                    {price}
                    {""}
                    {curElem.SaleLease === saleLease.lease.value && (
                      <span> /mo</span>
                    )}
                    <span
                      className={`shadow-lg p-1 ms-1 text-black text-xs card-data`}
                    >
                      {Math.floor(curElem.TotalArea)} ft<sup>2</sup>
                    </span>
                  </h2>

                  <div className="text-xs">
                    <TimeAgo modificationTimestamp={curElem.TimestampSql} />
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="text-black truncate text-ellipsis">
                    <div className="text-dark bva text-ellipsis text-sm">
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
                <div className="flex justify-between">
                  <div className="text-black text-sm rounded-md">
                    {curElem.TypeOwn1Out}{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>
    );
  }
);

export default MobileCityResoCard;
