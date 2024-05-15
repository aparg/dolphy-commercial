import React from "react";
import CityResoCard from "./reso/CityResoCard";

const RecentListings = ({ data }) => {
  return (
    <div className="bg-[#DDEFF1] container-fluid py-5">
      <h3 className="main-title fs-2">Recent Listings</h3>
      <div className="grid grid-rows-2 md:grid-cols-3 md:grid-cols-4 grid-cols-1 gap-5">
        {data.map((value) => (
          <CityResoCard curElem={value} />
        ))}
      </div>
    </div>
  );
};

export default RecentListings;
