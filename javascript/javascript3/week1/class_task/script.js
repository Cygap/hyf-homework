import myOrders from "./orders.json" assert { type: "json" };
console.dir(myOrders);

fetch("http://api.open-notify.org/astros.json")
  .then((response) => response.json())
  .then((response) => renderAstros(response));

function renderAstros(astronauts) {
  const list = document.createElement("ul");
  list.innerHTML = `There are ${astronauts.number} astronauts in space, they are:`;
  for (let crewMember of astronauts.people) {
    const item = document.createElement("li");
    item.textContent = crewMember.name;
    list.append(item);
  }

  document.body.append(list);
}

const interval = setInterval(
  () =>
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((result) => result.json())
      .then((response) => renderRandomDog(response)),
  2000
);

const randomDog = document.createElement("img");
document.body.append(randomDog);

function renderRandomDog(url) {
  randomDog.setAttribute("src", url.message);
}

fetch("https://dog.ceo/api/breeds/list/all")
  .then((response) => response.json())
  .then((response) => {
    const breeds = Object.keys(response.message);
    console.dir(breeds);
    const randomBreed = document.createElement("p");
    randomDog.after(randomBreed);
    fetch(
      `https://dog.ceo/api/breed/${
        breeds[Math.round(Math.random() * breeds.length)]
      }/images/random`
    )
      .then((response) => response.json())
      .then((url) => {
        randomDog.setAttribute("src", url.message);
        randomBreed.innerText = url.message.match(
          /https:\/\/images.dog.ceo\/breeds\/(.+)\/n/
        )[1];
        console.dir(url.message);
      });
  });
