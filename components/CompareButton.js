"use client";

import { Tooltip } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useComparisionFlag } from "./context/ComparisonFlagContext";
import {
  prependToLocalStorageArray,
  removeFromLocalStorageArray,
} from "@/helpers/handleLocalStorageArray";

const CompareButton = ({ main_data, width, callback = undefined }) => {
  const [addedToComparisionList, setAddedToComparisionList] = useState(false);
  // const { comparisonFlag, setComparisonFlag } = useComparisionFlag();
  useEffect(() => {
    console.log(main_data.MLS, "main_data.MLS");
    if (
      JSON.parse(localStorage.getItem("comparingProperties"))?.includes(
        main_data.MLS
      )
    )
      setAddedToComparisionList(true);
  }, []);
  return (
    <Tooltip
      placement="bottom"
      showArrow={false}
      size="sm"
      content={
        addedToComparisionList
          ? "Remove from comparision list"
          : "Add to comparision list!"
      }
    >
      {addedToComparisionList ? (
        <Button
          className={`inline w-${width} h-${width} rounded-full bg-red-500/30 hover:bg-red-500 text-white text-4xl flex justify-center items-center p-0 border-0`}
          onClick={() => {
            removeFromLocalStorageArray("comparingProperties", main_data.MLS);
            // setComparisonFlag(!comparisonFlag);
            setAddedToComparisionList(false);
            callback && callback();
          }}
        >
          <img
            src="/minus.svg"
            alt="added inline"
            className={`w-${width - 2} h-${width - 2} inline`}
          ></img>
        </Button>
      ) : (
        <Button
          className={`inline w-${width} h-${width} rounded-full bg-primary-green/30 hover:bg-primary-green text-white text-4xl flex justify-center items-center p-0 border-0`}
          onClick={() => {
            prependToLocalStorageArray("comparingProperties", main_data.MLS, 3);
            // setComparisonFlag(!comparisonFlag);
            setAddedToComparisionList(true);
            callback && callback();
          }}
        >
          <img
            src="/plus.svg"
            alt="remove"
            className={`w-${width - 3} h-${width - 3}`}
          ></img>
        </Button>
      )}
    </Tooltip>
  );
};

export default CompareButton;
