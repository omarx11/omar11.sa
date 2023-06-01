"use client";
import { useQuery } from "@tanstack/react-query";

const useRepo = () => {
  const { data, isLoading, error } = useQuery({
    queryFn: async () => {
      const { data } = await fetch(
        `https://api.github.com/users/${process.env.GITHUB_USER}/repos`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          },
        }
      );
      return data;
    },
  });
  return { data, isLoading, error };
};

export default function Repos() {
  const { data, isLoading, error } = useRepo();
  return <div>{isLoading ? "Contant is Loading" : data}</div>;
}
