export const relativeTime = (time: Date | number): string => {
  const relativeTimePeriods: [number, string][] = [
    [31536000, "year"],
    [2419200, "month"],
    [604800, "week"],
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
    [1, "second"],
  ];

  // Helper function to calculate relative time
  const getRelativeTime = (seconds: number): string => {
    for (const [secondsPer, name] of relativeTimePeriods) {
      if (seconds >= secondsPer) {
        const amount = Math.floor(seconds / secondsPer);
        return `for ${amount} ${name}${amount > 1 ? "s" : ""}`;
      }
    }
    return "Just now";
  };

  const date = typeof time === "number" ? new Date(time * 1000) : time;
  const seconds = (Date.now() - date.getTime()) / 1000;

  return getRelativeTime(seconds);
};

export const dateStyle = (data: Date | number | string): string => {
  const f = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return f.format(new Date(data));
};

const YEAR_MS = 1000 * 60 * 60 * 24 * 365.25;

/** Age in years with nine decimals, e.g. "27.006018707". */
export const ageInYears = (birthDate: string, now = Date.now()): string =>
  ((now - new Date(birthDate).getTime()) / YEAR_MS).toFixed(9);
