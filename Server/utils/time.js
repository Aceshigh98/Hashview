// This function returns the current time in the Central Time zone
const getTime = () => {
  const UTC = new Date();
  const options = {
    timeZone: "America/Chicago",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(UTC);
};

// This function returns the current day in the Central Time zone
const getDay = () => {
  const UTC = new Date();
  // Adjust options to focus only on the 'day' component
  const options = {
    timeZone: "America/Chicago",
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(UTC);
};

module.exports = { getTime, getDay };
