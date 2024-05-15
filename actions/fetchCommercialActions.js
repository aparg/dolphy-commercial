"use server";

import { commercial } from "@/api/routes";

export const getCommercialData = async (offset, limit, city, listingType) => {
  try {
    //all the necessary queries possible
    let selectQuery = `Municipality=${city || ""},SaleLease='Sale'`;
    const skipQuery = `${offset}`;
    const limitQuery = `${limit}`;

    // if (listingType) {
    //   selectQuery += `,TypeOwnSrch=${listingType}`;
    // }

    if (listingType) {
      selectQuery += `,Use=${listingType}`;
    }

    const url = commercial.properties.replace(
      "$query",
      `?$select=${selectQuery}&$skip=${skipQuery}&$limit=${limitQuery}`
    );

    const options = {
      method: "GET",
      next: { revalidate: 10 },
    };
    const res = await fetch(url, options);
    const data = await res.json();
    return data?.results;
  } catch (error) {
    throw new Error(`An error happened: ${error}`);
  }
};

export const getFilteredRetsData = async (queryParams) => {
  try {
    //all the necessary queries possible
    let useCityFilter = queryParams.city && !queryParams.areas;
    //we dont need to use city filter if we need to scan an area(with multiple cities), we will use the select or filter instead
    let selectQuery = `${
      useCityFilter ? `Municipality=${queryParams.city}` : ""
    }${
      queryParams.saleLease
        ? `${useCityFilter ? "," : ""}SaleLease=${queryParams.saleLease}`
        : ""
    }`;
    const skipQuery = `${queryParams.offset}`;
    const limitQuery = `${queryParams.limit}`;
    const timestampQuery = `${queryParams.minTimestampSql || ""}`;
    let rangeQuery =
      queryParams.minListPrice && `minListPrice=${queryParams.minListPrice}`;
    let areaQuery = ``;

    // if (queryParams.houseType) {
    //   selectQuery += `,TypeOwnSrch=${queryParams.houseType}`;
    // }
    if (queryParams.houseType) {
      selectQuery += `,Use=${queryParams.houseType}`;
    }

    if (queryParams.maxListPrice > queryParams.minListPrice) {
      rangeQuery += `,maxListPrice=${queryParams.maxListPrice}`;
    }

    if (queryParams.areas?.length > 0) {
      // selectQuery = "";
      queryParams.areas.forEach((val, idx) => {
        if (idx > 0) {
          areaQuery += `,Municipality=${val}`;
        } else {
          areaQuery += `Municipality=${val}`;
        }
      });
    }

    const url = commercial.properties.replace(
      "$query",
      `?$select=${selectQuery || ""}${
        timestampQuery && `&$timestampFilter='${timestampQuery}'`
      }&$skip=${skipQuery}&$limit=${limitQuery}&$range=${rangeQuery}&$selectOr=${areaQuery}`
    );
    const options = {
      method: "GET",
      next: { revalidate: 10 },
    };
    // console.log(url);
    const res = await fetch(url, options);
    const data = await res.json();
    return data?.results;
  } catch (error) {
    throw new Error(`An error happened: ${error}`);
  }
};

export const fetchDataFromMLS = async (listingID) => {
  const options = {
    method: "GET",
    // next: { revalidate: 10 },
  };
  const urlToFetchMLSDetail = commercial.properties.replace(
    "$query",
    `?$select=MLS='${listingID}'`
  );
  const resMLSDetail = await fetch(urlToFetchMLSDetail, options);
  const data = await resMLSDetail.json();
  return data.results[0];
};
