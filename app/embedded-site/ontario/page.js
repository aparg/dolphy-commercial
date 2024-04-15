import React from "react";
import FilteredCommercialList from "@/components/reso/FilteredCommercialList";

const page = async ({ params }) => {
  const INITIAL_LIMIT = 30;
  return (
    <div className="">
      <FilteredCommercialList
        {...{
          INITIAL_LIMIT,
          embedded: true,
        }}
      />
    </div>
  );
};

export default page;
