const fs = require("fs");

const username = "mitamarcelo";

async function fetchRepos() {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100`
  );
  return await res.json();
}

function calculateStats(repos) {
  const totalStars = repos.reduce((a, r) => a + r.stargazers_count, 0);
  const totalForks = repos.reduce((a, r) => a + r.forks_count, 0);
  const totalIssues = repos.reduce((a, r) => a + r.open_issues_count, 0);
  const totalWatchers = repos.reduce((a, r) => a + r.watchers_count, 0);

  // Language distribution
  const languages = {};
  repos.forEach(repo => {
    if (repo.language) {
      languages[repo.language] =
        (languages[repo.language] || 0) + 1;
    }
  });

  const sortedLanguages = Object.entries(languages)
    .sort((a, b) => b[1] - a[1]);

  // Most recently updated
  const mostRecentlyUpdated = [...repos]
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, 5);

  // Most starred
  const mostStarred = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5);

  // AI-related repos
  const aiRepos = repos.filter(r =>
    (r.name + (r.description || "")).toLowerCase()
      .match(/ai|ml|llm|machine-learning/)
  );

  return {
    totalRepos: repos.length,
    totalStars,
    totalForks,
    totalIssues,
    totalWatchers,
    languages: sortedLanguages,
    mostRecentlyUpdated,
    mostStarred,
    aiRepoCount: aiRepos.length
  };
}

async function main() {
  const repos = await fetchRepos();
  const stats = calculateStats(repos);

  fs.mkdirSync("data", { recursive: true });
  fs.writeFileSync("data/stats.json", JSON.stringify(stats, null, 2));
}

main();