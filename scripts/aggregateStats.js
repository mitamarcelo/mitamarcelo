import fs from "fs";

const username = "mitamarcelo";

async function fetchRepos() {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100`
  );

  return await res.json();
}

function calculateStats(repos) {
  const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);
  const totalForks = repos.reduce((acc, r) => acc + r.forks_count, 0);

  const languages = {};
  repos.forEach(repo => {
    if (repo.language) {
      languages[repo.language] =
        (languages[repo.language] || 0) + 1;
    }
  });

  return {
    totalRepos: repos.length,
    totalStars,
    totalForks,
    languages
  };
}

async function main() {
  const repos = await fetchRepos();
  const stats = calculateStats(repos);
  fs.writeFileSync("data/stats.json", JSON.stringify(stats, null, 2));
}

main();