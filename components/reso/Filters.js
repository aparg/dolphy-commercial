"use client";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownSection,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
  Slider,
} from "@nextui-org/react";

//CONSTANT
import { saleLease, listingType, numberOfDays, areas } from "@/constant";
import useDeviceView from "@/helpers/useDeviceView";

const bgColor = {
  saleLease: "bg-[#eb7e6c]/[1]",
  areas: "bg-[#eb7e6c]/[1]",
  time: "bg-[#eb7e6c]/[1]",
  type: "bg-[#eb7e6c]/[1]",
  minTimestampSql: "bg-[#eb7e6c]/1",
};

const textColor = {
  saleLease: "text-white",
  areas: "text-white",
  time: "text-black",
  type: "text-white",
  minTimestampSql: "text-black",
};

const borderColor = {
  saleLease: "border-black",
  areas: "border-black",
  time: "border-black",
  type: "border-black",
  minTimestampSql: "border-black",
};

const Filters = ({
  filterState,
  setFilterState,
  fetchFilteredData,
  embedded,
}) => {
  const [navbar, setNavbar] = useState(false);
  const { isMobileView } = useDeviceView();

  //options for lease or sale
  const saleLeaseOptions = Object.values(saleLease).map((item) => item.name);
  //options for house type
  const houseTypeOptions = Object.values(listingType).map((item) => item.name);
  //options for house type

  const areaOptions = Object.values(areas).map((item) => item.name);
  const numberOfDaysOptions = Object.values(numberOfDays).map(
    (item) => item.userFilter && item.name
  );

  //dynamic price range generator based on sale or lease options
  const minMaxPrice = useMemo(() => {
    if (filterState.saleLease.includes(Object.values(saleLease)[1].name)) {
      //i.e for lease, display different min and max value
      return {
        min: 1500,
        max: 8000,
      };
    } else {
      return {
        min: 40000,
        max: 10000000,
      };
    }
  }, [filterState.saleLease]);

  const handleFilterChange = (name, value) => {
    const newFilterState = { ...filterState };
    newFilterState[name] = value;
    if (name === "saleLease") {
      //reset the price filter
      newFilterState["priceRange"] = {
        min: 0,
        max: 0,
      };
    }
    setFilterState({ ...newFilterState });
    fetchFilteredData(newFilterState);
  };

  useEffect(() => {
    if (window) {
      window.addEventListener("scroll", () => {
        setNavbar(false);
      });
    }

    document.addEventListener("DOMContentLoaded", function () {
      // Code to ensure that the Slider component receives focus when clicked directly
      document
        .querySelector(".price-range__slider")
        .addEventListener("click", function (event) {
          const slider = event.target.closest(".max-w-md.slider");
          if (slider) {
            slider.focus();
          }
        });
    });
  }, []);

  return (
    <>
      <div
        className={`filters flex flex-wrap sm:flex gap-2 gap-md-3 my-2 bg-white overflow-hidden sm:flex-row ${
          navbar ? `filter__scrolled mt-4 pb-2 container-fluid` : `top-[0px]`
        }`}
      >
        <IndividualFilterButton
          options={areaOptions}
          name="areas"
          value={filterState.areas}
          handleFilterChange={handleFilterChange}
        />
        <IndividualFilterButton
          options={saleLeaseOptions}
          name="saleLease"
          value={filterState.saleLease}
          handleFilterChange={handleFilterChange}
        />
        <IndividualFilterButton
          options={houseTypeOptions}
          name="type"
          value={filterState.type}
          handleFilterChange={handleFilterChange}
          numberOfDays={filterState.numberOfDays}
        />
        <div className="hidden sm:block">
          <TimeFilterButton
            name="minTimestampSql"
            value={filterState.numberOfDays}
            handleFilterChange={handleFilterChange}
          />
        </div>
      </div>
      {!isMobileView ? (
        <div className="ml-2 price-range__filter h-[34px] pb-14 px-10">
          <div
            className={filterState.saleLease == "For Sale" ? "block" : "hidden"}
          >
            <PriceRangeFilter
              name="priceRange"
              value={filterState.priceRange}
              handleFilterChange={handleFilterChange}
              minMaxPrice={{
                min: 40000,
                max: 10000000,
              }}
            />
          </div>

          <div
            className={
              filterState.saleLease == "For Lease" ? "block" : "hidden"
            }
          >
            <PriceRangeFilter
              name="priceRange"
              value={filterState.priceRange}
              handleFilterChange={handleFilterChange}
              minMaxPrice={{ min: 1500, max: 8000 }}
            />
          </div>
        </div>
      ) : null}
      {isMobileView ? (
        <div className="container-fluid price-filter__bottom">
          <PriceRangeFilterBottom
            name="priceRange"
            value={filterState.priceRange}
            handleFilterChange={handleFilterChange}
            minMaxPrice={minMaxPrice}
          />
        </div>
      ) : null}
    </>
  );
};

