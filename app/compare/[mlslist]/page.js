import { commercial } from "@/api/routes";
import Gallery from "@/components/reso/Gallery";
import { generateImageURLs } from "@/helpers/generateImageURLs";
import Link from "next/link";
import React from "react";
import { Image } from "react-bootstrap";

const fetchData = async (listingID) => {
  const options = {
    method: "GET",
  };
  const urlToFetchMLSDetail = commercial.properties.replace(
    "$query",
    `?$select=MLS='${listingID}'`
  );

  const resMLSDetail = await fetch(urlToFetchMLSDetail, options);
  const data = await resMLSDetail.json();
  return data.results[0];
};

const page = async ({ params }) => {
  const MLSArray = params.mlslist.split("-");
  console.log(MLSArray);
  const main_data = MLSArray.map(async (mls) => {
    return fetchData(mls);
  });
  const dataArray = await Promise.all(main_data);

  const getMax = (property) =>
    Math.max(...dataArray.map((data) => parseFloat(data[property])));
  const getMin = (property) =>
    Math.min(...dataArray.map((data) => parseFloat(data[property])));

  const minListPrice = getMin("ListPrice");
  const maxArea = getMax("TotalArea");

  const images = dataArray.map(async (data) => {
    return (
      <td className="mx-2 p-2 border-b" key={data.MLS}>
        <div className="h-42 w-64">
          <Image
            src={generateImageURLs(data.MLS)[0]}
            className="object-cover block  rounded-md"
            alt="propertyImage"
          ></Image>
        </div>
      </td>
    );
  });

  const listPrice = dataArray.map((data) => {
    return (
      <td className="mx-2 p-2 border-b" key={data.MLS}>
        ${data.ListPrice}{" "}
        {parseFloat(data.ListPrice) === minListPrice && (
          <Image src="/green-tick.svg" className="w-4 inline" />
        )}
      </td>
    );
  });
  const totalArea = dataArray.map((data) => {
    return (
      <td className="mx-2 p-2 border-b" key={data.MLS}>
        {data.TotalArea} Sqft.{" "}
        {parseFloat(data.TotalArea) === maxArea && (
          <Image src="/green-tick.svg" className="w-4 inline" />
        )}
      </td>
    );
  });
  const city = dataArray.map((data) => {
    return (
      <td className="mx-2 p-2 border-b" key={data.MLS}>
        {data.Municipality}
      </td>
    );
  });
  const street = dataArray.map((data) => {
    return (
      <td className="mx-2 p-2 border-b" key={data.MLS}>
        {data?.Street} {data?.StreetName} {data?.StreetAbbreviation}
      </td>
    );
  });
  return (
    <div className="container-fluid">
      <h3 className="main-title fs-2">Compare listings</h3>
      <table className="table-auto w-full">
        <thead>
          <th className="p-2 border-b"></th>
          {dataArray.map((data) => (
            <th className="p-2 border-b">
              <Link
                href={`/commercial/ontario/${data.Municipality}/${data.MLS}`}
              >
                {data.MLS}
              </Link>
            </th>
          ))}
        </thead>
        <tbody>
          <tr>
            <th></th>
            {images}
          </tr>
          <tr className="">
            <th className="p-2 border-b">City</th>
            {city}
          </tr>
          <tr className="">
            <th className="p-2 border-b">Street</th>
            {street}
          </tr>
          <tr className="">
            <th className="p-2 border-b">List Price</th>
            {listPrice}
          </tr>
          <tr className="">
            <th className="p-2 border-b">Total Area</th>
            {totalArea}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default page;
