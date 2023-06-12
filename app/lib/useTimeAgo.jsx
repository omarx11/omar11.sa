"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const getYearsAgo = (date) => {
  let timestamp = new Date().getTime() - date.getTime();
  timestamp /= 1000 * 60 * 60 * 24 * 365.25;
  return timestamp;
};

const useYearsAgo = () => {
  const date = new Date("10/12/1999");
  const [years, setYears] = useState(getYearsAgo(date));

  useEffect(() => {
    const yearTimer = setInterval(() => setYears(getYearsAgo(date)), 100);
    () => clearInterval(yearTimer);
  }, [date]);

  return years.toFixed(9);
};

export default dynamic(() => Promise.resolve(useYearsAgo), {
  loading: () => "00.000000000",
  ssr: false,
});
