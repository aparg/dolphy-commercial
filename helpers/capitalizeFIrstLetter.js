export function capitalizeFirstLetter(str) {
  if (str == undefined) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
