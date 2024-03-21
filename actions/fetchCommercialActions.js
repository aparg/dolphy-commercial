"use server";

import { commercial } from "@/api/routes";

export const getCommercialData = async (offset, limit, city, listingType) => {
  try {
    //all the necessary queries possible
    let selectQuery = `Municipality=${city},SaleLease='Sale'`;
    const skipQuery = `${offset}`;
    const limitQuery = `${limit}`;

    if (listingType) {
      selectQuery += `,TypeOwnSrch=${listingType}`;
    }

    const url = commercial.properties.replace(
      "$query",
      `?$select=${selectQuery}&$skip=${skipQuery}&$limit=${limitQuery}`
    );

    const options = {
      method: "GET",
      cache: "no-store",
    };

    const res = await fetch(url, options);
    const data = await res.json();
    return data.results;
  } catch (error) {
    throw new Error(`An error happened: ${error}`);
  }
};

export const getFilteredRetsData = async (queryParams) => {
  try {
    //all the necessary queries possible
    let selectQuery = `Municipality=${queryParams.city},SaleLease=${queryParams.saleLease}`;
    const skipQuery = `${queryParams.offset}`;
    const limitQuery = `${queryParams.limit}`;
    let rangeQuery = `minListPrice=${queryParams.minListPrice}`;

    if (queryParams.houseType) {
      selectQuery += `,TypeOwnSrch=${queryParams.houseType}`;
    }

    if (queryParams.maxListPrice > queryParams.minListPrice) {
      rangeQuery += `,maxListPrice=${queryParams.maxListPrice}`;
    }

    const url = commercial.properties.replace(
      "$query",
      `?$select=${selectQuery}&$skip=${skipQuery}&$limit=${limitQuery}&$range=${rangeQuery}`
    );

    const options = {
      method: "GET",
      cache: "no-store",
    };

    const res = await fetch(url, options);
    const data = await res.json();
    return data.results;
  } catch (error) {
    throw new Error(`An error happened: ${error}`);
  }
};
