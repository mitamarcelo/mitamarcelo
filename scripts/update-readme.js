const fs = require("fs");

const readme = fs.readFileSync("README.md", "utf8");
const stats = JSON.parse(fs.readFileSync("data/stats.json"));

const statsSection = `
- 📦 Public Repositories: **${stats.totalRepos}**
- ⭐ Total Stars: **${stats.totalStars}**
- 🍴 Total Forks: **${stats.totalForks}**
`;

const updated = readme.replace(
  /<!--START_GLOBAL_STATS-->[\s\S]*<!--END_GLOBAL_STATS-->/,
  `<!--START_GLOBAL_STATS-->
${statsSection}
<!--END_GLOBAL_STATS-->`
);

fs.writeFileSync("README.md", updated);