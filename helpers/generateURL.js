import { saleLease } from "@/constant";

export const generateURL = ({
  cityVal = null,
  houseTypeVal = null,
  saleLeaseVal = null,
} = {}) => {
  const city = cityVal?.toLowerCase() || null;
  console.log(houseTypeVal);
  const houseType = houseTypeVal?.toLowerCase() || null;
  const saleLeaseType =
    Object.keys(saleLease).find((key) => key == saleLeaseVal) ||
    Object.keys(saleLease)
      .find((key) => saleLease[key].value == saleLeaseVal)
      ?.toLowerCase() ||
    null;
  console.log(houseType);
  if (city) {
    if (houseType) {
      if (saleLeaseType) {
        return `/ontario/${city}/${houseType}/${saleLeaseType}`;
      }
      return `/ontairo/${city}/${houseType}`;
    }
    if (saleLeaseType) {
      return `/ontario/${city}/${saleLeaseType}`;
    }
    return `/ontario/${city}`;
  }
  if (houseType) {
    if (saleLeaseType) {
      return `/ontario/filter/${houseType}/${saleLeaseType}`;
    }
    return `/ontario/filter/${houseType}`;
  }
  if (saleLeaseType) {
    return `/ontario/filter/${saleLeaseType}`;
  }

  return `/ontario`;
};
