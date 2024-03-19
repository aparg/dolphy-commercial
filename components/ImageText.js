import React from "react";

const ImageText = ({ title, imageSrc }) => {
  return (
    <div className="md:px-2 lg:px-4">
      <img className="-rotate-1" src={imageSrc} alt="new thumbnail" />
      <h3 className="mt-5 text-xl font-semibold leading-tight text-black">
        {title}
      </h3>
    </div>
  );
};

export default ImageText;
