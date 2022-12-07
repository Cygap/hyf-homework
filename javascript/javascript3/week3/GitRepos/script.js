"use strict";
const classmates = ["Efty96", "RodrigoGuinsbergPinto", "polyovik"];

async function getRepos(users) {
  const responses = await Promise.all(
    users.map((u) =>
      fetch(`https://api.github.com/search/repositories?q=user:${u}`)
    )
  );
  const repos = await Promise.all(responses.map((res) => res.json()));
  repos.forEach((repo) => {
    document.createElement("ul"); /** use templates */
  });
}
header.innerText = `List of repositories for ${classmates.join(", ")}`;
getRepos(classmates);
