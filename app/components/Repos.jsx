// "use client";
// import { useQuery } from "@tanstack/react-query";

// const useRepo = () => {
//   const { data, isLoading, error } = useQuery({
//     queryFn: async () => {
//       const { data } = await fetch(
//         `https://api.github.com/users/${process.env.GITHUB_USER}/repos`,
//         {
//           headers: {
//             Accept: "application/vnd.github+json",
//             Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
//           },
//         }
//       );
//       return data;
//     },
//   });
//   return { data, isLoading, error };
// };

// export default function Repos() {
//   const { data, isLoading } = useRepo();
//   return <div>{isLoading ? "Contant is Loading.." : data}</div>;
// }

export const getRepository = async () => {
  try {
    const filteredRepos = [386408964, 601036020];
    const response = await fetch("https://api.github.com/users/omarx11/repos", {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });
    const repos = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 9000));
    return repos
      .filter((d) => !filteredRepos.includes(d.id))
      .sort((a, b) => a.id - b.id);
  } catch (error) {
    console.log(error);
  }
};
