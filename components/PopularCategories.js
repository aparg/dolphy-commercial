import React from "react";
import TextOverImageCard from "./TextOverImageCard";
import { link } from "@nextui-org/theme";
const cardsData = [
  {
    id: 1,
    imageSrc: "/convenience-store.jpg",
    title: "Convenience Stores for sale",
    link: "/ontario/toronto/convenience store",
  },
  {
    id: 2,
    imageSrc: "/motel.jpg",
    title: "Motels for sale",
    link: "/ontario/toronto/motel",
  },
  {
    id: 3,
    imageSrc: "/restaurant.jpg",
    title: "Restaurants for sale",
    link: "/ontario/toronto/restaurant",
  },
  {
    id: 4,
    imageSrc: "/gas-station.jpg",
    title: "Gas Stations for sale",
    link: "/ontario/toronto/gas station",
  },
  {
    id: 5,
    imageSrc: "/land.jpg",
    title: "Land for sale",
    link: "/ontario/toronto/land",
  },
  // Add more cards as needed
];
const PopularCategories = () => {
  return (
    <div className="">
      <h3 className="main-title fs-2">Popular Categories</h3>
      <div className="grid grid-cols-1 sm:space-x-2 sm:grid-cols-5 w-full justify-center md:justify-start items-center flex-wrap lg:mt-2">
        {cardsData.map((card) => (
          <TextOverImageCard {...card} />
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
