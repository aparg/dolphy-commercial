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
import { saleLease, listingType } from "@/constant";
import useDeviceView from "@/helpers/useDeviceView";

const Filters = ({ filterState, setFilterState, fetchFilteredData }) => {
  const [navbar, setNavbar] = useState(false);

  const { isMobileView } = useDeviceView();

  //options for lease or sale
  const saleLeaseOptions = Object.values(saleLease).map((item) => item.name);
  //options for house type
  const houseTypeOptions = Object.values(listingType).map((item) => item.name);

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
        min: 400000,
        max: 3000000,
      };
    }
  }, [filterState]);

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

    const payload = {
      saleLease: Object.values(saleLease).find(
        (saleLeaseObj) => saleLeaseObj.name === newFilterState.saleLease
      )?.value,
      minListPrice: Number(newFilterState.priceRange?.min ?? 0),
      maxListPrice: Number(newFilterState.priceRange?.max ?? 0),
      houseType: Object.values(listingType).find(
        (type) => type.name === newFilterState.type
      )?.value,
      hasBasement: newFilterState.hasBasement,
      sepEntrance: newFilterState.sepEntrance,
      washroom: newFilterState.washroom,
    };

    fetchFilteredData(payload);
  };

  useEffect(() => {
    if (window) {
      window.addEventListener("scroll", () => {
        if (window.scrollY >= 70) {
          setNavbar(true);
        } else {
          setNavbar(false);
        }
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
        className={`filters d-flex gap-2 gap-md-3 flex ${
          navbar ? "filter__scrolled" : ""
        } `}
      >
        <div className={`sales-lease__filter ${isMobileView && "hidden"}`}>
          <IndividualFilterButton
            options={saleLeaseOptions}
            name="saleLease"
            value={filterState.saleLease}
            handleFilterChange={handleFilterChange}
          />
        </div>

        <div
          className={`price-range__filter ${
            isMobileView && "hidden"
          } rounded-pill`}
        >
          <PriceRangeFilter
            name="priceRange"
            value={filterState.priceRange}
            handleFilterChange={handleFilterChange}
            minMaxPrice={minMaxPrice}
          />
        </div>

        <div className="flex flex-row">
          <IndividualFilterButton
            options={houseTypeOptions}
            name="type"
            value={filterState.type}
            handleFilterChange={handleFilterChange}
          />
        </div>
      </div>
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
            className="capitalize bg-color dynamic"
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
    <Dropdown>
      <DropdownTrigger disableAnimation={true}>
        <Button
          variant="faded"
          className="capitalize bg-color dynamic rounded-pill"
          size="md"
        >
          {valueToDisplay}
          <i className="bi bi-chevron-down"></i>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="price filter"
        itemClasses={{
          base: ["data-[hover=true]:bg-default-0"],
        }}
      >
        <DropdownSection aria-label="price filter" showDivider>
          <DropdownItem key="price" isReadOnly>
            <p className="fw-bold mb-2">
              Filter price based on min and max price
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Input
                type="number"
                label="Min Price"
                className="w-45"
                size="sm"
                variant="underlined"
                value={value?.min}
                min={0}
                onFocus={(event) => event.target && event.target.select()}
                onValueChange={(value) => handlePriceChange("min", value)}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$</span>
                  </div>
                }
              />
              <Input
                type="number"
                label="Max Price"
                className="w-45"
                size="sm"
                disabled={price.min <= 0}
                variant="underlined"
                value={value?.max}
                min={value?.min}
                onFocus={(event) => event.target.select()}
                onValueChange={(value) => handlePriceChange("max", value)}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$</span>
                  </div>
                }
              />
            </div>
            <p className="fw-bold mt-4 mb-4">Select min or max price range </p>
            <div className="price-range__slider">
              <Slider
                label="Price Range"
                step={50}
                minValue={minMaxPrice.min}
                maxValue={minMaxPrice.max}
                onChangeEnd={handleRangeChange}
                defaultValue={[minMaxPrice.min, minMaxPrice.max]}
                formatOptions={{ style: "currency", currency: "USD" }}
                className="max-w-md"
              />
            </div>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
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
  }, [value, minMaxPrice]);

  return (
    <>
      <div className="price-range__slider">
        <Slider
          label="Price Range"
          step={50}
          color="foreground"
          minValue={defaultPrice.min}
          maxValue={defaultPrice.max}
          // value={[price.min, price.max]}
          onChangeEnd={handleRangeChange}
          defaultValue={[defaultPrice.min, defaultPrice.max]}
          formatOptions={{ style: "currency", currency: "USD" }}
          classNames={{
            base: "max-w-md slider gap-3",
            track: "bg-light border border-secondary",
            filler: "bg-primary-green bg-gradient-to-r",
          }}
          renderThumb={(props) => (
            <div
              {...props}
              className="p-1 top-50 bg-light border border-secondary rounded-circle shadow cursor-grab"
            >
              <span className="bg-primary-green shadow rounded-circle w-5 h-5 d-block" />
            </div>
          )}
        />
      </div>
    </>
  );
};

const IndividualFilterButton = ({
  options,
  name,
  value,
  handleFilterChange,
}) => {
  const [activeFilter, setActiveFilter] = useState(value);

  const isActive = (key) => {
    const foundSalesLease = options.find((option) => option === key);
    return foundSalesLease === activeFilter;
  };

  const handleClick = (name, option) => {
    setActiveFilter(option);
    handleFilterChange(name, option);
  };

  return (
    <div className="d-flex gap-2 gap-md-3">
      {options.map((option, index) => {
        return (
          <div
            key={index}
            className={`px-3 py-1 cursor-pointer text-nowrap text-small h-[34px] d-flex justify-content-center align-items-center rounded-pill border-2 ${
              isActive(option)
                ? "bg-primary-green text-white border-primary-green"
                : ""
            }`}
            onClick={() => handleClick(name, option)}
          >
            {option}
          </div>
        );
      })}
    </div>
  );
};
export default Filters;