const IndividualFilter = ({ options, name, value, handleFilterChange }) => {
  const [selectedKeys, setSelectedKeys] = useState([value]);

  const handleKeyChange = (newKey) => {
    setSelectedKeys(newKey);
    handleFilterChange(name, getSelectedValue(newKey));
  };

  const getSelectedValue = useCallback(
    (key) => Array.from(key).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  return (
    <div>
      <Dropdown>
        <DropdownTrigger disableAnimation={true}>
          <Button
            variant="faded"
            className={`capitalize bg-color dynamic ${
              !selectedKeys[0].includes("House Type") ? "bg-primary-red" : ""
            }`}
            size="md"
          >
            {getSelectedValue(selectedKeys)}
            <i className="bi bi-chevron-down"></i>
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label={name}
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={handleKeyChange}
        >
          {options.map((option) => {
            return <DropdownItem key={option}>{option}</DropdownItem>;
          })}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

const TimeFilterButton = ({ name, handleFilterChange }) => {
  const [selectedKeys, setSelectedKeys] = useState();
  const handleTime = (optionName, optionValue) => {
    setSelectedKeys(optionName);
    handleFilterChange(name, optionValue);
  };

  return (
    <div className="inline-flex sm:block">
      <Dropdown>
        <DropdownTrigger disableAnimation={true}>
          <span
            // variant="faded"
            className={`capitalize px-3 bg-color roundedPill h-[34px] border-2 font-medium flex items-center text-sm ${
              borderColor[name]
            } ${selectedKeys && bgColor[name]}`}
            // size="md"
          >
            {selectedKeys ? selectedKeys : "Number Of Days"}
            <i className="bi bi-chevron-down inline-flex pt-1 pl-[1px]"></i>
          </span>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="price filter"
          itemClasses={{
            base: ["data-[hover=true]:bg-default-0"],
          }}
          disallowEmptySelection
          selectionMode="single"
        >
          {Object.values(numberOfDays).map((option) => {
            if (option.userFilter) {
              return (
                <DropdownItem
                  key={option.name}
                  onClick={() => handleTime(option.name, option.value)}
                >
                  {option.name}
                </DropdownItem>
              );
            }
            return;
          })}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

const PriceRangeFilter = ({ name, value, handleFilterChange, minMaxPrice }) => {
  const [price, setPrice] = useState({
    min: 0,
    max: 0,
  });

  const handlePriceChange = (inputName, value) => {
    const newPrice = {
      ...price,
      [inputName]: Number(value),
    };

    setPrice(newPrice);
    handleFilterChange(name, newPrice);
  };

  const valueToDisplay = useMemo(() => {
    if (price.min && !price.max) {
      return `Over $${price.min}`;
    } else if (price.min && price.max) {
      return `$${price.min} - $${price.max}`;
    } else {
      return "Price";
    }
  }, [price]);

  const handleRangeChange = ([min, max]) => {
    const newPrice = { min, max };
    setPrice(newPrice);
    handleFilterChange(name, newPrice);
  };

  useEffect(() => {
    const newPrice = {
      min: value?.min ?? 0,
      max: value?.max ?? 0,
    };
    setPrice(newPrice);
  }, [value]);

  return (
    <div className="price-range__slider">
      <Slider
        label="Price Range: "
        // step={50}
        minValue={minMaxPrice.min}
        maxValue={minMaxPrice.max}
        onChangeEnd={handleRangeChange}
        defaultValue={[minMaxPrice.min, minMaxPrice.max]}
        formatOptions={{
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }}
        className="w-[300px]"
        classNames={{
          filler: "bg-[#eb7e6c] border-gray-600",
        }}
        renderThumb={(props) => (
          <div
            {...props}
            className="bg-white group p-1 top-1/2 shadow-medium rounded-full border-2 border-[#eb7e6c] bg-[#eb7e6c] cursor-grab data-[dragging=true]:cursor-grabbing"
          >
            <span className="transition-transform rounded-full w-3 h-3 block group-data-[dragging=true]:scale-80"></span>
          </div>
        )}
      />
    </div>
    //       </DropdownItem>
    //     </DropdownSection>
    //   </DropdownMenu>
    // </Dropdown>
  );
};

const PriceRangeFilterBottom = ({
  name,
  value,
  handleFilterChange,
  minMaxPrice,
}) => {
  const [price, setPrice] = useState({
    min: 0,
    max: 0,
  });

  const [defaultPrice, setDefaultPrice] = useState({
    min: minMaxPrice.min,
    max: minMaxPrice.max,
  });

  const [unMount, setUnMount] = useState(false);

  const convertIntoCurrency = useCallback(
    (price) => {
      return Number(price).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      });
    },
    [price]
  );

  const handleRangeChange = ([min, max]) => {
    const newPrice = { min, max };
    setPrice(newPrice);
    handleFilterChange(name, newPrice);
  };

  useEffect(() => {
    const newPrice = {
      min: value?.min > 0 ? value?.min : minMaxPrice.min,
      max: value?.max > 0 ? value?.max : minMaxPrice.max,
    };

    const newDefaultPrice = {
      min: minMaxPrice.min,
      max: minMaxPrice.max,
    };
    setDefaultPrice(newDefaultPrice);
    setPrice(newPrice);

    if (value.min === 0 && value.max === 0) {
      setUnMount(true);
      setTimeout(() => {
        setUnMount(false);
      }, 10);
    }
  }, [value, minMaxPrice]);

  return (
    <>
      <div className="price-range__slider">
        {!unMount && (
          <Slider
            step={50}
            label=""
            color="foreground"
            minValue={defaultPrice.min}
            maxValue={defaultPrice.max}
            showTooltip={true}
            // value={[price.min, price.max]}
            onChangeEnd={handleRangeChange}
            defaultValue={[defaultPrice.min, defaultPrice.max]}
            formatOptions={{ style: "currency", currency: "USD" }}
            classNames={{
              base: "max-w-md slider gap-3",
              track: "bg-light border border-secondary",
              filler: "bg-primary-green bg-gradient-to-r",
              value: "fw-bold fs-6",
            }}
            renderThumb={(props) => (
              <div
                {...props}
                className="p-1 top-50 bg-light border border-secondary rounded-circle shadow cursor-grab"
              >
                <span className="bg-primary-green shadow rounded-circle w-5 h-5 d-block" />
                {!props["data-pressed"] && (
                  <>
                    {props.index === 0 ? (
                      <span
                        style={{
                          position: "absolute",
                          top: -32,
                          left: -10,
                          fontSize: "11px",
                        }}
                        className="custom-range-thumb p-1 border-md"
                      >
                        {convertIntoCurrency(price.min)}
                      </span>
                    ) : null}
                    {props.index === 1 ? (
                      <span
                        style={{
                          position: "absolute",
                          top: -32,
                          left: -30,
                          fontSize: "11px",
                        }}
                        className="custom-range-thumb p-1 border-md"
                      >
                        {convertIntoCurrency(price.max)}
                      </span>
                    ) : null}
                  </>
                )}
              </div>
            )}
            tooltipProps={{
              offset: 10,
              placement: "bottom",
              classNames: {
                base: [
                  // arrow color
                  "custom-range-thumb",
                ],
                content: [
                  "py-2 shadow-xl",
                  "text-white custom-range-thumb rounded-circle",
                ],
              },
            }}
          />
        )}
      </div>
    </>
  );
};

const IndividualFilterButton = ({
  options,
  name,
  value,
  handleFilterChange,
  numberOfDays,
  // color = "#94ad5c",
  // opacity = "1",
}) => {
  const [activeFilter, setActiveFilter] = useState(
    decodeURIComponent(value) || ""
  );
  const isActive = (key) => {
    const foundSalesLease = options.find((option) => option === key);
    return foundSalesLease === activeFilter;
  };

  const handleClick = (name, option) => {
    setActiveFilter(option);
    handleFilterChange(name, option);
  };

  return (
    <div className="inline-flex mr-3 flex-wrap sm:gap-y-2 sm:mt-0 gap-y-2 ">
      {options.map((option, index) => {
        return (
          <span
            key={index}
            className={`mx-[2px] px-3 py-1 cursor-pointer text-nowrap text-sm font-medium h-[34px] align-items-center rounded-pill ${
              borderColor[name]
            } ${
              isActive(option)
                ? `${bgColor[name]} font-extrabold ${textColor[name]} border-0`
                : "border-2"
            }`}
            onClick={() => handleClick(name, option)}
          >
            {option}
          </span>
        );
      })}
      {name == "type" && (
        <div className="block sm:hidden">
          <TimeFilterButton
            name="minTimestampSql"
            value={numberOfDays}
            handleFilterChange={handleFilterChange}
          />
        </div>
      )}
    </div>
  );
};

export default Filters;
