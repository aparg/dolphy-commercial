import Link from "next/link";
import React from "react";
const cardLinks = [
  { name: "Office", icon: "" },
  { name: "Retail" },
  { name: "Industrial" },
  { name: "Investment" },
  { name: "Land" },
];

const FilterCard = () => {
  return (
    <div className="bg-white flex flex-row rounded-lg justify-around h-full w-full p-2 flex-wrap">
      <Link
        href="/"
        className="text-black rounded-md flex justify-center p-2 px-2 hover:bg-slate-100 hover:decoration-[#a5ce97]"
      >
        <div className="w-10">
          <img src="/office.png" className="max-w-full object-scale-down"></img>
        </div>

        <b className="self-center text-xs tracking-wide text-black pl-1">
          Office
        </b>
      </Link>
      <Link
        href="/"
        className="text-black decoration-black rounded-md flex justify-center py-2 px-2 hover:bg-slate-100 hover:decoration-[#a5ce97]"
      >
        <div className="w-10">
          <img src="/office.png" className="max-w-full object-scale-down"></img>
        </div>

        <b className="self-center text-xs tracking-wide text-black pl-1">
          Retail
        </b>
      </Link>
      <Link
        href="/"
        className="text-black decoration-black rounded-md flex justify-center py-2 px-2 hover:bg-slate-100 hover:decoration-[#a5ce97]"
      >
        <div className="w-10">
          <img src="/office.png" className="max-w-full object-scale-down"></img>
        </div>

        <b className="self-center text-xs tracking-wide text-black pl-1">
          Industrial
        </b>
      </Link>
      <Link
        href="/"
        className="text-black decoration-black rounded-md flex justify-center py-2 px-2 hover:bg-slate-100 hover:decoration-[#a5ce97]"
      >
        <div className="w-10">
          <img src="/office.png" className="max-w-full object-scale-down"></img>
        </div>

        <b className="self-center text-xs tracking-wide text-black pl-1">
          Investment
        </b>
      </Link>
      <Link
        href="/"
        className="text-black decoration-black rounded-md flex justify-center py-2 px-2 hover:bg-slate-100 hover:decoration-[#a5ce97] "
      >
        <div className="w-10">
          <img src="/office.png" className="max-w-full object-scale-down"></img>
        </div>

        <b className="self-center text-xs tracking-wide text-black pl-1">
          Land
        </b>
      </Link>
      <Link
        href="/"
        className="text-black decoration-black rounded-md flex justify-center py-2 px-2 hover:bg-slate-100 hover:decoration-[#a5ce97]"
      >
        <div className="w-10">
          <img src="/office.png" className="max-w-full object-scale-down"></img>
        </div>

        <b className="self-center text-xs tracking-wide text-black pl-1">
          Office
        </b>
      </Link>
    </div>
  );
};

export default FilterCard;
