const getCurrentTimeInCT = () => {
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

module.exports = getCurrentTimeInCT;
