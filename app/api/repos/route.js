export async function GET() {
  try {
    const filteredRepos = [624386055, 386408964, 601036020];
    const res = await fetch(
      "https://api.github.com/users/omarx11/repos?sort=omarx11/chatin",
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    if (!res.ok) throw new Error("Failed to fetch data");
    const repos = await res.json();
    // Promise await just for show cool loading animetion
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    return new Response(
      JSON.stringify(
        repos.filter((d) => !filteredRepos.includes(d.id))
        // .sort((a, b) => a.id - b.id)
      )
    );
  } catch (err) {
    console.log(err);
  }
}
