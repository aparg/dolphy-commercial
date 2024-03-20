import React from "react";
import TextOverImageCard from "./TextOverImageCard";
const cardsData = [
  {
    id: 1,
    imageSrc: "/cities/toronto1.jpg",
    title: "Toronto",
  },
  {
    id: 2,
    imageSrc: "/cities/brampton.jpg",
    title: "Brampton",
  },
  {
    id: 3,
    imageSrc: "/cities/cambridge.jpg",
    title: "Cambridge",
  },
  {
    id: 4,
    imageSrc: "/cities/edmonton.jpeg",
    title: "Edmonton",
  },
  {
    id: 5,
    imageSrc: "/cities/winnipeg.jpeg",
    title: "Winnipeg",
  },
  {
    id: 6,
    imageSrc: "/cities/halifax.jpeg",
    title: "Halifax",
  },
  {
    id: 7,
    imageSrc: "/cities/calgary.jpeg",
    title: "Calgary",
  },
  {
    id: 8,
    imageSrc: "/cities/grimsby.jpg",
    title: "Grimsby",
  },
  // Add more cards as needed
];
const PopularCities = () => {
  return (
    <div>
      <h3 className="main-title fs-2">Popular Cities in Canada</h3>
      <div className="flex flex-row w-full justify-start py-12 items-center flex-wrap overflow-hidden">
        {cardsData.map((card) => (
          <TextOverImageCard {...card} />
        ))}
      </div>
    </div>
  );
};

export default PopularCities;
