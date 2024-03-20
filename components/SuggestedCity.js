"use client";
import React, { useEffect, useState } from "react";
import AdditionalListing from "./reso/AdditionalListing";
import { getCommercialData } from "@/actions/fetchCommercialActions";
const INITIAL_OFFSET = 0;
const INITIAL_LIMIT = 20;
const SuggestedCity = ({ defaultCitiesData }) => {
  const [citiesData, setCitiesData] = useState([]);
  const [defaultData, setDefaultData] = useState(defaultCitiesData);
  useEffect(() => {
    // Retrieve values from local storage on component mount
    let storedCityValues = JSON.parse(localStorage.getItem("searchedCities"));
    if (!storedCityValues) {
      setCitiesData(defaultCitiesData);
      return;
    }
    // Check if the size is smaller than 3
    if (storedCityValues.length < 3) {
      // Add other elements to the array
      storedCityValues = [
        ...storedCityValues,
        ...defaultData.slice(0, 3 - storedCityValues.length),
      ];
    }
    //Make sure only three values remain in array
    storedCityValues.length > 3 && storedCityValues.slice(0, 3);
    // Retrieve object with city and data
    const fetchCitiesData = async () => {
      // fetchDataForCity is a function that fetches data for a given city
      const dataPromises = storedCityValues.map((cityData) => {
        if (!cityData?.data) {
          return fetchDataForCity(cityData);
        }
        return cityData;
      });

      const citiesData = await Promise.all(dataPromises);
      setCitiesData(citiesData);
    };

    fetchCitiesData();
  }, []);

  const fetchDataForCity = async (city) => {
    // Perform API request for city data
    const data = await getCommercialData(INITIAL_OFFSET, INITIAL_LIMIT, city);
    return { city, data };
  };

  return (
    <>
      {citiesData.map((cityData) => {
        return (
          <div className="container-fluid mt-14" key={cityData.city}>
            <section className="additonal__listing">
              {cityData.data && (
                <AdditionalListing
                  city={cityData.city}
                  newSalesData={cityData.data}
                />
              )}
            </section>
          </div>
        );
      })}
    </>
  );
};

export default SuggestedCity;
