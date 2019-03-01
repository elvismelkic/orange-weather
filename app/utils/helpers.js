//returns a date in format 'Friday, Oct 9'; input parameter is UNIX date
export function getDate(UNIXdate) {
  const time = new Date(UNIXdate * 1000);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const day = days[time.getDay()];
  const month = months[time.getMonth()];
  const date = time.getDate();

  return `${day}, ${month} ${date}`;
}

// returns list of weather of current and four next days, at the current time
export function filterFiveDays(value, index) {
  return index == 0 || (index % 8 == 0 && index < 40);
}

//returns capitalized strings
// export function capitalize (str) {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }
