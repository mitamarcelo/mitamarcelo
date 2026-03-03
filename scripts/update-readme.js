const fs = require("fs");

const readme = fs.readFileSync("README.md", "utf8");
const stats = JSON.parse(fs.readFileSync("data/stats.json"));

// GLOBAL STATS
const globalSection = `
- 📦 Public Repositories: **${stats.totalRepos}**
- ⭐ Total Stars: **${stats.totalStars}**
- 🍴 Total Forks: **${stats.totalForks}**
- 👀 Watchers: **${stats.totalWatchers}**
- 🛠 Open Issues: **${stats.totalIssues}**
- 🤖 AI-related Repositories: **${stats.aiRepoCount}**
`;

// ACTIVE REPOS
const activeSection = stats.mostRecentlyUpdated
  .map(r =>
    `- 🔹 [${r.name}](${r.html_url}) — Updated ${new Date(r.updated_at).toDateString()}`
  )
  .join("\n");

// LANGUAGE DISTRIBUTION
const langSection = stats.languages
  .map(([lang, count]) => `- ${lang}: ${count} repos`)
  .join("\n");

let updated = readme
  .replace(
    /<!--START_GLOBAL_STATS-->[\s\S]*<!--END_GLOBAL_STATS-->/,
    `<!--START_GLOBAL_STATS-->
${globalSection}
<!--END_GLOBAL_STATS-->`
  )
  .replace(
    /<!--START_ACTIVE_REPOS-->[\s\S]*<!--END_ACTIVE_REPOS-->/,
    `<!--START_ACTIVE_REPOS-->
${activeSection}
<!--END_ACTIVE_REPOS-->`
  )
  .replace(
    /<!--START_LANG_STATS-->[\s\S]*<!--END_LANG_STATS-->/,
    `<!--START_LANG_STATS-->
${langSection}
<!--END_LANG_STATS-->`
  );

fs.writeFileSync("README.md", updated);