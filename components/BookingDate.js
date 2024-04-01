"use client";
const BookingDate = async () => {
  function getDaysInMonth(year, month) {
    // Get the number of days in a month
    return new Date(year, month + 1, 0).getDate();
  }

  function getDaysArrayInMonth(year, month) {
    const daysInMonth = getDaysInMonth(year, month);
    const daysArray = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const day = date.getDate();
      const dayName = date
        .toLocaleDateString("en-US", { weekday: "long" })
        .slice(0, 3);
      const monthName = date
        .toLocaleDateString("default", { month: "long" })
        .slice(0, 3);
      daysArray.push({
        day,
        dayName,
        month: monthName,
        monthNumber: month + 1,
        year,
      }); // Month is 0-indexed, so we add 1 to get the correct month
    }

    return daysArray;
  }

  // Example usage:
  const year = 2024;
  const month = 3; // 0-based index, so 3 represents April
  const daysArray = getDaysArrayInMonth(year, month);

  return (
    <>
      <div className="overflow-x-scroll flex flex-row">
        {daysArray.map((data) => (
          <div className="flex flex-col justify-center px-10 py-2 border-gray-500 border-2 items-center mr-1 rounded-md hover:border-cyan-400 cursor-pointer">
            <span className="font-thin">{data.dayName}</span>
            <span className="font-bold">{data.day}</span>
            <span className="font-thinner">{data.month}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default BookingDate;
