import { commercial } from "./routes/fetchRoutes.js";

export const searchProperties = async (inputValue) => {
  const response = await fetch(
    commercial.properties.replace("$query", "?$search=") + inputValue
  );
  const searchedProperties = await response.json();
  /* console.log(searchedProperties); */
  return searchedProperties.results;
};
