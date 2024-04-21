const getCurrentDayInCT = () => {
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

module.exports = getCurrentDayInCT;
