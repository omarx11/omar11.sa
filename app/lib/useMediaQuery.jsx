import { useEffect, useState } from "react";

const useMediaQuery = (query) => {
  const isMatch = (query) => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState(false);

  const handleChange = () => setMatches(isMatch(query));

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia(query);
      handleChange();
      mediaQuery.addEventListener("change", handleChange);

      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [query]);

  return matches;
};

export default useMediaQuery;
