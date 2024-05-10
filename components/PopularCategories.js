import React from "react";
import TextOverImageCard from "./TextOverImageCard";
const cardsData = [
  {
    id: 1,
    imageSrc: "/convenience-store.jpg",
    title: "Convenience Stores",
    link: "/ontario/toronto/convenience store",
  },
  {
    id: 2,
    imageSrc: "/motel.jpg",
    title: "Motels",
    link: "/ontario/toronto/motel",
  },
  {
    id: 3,
    imageSrc: "/restaurant.jpg",
    title: "Restaurants",
    link: "/ontario/toronto/restaurant",
  },
  {
    id: 4,
    imageSrc: "/gas-station.jpg",
    title: "Gas Stations",
    link: "/ontario/toronto/gas station",
  },
  // Add more cards as needed
];
const PopularCategories = () => {
  return (
    <div className="">
      <h3 className="main-title fs-2">Popular Categories</h3>
      <div className="flex flex-row items-center w-full justify-center md:justify-start items-center flex-wrap lg:mt-2">
        {cardsData.map((card) => (
          <TextOverImageCard {...card} />
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
