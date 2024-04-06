export function capitalizeFirstLetter(str) {
  if (str == undefined) return str;
  if (str.includes("%20")) {
    const words = str.split("%20");
    const capitalizedWords = words.map((word) => capitalizer(word));
    return capitalizedWords.join("%20");
  }
  return capitalizer(str);
}

const capitalizer = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
