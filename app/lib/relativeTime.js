export const relativeTime = (time) => {
  const relativeTimePeriods = [
    [31536000, "year"],
    [2419200, "month"],
    [604800, "week"],
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
    [1, "second"],
  ];

  // configure timestemp to relative time
  function relativeTime(date, isUtc = true) {
    if (!(date instanceof Date)) date = new Date(date * 1000);
    const seconds = (new Date() - date) / 1000;
    for (let [secondsPer, name] of relativeTimePeriods) {
      if (seconds >= secondsPer) {
        const amount = Math.floor(seconds / secondsPer);
        return `for ${amount} ${name}${amount > 1 ? "s" : ""}`;
      }
    }
    return "Just now";
  }

  return relativeTime(time);
};
