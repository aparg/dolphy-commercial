"use client";
import Link from "next/link";
import React, { useState } from "react";

const TextOverImageCard = ({ imageSrc, title }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href="/" className="w-1/5">
      <div
        className="rounded overflow-hidden shadow-lg bg-gradient-to-b from-transparent to-black relative"
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img className="w-full" src={imageSrc} alt="Card" />
        <div
          className={`px-6 py-4 absolute bottom-0 z-10 text-white ${
            hovered && "transition delay:300 translate-y-[-0.300rem]"
          }`}
        >
          <b className="font-bold text-xl mb-2">{title}</b>
          <p className="text-base font-semibold">Homes For Sale</p>
        </div>
      </div>
    </Link>
  );
};

export default TextOverImageCard;
