"use client";

import { useEffect, useState } from "react";
import { author } from "@/app/config/meta";

const getYearsAgo = (date: Date): number => {
  let timestamp = new Date().getTime() - date.getTime();
  timestamp /= 1000 * 60 * 60 * 24 * 365.25;
  return timestamp;
};

export const useYearsAgo = (): string => {
  const date = new Date(author.age);
  const [years, setYears] = useState<string>("00.000000000");

  useEffect(() => {
    const yearTimer = setInterval(
      () => setYears(getYearsAgo(date).toFixed(9)),
      100,
    );
    return () => clearInterval(yearTimer); // Cleanup function
  }, [date]);

  return years;
};
