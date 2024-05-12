import React from "react";

const ColoredBadge = ({
  icon,
  text,
  color,
  hoverColor,
  opacity,
  hoverOpacity,
}) => {
  return (
    <div
      className={`min-w-[70px] inline-flex item-center justify-center bg-[${color}] hover:bg-[${hoverColor}] hover:opacity-[${hoverOpacity}]`}
    >
      <img src={icon} alt={text} />
      {text}
    </div>
  );
};

export default ColoredBadge;
