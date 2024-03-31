export const saleLease = {
  sale: { name: "For Sale", value: "Sale" },
  lease: { name: "For Lease", value: "Lease" },
};

export const listingType = {
  business: { name: "Business", value: ".B." },
  office: { name: "Office", value: ".1." },
  retail: { name: "Retail", value: ".Q." },
  industrial: { name: "Industrial", value: ".I." },
  investment: { name: "Investment", value: ".U." },
  land: { name: "Land", value: ".L." },
};

const firstDateOfMonth = () => {
  var currentDateUTC = new Date(Date.now());

  currentDateUTC.setUTCDate(1);

  var startDateOfMonthUTC = currentDateUTC.toISOString().split("T")[0];

  return startDateOfMonthUTC;
};

const firstDateofLastSixMonths = () => {
  var currentDate = new Date();

  currentDate.setMonth(currentDate.getMonth() - 6);
  currentDate.setDate(1);

  var formattedDate = currentDate.toISOString().slice(0, 10);
  return formattedDate;
};

const firstDateOfWeek = () => {
  // Get the current date
  var currentDate = new Date();

  // Calculate the difference between the current day and the first day of the week (0: Sunday, 1: Monday, ..., 6: Saturday)
  var firstDayOfWeek = currentDate.getDay();
  var diff = currentDate.getDate() - firstDayOfWeek;

  // Set the date to the first day of the current week
  currentDate.setDate(diff);

  // Format the date to YYYY-MM-DD
  var formattedDate = currentDate.toISOString().slice(0, 10);

  // Output the date of the first day of the current week
  return formattedDate;
};

const getLastDateOfLastWeek = () => {
  // Get the current date
  var currentDate = new Date();

  // Calculate the difference between the current day and the first day of the week (0: Sunday, 1: Monday, ..., 6: Saturday)
  var firstDayOfWeek = currentDate.getDay();
  var diff = currentDate.getDate() - firstDayOfWeek;

  // Set the date to the first day of the current week
  currentDate.setDate(diff);

  // Subtract 7 days to get the first day of the last week
  currentDate.setDate(currentDate.getDate() - 7);

  // Format the date to YYYY-MM-DD
  var formattedDate = currentDate.toISOString().slice(0, 10);

  // Output the date of the first day of the last week
  return formattedDate;
};

export const numberOfDays = {
  thisWeek: { name: "This Week", value: firstDateOfWeek() },
  lastWeek: { name: "Last Week", value: getLastDateOfLastWeek() },
  thisMonth: { name: "This Month", value: firstDateOfMonth() },
  lastSixMonths: { name: "Last Six Months", value: firstDateofLastSixMonths() },
};
