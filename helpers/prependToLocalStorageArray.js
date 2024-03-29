const prependToLocalStorageArray = (key, value, number = 3) => {
  // Retrieve the array from local storage or initialize an empty array
  let storedArray = JSON.parse(localStorage.getItem(key)) || [];

  // Prepend the new value to the array
  if (!storedArray.includes(value)) storedArray.unshift(value);
  storedArray = storedArray.slice(0, number);
  // Store the updated array back to local storage
  localStorage.setItem(key, JSON.stringify(storedArray));
};

export default prependToLocalStorageArray;
