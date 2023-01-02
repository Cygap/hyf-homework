"use strict";
const classmates = ["Efty96", "RodrigoGuinsbergPinto", "polyovik"];

/**
 * Queries GitHub for repositories of each element of users array.
 * If at least one users element is not a valid GitHub username - throws an error
 * If fetch is successful - display the list of repos for each user
 * @param {array} users - GitHub usernames.
 */
async function getRepos(users) {
  const responses = await Promise.all(
    users.map((u) =>
      fetch(`https://api.github.com/search/repositories?q=user:${u}`)
    )
  );
  const usersRepos = await Promise.all(responses.map((res) => res.json()));

  usersRepos.forEach((repos, index) => {
    const title = document.createElement("li");
    title.innerHTML = `<h2> Public repositories of ${users[index]} are:</h2><ul id="${users[index]}"></ul>`; /** use templates */
    repositories.append(title);
    repos.items.forEach((repo) => {
      const item = document.createElement("li");
      item.innerText = `${repo.name}: ${repo.html_url}`;
      document.querySelector(`#${users[index]}`).append(item);
    });
  });
}

header.innerText = `List of repositories for ${classmates.join(", ")}`;
getRepos(classmates);
