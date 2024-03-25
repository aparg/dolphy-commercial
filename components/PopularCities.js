import React from "react";
import TextOverImageCard from "./TextOverImageCard";
const cardsData = [
  {
    id: 1,
    imageSrc: "/cities/toronto1.jpg",
    title: "Toronto",
    link: "/ontario/toronto/sale/office",
  },
  {
    id: 2,
    imageSrc: "/cities/brampton.jpg",
    title: "Brampton",
    link: "/ontario/brampton/sale/office",
  },
  {
    id: 3,
    imageSrc: "/cities/cambridge.jpg",
    title: "Cambridge",
    link: "/ontario/cambridge/sale/office",
  },
  {
    id: 4,
    imageSrc: "/cities/edmonton.jpeg",
    title: "Edmonton",
    link: "/ontario/edmonton/sale/office",
  },
  {
    id: 5,
    imageSrc: "/cities/winnipeg.jpeg",
    title: "Winnipeg",
    link: "/ontario/winnipeg/sale/office",
  },
  {
    id: 6,
    imageSrc: "/cities/halifax.jpeg",
    title: "Halifax",
    link: "/ontario/halifax/sale/office",
  },
  {
    id: 7,
    imageSrc: "/cities/calgary.jpeg",
    title: "Calgary",
    link: "/ontario/",
  },
  {
    id: 8,
    imageSrc: "/cities/grimsby.jpg",
    title: "Grimsby",
    link: "/ontario/",
  },
  // Add more cards as needed
];
const PopularCities = () => {
  return (
    <div>
      <h3 className="main-title fs-2">Popular Cities in Canada</h3>
      <div className="flex flex-row m-auto items-center w-full justify-center md:justify-start items-center flex-wrap">
        {cardsData.map((card) => (
          <TextOverImageCard {...card} />
        ))}
      </div>
    </div>
  );
};

export default PopularCities;
