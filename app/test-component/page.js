import PropertyCard from "@/components/PropertyCard";
import React from "react";

const page = () => {
  return (
    <PropertyCard
      cost={2000}
      bathrooms={10}
      area={2000}
      familyType="Single"
      bedrooms={20}
    />
  );
};

export default page;
